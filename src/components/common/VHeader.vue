<template>
  <header class="header">
    <div class="header__inner b-content">
      <div class="header__logo">
        <img src="@/assets/images/logo-white.png" alt="Согласие">
      </div>
      <div class="header__calc-logo">
        <img src="@/assets/images/calc-logo.png" alt="Калькулятор КАСКО">
        <span>Каско</span>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'VHeader',
};
</script>

<style lang="scss" scoped>
.header {
  height: 99px;
  position: relative;
  background-color: #e87317;
  &__inner {
    @include flex-row;
    align-items: center;
    height: 100%;
  }
  &__logo {
    width: 200px;
    margin-right: 75px;
    img {
      max-width: 100%;
    }
  }
  &__calc-logo {
    @include flex-row;
    align-items: center;
    font-size: rem(22);
    color: $white;
    background-color: #e97f1b;
    padding: 4px;
    img {
      width: 51px;
      height: 64px;
      margin-right: 20px;
    }
  }
  &:after {
    background-color: #da721d;
    bottom: 0;
    content: "";
    left: calc(50% - 113px);
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
