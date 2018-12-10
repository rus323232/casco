<template>
<div class="steps">
  <v-steps-item
    v-for="(step, index) of stepsMap"
    :key="step.id"
    :current-step="currentStep"
    :has-error="step.hasError"
    :step-number="index"
    :sub-steps="step.subSteps"
    :step-title="step.title"
    :steps-count="stepsCount"
    @goToStep="onGoToStep"
    @setSubstep="onSetSubStep"
    @goToLastStep="onGoToLastStep"
    @goToFirstStep="onGoToFirstStep"
  ></v-steps-item>
</div>
</template>

<script>
import {
  createNamespacedHelpers,
} from 'vuex';
import VStepsItem from '../common/VStepsItem.vue';

const { mapState } = createNamespacedHelpers('steps');

export default {
  components: {
    VStepsItem,
  },
  methods: {
    onGoToStep(stepIndex = 0) {
      this.$store.commit('goToStep', stepIndex);
    },
    onGoToLastStep() {
      this.$store.commit('setLastStep');
    },
    onGoToFirstStep() {
      this.$store.commit('setFirstStep');
    },
    onSetSubStep(stepIndex) {
      this.$store.commit('setSubStep', stepIndex);
    },
  },
  computed: {
    ...mapState({
      stepsMap: state => state.stepsMap,
      stepsCount: state => state.stepsMap.length,
      currentStep: state => state.currentStep,
    }),
  },
};
</script>

<style lang="scss" scoped>
.steps {
  @include flex-row;
  flex-wrap: nowrap;
  height: 100%;
  width: 100%;
  z-index: 15;
  padding-left: 35px;
  padding-top: 20px;
}
</style>
