export default {
  showLoader(state) {
    return state.showLoaderManually || state.promisesQueue.length > 0;
  },
};
