<template>
<div class="step-wrapper"
     :class="{
      '_not-active': !isStepActive,
      '_last-step': isLastStep
     }"
>
  <div class="step">
    <span class="step-title"
          v-if="!hasError"
          @click="goToStep"
    >
      {{ stepTitle }}
    </span>
    <span class="step-title"
          v-if="hasError"
          @click="goToStep"
          style="color: #b10c0c"
    >
      {{ stepTitle }}
    </span>
    <i :class="iconClass"
       aria-hidden="true"
       v-if="!hasError"
       @click="goToStep"
    >
    </i>
    <i class="fa fa-exclamation-circle"
       aria-hidden="true"
       v-else
       style="color: #b10c0c"
    >
    </i>
    <div class="progress-container" v-if="!isLastStep">
      <div class="progress-line" :style="{ width: progressLineWidth }"></div>
      <div class="progress-line-dashed"></div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    currentStep: {
      type: Number,
      default: () => 0,
    },
    currentSubStep: {
      type: Number,
      default: () => 0,
    },
    stepTitle: {
      type: String,
      required: true,
    },
    stepNumber: {
      type: Number,
      required: true,
    },
    subSteps: {
      type: Array,
      required: true,
    },
    hasError: {
      type: Boolean,
      required: true,
    },
    stepsCount: {
      type: Number,
      required: true,
    },
  },
  methods: {
    goToStep() {
      if (this.isStepActive) {
        this.$emit('onStepChange', this.stepNumber);
      }
    },
  },
  computed: {
    iconClass() {
      if (this.isStepActive) {
        return 'fa fa-check-circle';
      }
      return 'fa fa-circle';
    },
    subStepsCount() {
      return this.subSteps.length;
    },
    progressLineWidth() {
      if (this.currentStep === this.stepNumber && this.subStepsCount !== 0) {
        return `${(100 / this.subStepsCount) * this.currentSubStep}%`;
      }
      if (this.currentStep <= this.stepNumber) {
        return '0%';
      }
      return '100%';
    },
    isStepActive() {
      return this.currentStep >= this.stepNumber;
    },
    isLastStep() {
      return this.stepNumber === this.stepsCount - 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.step-wrapper {
  @include flex-row;
  width: 100%;
  text-align: left;
  flex-wrap: nowrap;
  height: 100%;
  color: $white;

  &._not-active {
    opacity: .4;

    .step {
      i {
        cursor: default;
        &:hover {
          transform: none;
        }
      }
      .step-title {
        cursor: default;
      }
    }
  }

  &._last-step {
    width: auto;
  }
}
.step {
  position: relative;
  text-align: left;
  width: 100%;

  i {
    position: absolute;
    display: inline-block;
    width: 28px;
    height: 19px;
    background-color: #da6d1d;
    border-radius: 50%;
    top: 31px;
    font-size: 18px;
    z-index: 6;
    cursor: pointer;

    &:after {
      content: '';
      position: absolute;
      display: block;
      border: 2px #da6d1d solid;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      bottom: -2.1px;
      left: 1.5px;
    }

    &:before {
      border-radius: 50%;
      position: absolute;
      left: 6px;
    }

    &:hover {
      transform: scale(1.1);
    }
  }
}
.step-title {
  display: block;
  cursor: pointer;
  padding-left: 6px;
  letter-spacing: .05em;
  font-size: rem(12);
  text-transform: uppercase;
}
.progress-container {
  display: block;
  width: calc(100% - 28px);
  margin-top: 10px;
  float: right;
  z-index: 124;
  position: relative;
}
.progress-line {
  border-bottom: 3px #fff solid;
  position: absolute;
  z-index: 4;
  width: 50%;
  top: 0;
  transition: width 0.5s ease-in-out;
}
.progress-line-dashed {
  position: absolute;
  top: 1px;
  width: 100%;
  border-bottom: 1px #fff dashed;
}
</style>
