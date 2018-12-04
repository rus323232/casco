<template>
<div class="wrapper"
     :style="{
        'text-align': position,
      }"
>
  <h1 class="main-title">
    {{ text }}
  </h1>
</div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
    },
    position: {
      type: String,
      default: 'center',
      validator: val => ['left', 'right', 'center'].includes(val),
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  text-align: center;
  margin-top: 56px;
  margin-bottom: 22px;
}
.main-title {
  display: inline-block;
  font-family: $open-sans;
  font-weight: 300;
  position: relative;
  color: $grey-lighter;
  font-size: rem(18);
  line-height: rem(24);
  padding-bottom: 21px;
  &:after {
    content: '';
    bottom: 0;
    left: calc(50% - 35px);
    position: absolute;
    display: inline-block;
    width: 70px;
    height: 2px;
    background-color: $accent;
  }
}
</style>
