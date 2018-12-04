<template>
  <header class="header">
    <div class="header__inner b-content">
      <a class="header__logo"
         href="/"
      >
        <img src="@/assets/images/logo-white.png" alt="Согласие">
      </a>
      <div class="header__calc-logo">
        <img src="@/assets/images/calc-logo.png" alt="Калькулятор КАСКО">
        <span>Каско</span>
      </div>
      <div class="header__steps-container">
        <v-steps></v-steps>
      </div>
    </div>
  </header>
</template>

<script>
import VSteps from './VSteps.vue';

export default {
  name: 'VHeader',
  components: {
    VSteps,
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  background-color: #ef801c;
  background-image: linear-gradient(90deg,#ef891c 0,#ef6b1c);
  &__inner {
    @include flex-row;
    height: 100px;
    align-items: center;
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
    margin-right: 58px;
    img {
      width: 51px;
      height: 64px;
      margin-right: 20px;
    }
  }
  &__steps-container {
    @include flex-row;
    flex-wrap: nowrap;
    height: 100%;
    width: calc(50% + 113px);
    z-index: 15;
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
@include media-tablet() {
  .header {
    &__steps-container {
      display: none;
    }
  }
}
</style>
