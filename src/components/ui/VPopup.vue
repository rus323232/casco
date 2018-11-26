<template lang="pug">
  transition(name="fade")
    .overlay(v-show="show")
      div(
        :class="'popup-info b-popup-basic ' + additionalClass",
        :styles="styles",
        ref="container"
      )
        a.close-button(v-if="closeable" v-on:click="close")
        .content(
          ref="content"
        )
          .slot-container
            slot
</template>

<script>
export default {
  name: 'popup',
  props: {
    header: {
      type: String,
      default: '',
    },
    value: {
      type: Boolean,
      default: false,
    },
    closeable: {
      type: Boolean,
      default: true,
    },
    additionalClass: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      show: this.value,
      styles: {},
    };
  },
  methods: {
    close() {
      if (this.closeable) {
        this.$emit('input', false);
        this.$emit('popupClose');
        $('html, body').css('overflow', '');
      }
    },
    getHeight() {
      return this.$refs.content.offsetHeight;
    },
    checkHeight(val) {
      const currentVal = val || this.show;
      const $html = 'html, body';

      this.$nextTick(() => {
        // Не центровать блок на узких экранах
        if ($(window).height() < this.getHeight()) {
          $(this.$refs.container).css({
            transform: 'translate(-50%, 0)',
            top: 0,
          });

          if (currentVal) {
            $($html).css('overflow', 'hidden');
          } else {
            $($html).css('overflow', '');
          }
        } else {
          $(this.$refs.container).css({
            transform: 'translate(-50%, -50%)',
            top: '50%',
          });
        }
      });
    },
  },
  watch: {
    value(val) {
      this.show = this.value;
      if (!val) {
        $('html, body').css('overflow', '');
      }
    },
    show(val) {
      if (val) {
        this.checkHeight(val);
      }
    },
  },
  mounted() {
    const component = this;

    $('.overlay').on('click', function (e) {
      if (e.target !== this) { return; }
      component.close();
    });
  },
  beforeDestroy() {
    $('html, body').css('overflow', '');
  },
};
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  overflow-y: auto;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 500ms;
  z-index: 100;

  &:target {
    visibility: visible;
    opacity: 1;
  }
}

.b-popup-basic {
  &.popup-info {
    width: 100%;
    max-width: 532px;
    background: #fff;
    position: absolute;
    margin: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 32px 30px 78px 30px;

    .h2 {
      margin-top: 0;
      color: #333;
      font-family: Tahoma, Arial, sans-serif;
    }

    .content {
      position: relative;
      height: 100%;
    }

    .close-button {
      position: absolute;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 20px 20px;
      top: 0;
      right: -60px;
      z-index: 9999;
      transition: all 200ms;
      font-size: 1.5rem;
      font-weight: bold;
      text-decoration: none;
      width: 60px;
      height: 60px;
      background-color: $green;
      background-image: url('@/assets/images/cross.svg');

      &:hover {
        cursor: pointer;
        color: $accent;
      }
    }
  }
  &__title {
    text-align: center;
    width: 100%;
  }
  &__content {
    width: 100%;
    padding: 40px 0 40px 5px;
  }
  &__buttons {
    width: 100%;
    text-align: center;
  }
}
</style>
