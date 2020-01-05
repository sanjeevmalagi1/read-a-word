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

const actionNames = {
  CLEAR_PREV_DATA: "clearPrevData",
  SHOW_WORD: "showWord",
  CHANGE_SPEED: "changeSpeed",
  SCROLL_TO_WORD: "scrollToWord",
};

const guardNames = {
  HAS_FINISHED: "hasFinished"
};

const guards = {
  [guardNames.HAS_FINISHED]:  (context, event) => {
    const {
      index,
      words,
    } = context;
    const len = words.length;
    return index+1 == len;
  },
};

const actions = {
  [actionNames.CLEAR_PREV_DATA]: assign(() => {
    return {
      word: null,
      index: 0
    }
  }),
  [actionNames.SHOW_WORD]: assign((context, __event) => {
    const {
      words,
      index
    } = context;

    return {
      index: index+1
    }
  }),
  [actionNames.CHANGE_SPEED]: assign((__context, event) => {
    return {
      speed: event.value,
    }
  }),
  [actionNames.SCROLL_TO_WORD]: assign((context, event) => {
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
    initial: states.IDLE,
    context: {
      speed: 0.5,
      currentWord: null,
      index: 0,
    },
    on: {
      [events.CHANGE_SPEED]: {
        actions: [actionNames.CHANGE_SPEED],
      },
      [events.SCROLL_BACK]: {
        actions: [actionNames.SCROLL_TO_WORD],
      },
    },
    states: {
      [states.IDLE]: {
        entry: [actionNames.CLEAR_PREV_DATA],
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
              cond: { type: [guardNames.HAS_FINISHED] } ,
              target: states.FINISHED,
            },
            {
              target: states.PLAYING,
              actions: [ actionNames.SHOW_WORD ]
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
          [events.SCROLL_BACK]: {
            target: states.PLAYING,
            actions: [actionNames.SCROLL_TO_WORD],
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