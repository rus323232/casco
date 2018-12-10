<template>
  <div class="accordion">
    <div v-for="(item, index) in getSlotsNames()"
         class="accordion__item"
         ref="item"
         :key="index"
    >
      <slot :name="item"/>
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
    itemDOMElement: {},
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
      this.itemDOMElement.style.height = this.itemDefaultHeight;
    },
    setExpandHeight() {
      this.itemDOMElement.style.height = `${this.itemDOMElement.scrollHeight + 20}px`;
    },
    toggleContent(index) {
      this.itemDOMElement = this.$refs.item[index];
      if (this.hasClass('_open')) {
        this.removeClass('_open');
        this.setDefaultHeight();
      } else {
        this.addClass('_open');
        this.setExpandHeight();
      }
    },
  },
  watch: {
    toggleElementByIndex(value) {
      if (
        value !== null
        && this.itemDOMElement instanceof Element
      ) {
        this.toggleContent(this.toggleElementByIndex);
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
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
    height: 100px;
    overflow: hidden;
    transition: height .3s ease;
    box-shadow: 0 10px 50px rgba(212, 188, 176, 0.5);
    background-color: #ffffff;
  }
}
</style>
