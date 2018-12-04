<template>
<ul class="breadcrumbs">
  <li
    class="breadcrumbs__item"
    v-for="slotName of getSlotsNames()"
    :key="slotName.id"
  >
    <slot :name="slotName"></slot>
  </li>
</ul>
</template>

<script>
export default {
  methods: {
    getSlotsNames() {
      return Object.keys(this.$slots).filter(slotName => /link-*/ig.test(slotName));
    },
  },
};
</script>

<style lang="scss" scoped>
$selector : '.breadcrumbs';

#{$selector} {
  padding-top: 17px;
  padding-left: 0;
  margin: 0;
  list-style: none;

  &__item {
    display: inline-block;
    position: relative;
    color: $grey-medium;
    font-size: rem(12);
    margin: 0;
    padding: 0;

    &:not(:last-child) {
      margin-right: 10px;
      &:after {
        content: '';
        border-style: solid;
        border-color: $grey-medium;
        border-width: 1px 1px 0 0;
        display: inline-block;
        height: 4px;
        width: 4px;
        line-height: 16px;
        transform: rotate(45deg);
        vertical-align: middle;
        margin-left: 10px;
        margin-top: -2px;
      }
    }

    &:hover {
      color: $accent;
    }
  }
}
</style>
