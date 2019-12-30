import { Machine, assign } from 'xstate';

const events = {
  CHANGE_SPEED: 'CHANGE_SPEED',
  SCROLL_BACK: 'SCROLL_BACK',
  PAUSE: 'PAUSE',
  RESTART: 'RESTART',
  SHOW_WORD: 'SHOW_WORD',
  PLAY: 'PLAY'
};

const states = {
  IDLE: 'idle',
  PLAYING: 'playing',
  PAUSED: 'paused',
  FINISHED: 'finished',
};

const guards = {
  hasFinished:  (context, event) => {
    const {
      index,
      words,
    } = context;
    const len = words.length;
    return index == len;
  },
};

const actions = {
  clearPrevData: assign(() => {
    return {
      word: null,
      index: 0
    }
  }),
  showWord: assign((context, __event) => {
    const {
      words,
      index
    } = context;

    return {
      word: words[index],
      index: index+1
    }
  }),
  changeSpeed: assign((__context, event) => {
    return {
      speed: event.value,
    }
  }),
  scrollToWord: assign((context, event) => {
    const {
      words,
    } = context;
    const eventValue = event.value;

    if(!eventValue) return;
    
    const reversPercentile = Math.round((eventValue / 100) * words.length);
    return {
      word: words[reversPercentile],
      index: reversPercentile,
    }
  }),
};

const playerMachine = Machine({
    id: 'player-machine',
    initial: 'idle',
    context: {
      speed: 0.5,
      currentWord: null,
      index: 0,
    },
    on: {
      [events.CHANGE_SPEED]: {
        actions: ['changeSpeed'],
      },
      [events.SCROLL_BACK]: {
        actions: ['scrollToWord'],
      },
    },
    states: {
      [states.IDLE]: {
        entry: ['clearPrevData'],
        on: {
          [events.PLAY]: states.PLAYING,
        }
      },
      playing: {
        on: {
          [events.PAUSE]: states.PAUSED,
          [events.RESTART]: states.IDLE,
          [events.SHOW_WORD]: [
            {
              cond: { type: 'hasFinished' } ,
              target: 'finished',
            },
            {
              target: states.PLAYING,
              actions: [ 'showWord' ]
            }
          ]
        }
      },
      paused: {
        on: {
          [events.PLAY]: states.PLAYING,
          [events.RESTART]: states.IDLE, 
        }
      },
      finished: {
        on: {
          [events.RESTART]: {
            target: states.IDLE,
          },
        }
      }
    }
}, {
  actions,
  guards,
});
export { events, states };
export default playerMachine;