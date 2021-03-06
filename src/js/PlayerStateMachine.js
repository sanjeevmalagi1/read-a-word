import { Machine, assign } from 'xstate';

const events = {
  CHANGE_SPEED: 'CHANGE_SPEED',
  CHANGE_TEXT: 'CHANGE_TEXT',
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
  CHANGE_TEXT: 'changeText',
};

const guardNames = {
  HAS_FINISHED: "hasFinished",
  HAS_WORD_SCROLL_FINISHED: "hasScrollFinished",
};

const guards = {
  [guardNames.HAS_WORD_SCROLL_FINISHED]: (context, event) => {
    const { words } = context;
    const eventValue = event.value;
    const len = words.length;
    return eventValue+1 >= len;
  },
  [guardNames.HAS_FINISHED]:  (context, event) => {
    const {
      index,
      words,
    } = context;
    const len = words.length;
    return index+1 >= len;
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
    const nextIndex = context.index + 1;
    return { index: nextIndex }
  }),
  [actionNames.CHANGE_SPEED]: assign((__context, event) => {
    return { speed: event.value }
  }),
  [actionNames.SCROLL_TO_WORD]: assign((context, event) => {
    const { words } = context;
    const eventValue = event.value;
    return {
      word: words[eventValue],
      index: eventValue,
    }
  }),
  [actionNames.CHANGE_TEXT]: assign((__context, event) => {
    const { words } = event;
    return { words, index: 0 }
  }),
};

const playerMachine = Machine({
    id: 'player-machine',
    initial: states.IDLE,
    context: {
      speed: 250,
      index: 0,
    },
    on: {
      [events.CHANGE_SPEED]: {
        actions: [actionNames.CHANGE_SPEED],
      },
      [events.SCROLL_BACK]: [
        {
          cond: { type: [guardNames.HAS_WORD_SCROLL_FINISHED] } ,
          target: states.FINISHED,
          actions: [actionNames.SCROLL_TO_WORD],
        },
        {
          actions: [actionNames.SCROLL_TO_WORD],
        }
      ],
      [events.CHANGE_TEXT]: {
        actions: [actionNames.CHANGE_TEXT],
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
          // [events.RESTART]: states.IDLE,
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
          // [events.RESTART]: states.IDLE,
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