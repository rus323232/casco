export default {
  goToStep(state, stepIndex) {
    if (stepIndex !== undefined) {
      state.currentStep = stepIndex;
    }
  },
  setLastStep(state) {
    state.stepsMap = state.stepsMap.map((step) => {
      step.currentSubStep = step.subSteps.length - 1;
      return step;
    });

    state.currentStep = state.stepsMap.length - 1;
  },
  setFirstStep(state) {
    state.stepsMap = state.stepsMap.map((step) => {
      step.currentSubStep = 0;
      return step;
    });

    state.currentStep = 0;
  },
  switchToErrorState(state, value = false) {
    const { currentStep } = state;

    state.stepsMap[currentStep].hasError = value;
  },
  setSubStep(state, stepIndex) {
    const { currentStep } = state;
    if (stepIndex !== undefined) {
      state.stepsMap[currentStep].currentSubStep = stepIndex;
    }
  },
};
