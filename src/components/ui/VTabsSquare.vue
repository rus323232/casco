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
import tabsMixin from '../../mixins/tabs';

export default {
  mixins: [
    tabsMixin,
  ],
};
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  justify-content: center;
  width: auto;
  align-items: center;
  height: 50px;
  font-family: $open-sans-bold;
  font-size: rem(16);

  &__item {
    @include flex-row;
    position: relative;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 100%;
    border: 1px solid $grey-light;
    background-color: #f2f2f2;
    color: $grey;

    &._active {
      background-color: $white;
      border: none;
      &:after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background-color: $accent;
      }
      color: $black;
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
