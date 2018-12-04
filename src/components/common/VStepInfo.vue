<template>
<div class="step-info">
  <span class="step-info__text">
    {{ currentStepTitle }}
  </span>
  <div class="step-info__counter">
    Шаг {{ currentStep }} из {{ stepsCount }}
  </div>
</div>
</template>

<script>
import {
  createNamespacedHelpers,
} from 'vuex';

const { mapGetters, mapState } = createNamespacedHelpers('steps');

export default {
  computed: {
    ...mapGetters([
      'currentStepObject',
    ]),
    ...mapState({
      stepsCount: state => state.stepsMap.length,
      currentStep: state => state.currentStep + 1,
    }),
    currentStepTitle() {
      return this.currentStepObject.detailTitle;
    },
  },
};
</script>

<style lang="scss" scoped>
.step-info {
  text-align: center;
  &__text {
    display: inline-block;
    font-family: $open-sans-bold;
    font-size: rem(32);
    margin-bottom: 10px;
  }
  &__counter {
    font-size: rem(14);
    line-height: 24px;
  }
}
</style>
