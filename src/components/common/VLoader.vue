<template>
  <div class="loader">
    <vue-lottie class="loader__new-icon"
         :options="params"
         :height="100"
         :width="100"
         @animCreated="handleAnimation"
    ></vue-lottie>
  </div>
</template>

<script>
/* eslint-disable import/extensions */
import VueLottie from 'vue-lottie';
import animationData from '../../modules/animation-data-for-loader';

export default {
  components: {
    VueLottie,
  },
  data: () => ({
    animationInstance: null,
    params: {
      animationData,
      container: null,
      renderer: 'svg',
      loop: true,
      autoplay: true,
    },
  }),
  methods: {
    handleAnimation(instance) {
      this.animationInstance = instance;
      this.animationInstance.setSpeed(1.7);
    },
  },
  beforeDestroy() {
    if (this.animationInstance) this.animationInstance.stop();
  },
};
</script>

<style lang="scss" scoped>
.loader {
  position: fixed;
  z-index: 9999;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: hsla(0, 0%, 100%, 0.7);

  &__new-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: transparent;
    transform: translate(-50%, -50%);
    z-index: 9999;
    border-radius: 50%;
    overflow: hidden;
    width: 100px;
    height: 100px;
  }
}
</style>
