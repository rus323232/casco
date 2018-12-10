<template>
<div class="tabs-slider">
  <div class="tabs-slider__tabs-wrapper"
       :class="{
        [customClass]: true,
       }"
  >
    <component
      :is="`v-tabs-${tabsType.toLowerCase()}`"
      class="tabs-slider__tabs"
      :items="tabs"
      :active-slide="currentTabIndex"
      @tabSelect="showTab"
    />
  </div>
  <div class="tabs-slider__body">
    <carousel
      :per-page="1"
      :adjustableHeight="true"
      :paginationEnabled="false"
      ref="tabsCarousel"
      @input="onPageChange"
    >
      <slide
        class="tabs-slider__slide"
        v-for="(slotName, index) of getSlotsNames()"
        :key="slotName.id"
        :data-index="index"
      >
        <slot :name="slotName"></slot>
      </slide>
    </carousel>
  </div>
</div>
</template>

<script>
import VTabsRounded from './VTabsRounded.vue';
import VTabsSquare from './VTabsSquare.vue';

export default {
  components: {
    VTabsRounded,
    VTabsSquare,
  },
  props: {
    tabs: {
      type: Array,
      required: true,
    },
    tabsType: {
      type: String,
      default: 'rounded',
      validator: value => ['rounded', 'square'].includes(value.toLowerCase()),
    },
    customClass: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      currentTabIndex: 0,
    };
  },
  methods: {
    getSlotsNames() {
      return Object.keys(this.$slots).filter(slotName => /slide-*/ig.test(slotName));
    },
    showTab(tabIndex) {
      this.carousel.goToPage(tabIndex);
      this.currentTabIndex = tabIndex;
    },
    onPageChange(pageIndex) {
      this.currentTabIndex = pageIndex;
    },
  },
  computed: {
    carousel() {
      return this.$refs.tabsCarousel;
    },
  },
};
</script>

<style lang="scss">
.tabs-slider {
  width: 100%;
  &__tabs {
    max-width: 810px;
  }
  &__tabs-wrapper {
    @include flex-row;
    justify-content: center;
  }
  &__body {
    padding: 50px 0;
  }
}
</style>
