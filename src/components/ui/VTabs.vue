<template>
<div class="tabs">
  <div class="tabs__item"
       v-for="(item, index) of items"
       :class="{
          '_active': index === activeSlide,
       }"
       :key="item.id"
       @click="$emit('tabSelect', index)"
  >
    {{ item }}
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
    activeSlide: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  justify-content: space-between;
  width: auto;
  align-items: center;
  height: 61px;
  border: 1px $grey-lighter solid;
  border-radius: 100px;
  font-family: $open-sans-bold;

  &__item {
    @include flex-row;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 0 36px;
    font-size: rem(16);
    width: 100%;
    max-width: 400px;
    height: 100%;
    text-align: center;
    color: $grey;
    cursor: pointer;
    white-space: nowrap;

    &._active {
      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: -1px;
        width: calc(100% + 2px);
        height: 100%;
        z-index: -5;
        display: block;
        border-radius: 100px;
        border: 1px $accent solid;
        background-color: transparent;
      }
      color: $accent;
    }
  }
}

@include media-phone() {
  .tabs {
    flex-wrap: wrap;
    height: auto;
    &__item {
      min-height: 43px;
    }
  }
}
</style>
