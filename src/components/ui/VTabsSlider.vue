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
        :items="tabsTitles"
        :active-slide="currentTabIndex"
        @tabSelect="showTab"
      />
    </div>
    <div class="tabs-slider__body" :style="bodyStyles">
      <carousel
        :per-page="1"
        :adjustableHeight="true"
        :paginationEnabled="false"
        :mouseDrag="mouseDrag"
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
      validator: value => value.every(tab => typeof tab.title === 'string'),
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
    mouseDrag: {
      type: Boolean,
      default: false,
    },
    bodyStyles: {
      type: Object,
      default: () => {},
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
      if (!this.tabs[tabIndex].disabled) {
        this.carousel.goToPage(tabIndex);
        this.currentTabIndex = tabIndex;
      } else {
        this.$emit('selectDisabledTab');
      }
    },
    onPageChange(pageIndex) {
      this.currentTabIndex = pageIndex;
    },
  },
  computed: {
    carousel() {
      return this.$refs.tabsCarousel;
    },
    tabsTitles() {
      return Object.keys(this.tabs).map(key => this.tabs[key].title);
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
