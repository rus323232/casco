<template>
  <component class="button"
    :is="tag"
    :class="{
      [variant]: true,
      '_disabled': disabled,
      '_arrow': arrow
      }"
    :disabled="disabled"
    :type="type"
    :href="href"
    @click="onClick"
    :onclick="metricaString"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: 'orange',
      validator: val => ['orange', 'transparent'].includes(val),
    },
    type: {
      type: String,
      default: 'button',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    arrow: {
      type: Boolean,
      default: false,
    },
    href: {
      type: String,
      default: null,
    },
    metricaString: {
      type: String,
      default: f => f,
    },
  },
  methods: {
    onClick(e) {
      this.$emit('click', e);
    },
  },
  computed: {
    tag() {
      return this.href && this.href.length > 0 ? 'a' : 'button';
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  display: inline-block;
  font-family: $open-sans-bold;
  letter-spacing: rem(0.5);
  font-size: rem(12);
  padding-left: 40px;
  padding-right: 40px;
  border-radius: 28px;
  text-transform: uppercase;
  text-align: center;
  min-height: 40px;
  line-height: 40px;
  overflow: hidden;
  text-decoration: none;
  text-overflow: ellipsis;
  cursor: pointer;
  background-color: $white;
  color: $primary;
  border: 1px solid $accent;
  &.orange {
    background-image: $accent-gradient;
    color: $white;
    border: 1px solid transparent;

    &:hover,
    &:focus {
      color: $primary;
      background-image: none;
      border: 1px solid $accent;
      background-color: transparent;
      outline: none;
    }
  }
  &.transparent {
    background-color: $white;
    color: $primary;
    border: 1px solid $accent;

    &:hover,
    &:focus {
      color: $white;
      background-image: $accent-gradient;
      background-color: $accent;
      outline: none;
    }
  }
  &._disabled {
    cursor: not-allowed;
    opacity: 0.6;

    &:hover,
    &:focus {
      color: $white;
      background-image: $accent-gradient;
      background-color: $accent;
      outline: none;
    }
  }
  &._arrow {
    position: relative;
    width: 50px;
    height: 50px;
    padding-left: 0;
    padding-right: 0;
    &:after {
      content: '';
      width: 21px;
      height: 15px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(180deg);
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      background-image: url('~@/assets/images/arrow.svg');
    }
  }
}
</style>
