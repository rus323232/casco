<template>
  <div class="grouped-list">
    <div class="grouped-list__error">
      {{ errorText }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    errorText: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.grouped-list {
  &__error {
    display: inline-block;
    padding-top: 10px;
    padding-bottom: 10px;
    width: 100%;
    text-align: center;
    font-size: rem(14);
    color: $red;
  }
}
</style>
