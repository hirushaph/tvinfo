let appState = {
  user: {},
};

export function updateState(newState) {
  appState = { ...appState, ...newState };
}

export function getState() {
  return appState;
}
