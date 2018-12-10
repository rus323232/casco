export default {
  addPromiseToLoader(state, newPromise) {
    if (newPromise instanceof Promise) {
      state.promisesQueue.push(newPromise);
      newPromise.finally(() => {
        state.promisesQueue = state.promisesQueue.filter(promise => promise !== newPromise);
      });
    }
  },
  setLoaderState(state, loaderState = false) {
    state.showLoaderManually = loaderState;
  },
};
