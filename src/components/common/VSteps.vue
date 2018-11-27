<template>
<div class="steps">
  <v-steps-item
    :has-error="false"
    :step-number="1"
    step-title="test"
    :sub-steps="[]"
  ></v-steps-item>
</div>
</template>

<script>
import VStepsItem from './VStepsItem.vue';

export default {
  components: {
    VStepsItem,
  },
};
</script>

<style lang="scss" scoped>
.steps {}
</style>
