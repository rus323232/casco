export default {
  currentStepObject(state) {
    const { currentStep, stepsMap } = state;
    if (currentStep in stepsMap) {
      return stepsMap[currentStep];
    }
    return stepsMap[0];
  },
};
