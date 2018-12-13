<template>
  <div class="accordion">
    <div v-for="(item, index) in getSlotsNames()"
         class="accordion__item"
         ref="item"
         :key="index"
    >
      <slot :name="item" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    toggleElementByIndex: {
      type: Number,
      default: null,
    },
  },
  data: () => ({
    itemDefaultHeight: '100px',
    currentItemIndex: 0,
    mutationObserver: {},
  }),
  methods: {
    getSlotsNames() {
      return Object.keys(this.$slots).filter(slotName => /accordion-item*/ig.test(slotName));
    },
    hasClass(className) {
      if (this.itemDOMElement.classList) {
        return this.itemDOMElement.classList.contains(className);
      }
      return !!this.itemDOMElement.className.match(new RegExp(`(\\s|^)${className}(\\s|$)`));
    },
    addClass(className) {
      if (this.itemDOMElement.classList) {
        this.itemDOMElement.classList.add(className);
      } else if (!this.hasClass(className)) {
        this.itemDOMElement.className += ` ${className}`;
      }
    },
    removeClass(className) {
      if (this.itemDOMElement.classList) {
        this.itemDOMElement.classList.remove(className);
      } else if (this.hasClass(className)) {
        const reg = new RegExp(`(\\s|^)${className}(\\s|$)`);
        this.itemDOMElement.className = this.itemDOMElement.className.replace(reg, ' ');
      }
    },
    setDefaultHeight() {
      this.itemDOMElement.style.maxHeight = this.itemDefaultHeight;
    },
    setExpandHeight() {
      this.itemDOMElement.style.maxHeight = '9999px';
    },
    /**
     * Toggle slide item by index
     * @param index{Number}
     * @public
     */
    toggleContent(index) {
      this.currentItemIndex = index;
      if (!this.itemDOMElement) return;
      if (this.hasClass('_open')) {
        this.removeClass('_open');
        this.setDefaultHeight();
      } else {
        this.addClass('_open');
        this.setExpandHeight();
      }
    },
  },
  computed: {
    itemDOMElement() {
      const curIndex = this.currentItemIndex;
      if (curIndex in this.$refs.item) {
        return this.$refs.item[curIndex];
      }
      return null;
    },
  },
  watch: {
    toggleElementByIndex(value) {
      if (
        value !== null
        && this.itemDOMElement instanceof Element
      ) {
        this.$nextTick().then(() => {
          this.toggleContent(value);
        });
      }
    },
  },
  mounted() {
    this.$nextTick().then(() => {
      if (this.toggleElementByIndex !== null) {
        this.toggleContent(this.toggleElementByIndex);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
$selector : '.accordion';

#{$selector} {
  &__item {
    max-height: 100px;
    overflow: hidden;
    transition: max-height .5s ease;
    box-shadow: 0 10px 50px rgba(212, 188, 176, 0.5);
    background-color: #ffffff;
    margin-bottom: 20px;
  }
}
</style>
