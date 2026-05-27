const state = {
  lang: 'en',
  tab: 'feed'
};

const listeners = [];

export function getState() {
  return state;
}

export function setState(newState) {
  Object.assign(state, newState);
  listeners.forEach(fn => fn(state));
}

export function subscribe(fn) {
  listeners.push(fn);
}