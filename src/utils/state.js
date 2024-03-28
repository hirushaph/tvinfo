let appState = {
  user: {},
};

function updateState(newState) {
  appState = { ...appState, ...newState };
}

function getState() {
  return appState;
}

module.exports = { updateState, getState };
