<template>
  <a
    class="grouped-list-item"
    :class="{
      '_selected': selected,
      '_disabled': disabled,
    }"
    @click.stop="$emit('click')"
  >
    <span class="grouped-list-item__text">
      {{ text }}
    </span>
    <span
      v-if="selected"
      class="grouped-list-item__icon-holder"
      @click.stop="$emit('unselect')"
    >
      <icon-close
        :width="10"
        :height="10"
        color="#ef7c1c"
      />
    </span>
  </a>
</template>

<script>
import IconClose from '../icons/IconClose.vue';

export default {
  components: {
    IconClose,
  },
  props: {
    text: {
      type: String,
      default: '',
    },
    selected: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
$selector: '.grouped-list-item ';

#{$selector} {
  display: inline-block;
  cursor: pointer;
  position: relative;
  padding: 10px 0 10px 15px;
  line-height: rem(16);
  border: 1px solid transparent;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &__icon-holder {
    padding-left: 10px;
    padding-right: 15px;
  }
  &__text {
    font-size: rem(14);
    line-height: rem(16);
    color: $black;
    border-bottom: 1px $black dashed;
    &:hover {
      color: $accent;
      border-bottom: 1px $accent dashed;
    }
  }
  &._disabled {
    cursor: not-allowed;
    opacity: .6;
    &:hover {
      color: $grey;
    }
  }
  &._selected {
    border-radius: 100px;
    border: 1px solid $accent;
    #{$selector} {
      &__text {
        border-bottom: 1px transparent solid;
      }
    }
  }
}
</style>
