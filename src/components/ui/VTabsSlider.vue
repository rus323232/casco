<template>
<div class="tabs-slider">
  <div class="tabs-slider__tabs-wrapper">
    <v-tabs
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
import VTabs from './VTabs.vue';

export default {
  components: {
    VTabs,
  },
  props: {
    tabs: {
      type: Array,
      required: true,
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
}
</style>
