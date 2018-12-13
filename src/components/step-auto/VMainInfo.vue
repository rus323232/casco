<template>
  <div class="main-info">
    <v-smart-search
      :cars="cars.all"
      :value="selectedModel"
      @input="onSmartSearchInput"
      @delete="clearData"
      placeholder="Введите название автомобиля"
    />
    <div class="main-info__content">
      <v-tabs-slider
        :tabs="tabs"
        :body-styles="{
          padding: '0px 0px',
        }"
        :mouseDrag="false"
        tabs-type="square"
        ref="slider"
        @selectDisabledTab="onSelectDisabledTab"
      >
        <div slot="slide-1">
          <v-grouped-list
            class="main-info__brand"
            :error-text="errorText"
            :items="carsBrands"
            :selected-item="selectedBrand"
            @select="onBrandSelect"
            @unselect="onBrandUnSelect"
          />
          <div class="main-info__centered-content">
            <v-button variant="transparent" @click="toggleCarsList">
              {{ showOnlyPopular ? 'Показать все марки' : 'Показать популярные марки' }}
            </v-button>
          </div>
        </div>
        <div slot="slide-2">
          <v-grouped-list
            :items="carsModels"
            :splitByAlphabet="false"
            :selected-item="selectedModel"
            key-for-sort="ID"
            key-for-text="UF_MODEL"
            @select="onModelSelect"
            @unselect="onModelUnSelect"
          />
        </div>
      </v-tabs-slider>
    </div>
  </div>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import VGroupedList from '../common/VGroupedList.vue';
import VSmartSearch from '../common/VSmartSearch.vue';
import VTabsSlider from '../ui/VTabsSlider.vue';
import VButton from '../ui/VButton.vue';

export default {
  components: {
    VGroupedList,
    VSmartSearch,
    VTabsSlider,
    VButton,
  },
  props: {
    cars: {
      type: Object,
    },
  },
  data() {
    return {
      showOnlyPopular: true,
      showError: false,
    };
  },
  methods: {
    toggleCarsList() {
      this.showOnlyPopular = !this.showOnlyPopular;
    },
    onSelectDisabledTab() {
      this.showError = true;
    },
    onBrandSelect(brand) {
      if (this.carsBrands.includes(brand)) {
        this.selectedBrand = brand;
      }
    },
    onBrandUnSelect() {
      this.selectedBrand = '';
      this.showError = false;
    },
    onModelSelect(model) {
      this.selectedModel = {
        ...model,
      };
      this.$emit('complete');
    },
    onModelUnSelect() {
      const { selectedModel } = this;
      this.selectedModel = {
        ...Object.keys(selectedModel).map(key => ({ [key]: '' })),
      };
    },
    clearData() {
      this.onBrandUnSelect();
      this.onModelUnSelect();
    },
    onSmartSearchInput(newValue) {
      if (!newValue) return;
      this.selectedBrand = newValue.UF_BRAND;
      this.selectedModel = {
        ...newValue,
      };
      this.$emit('complete');
    },
    slideToTab(tabName) {
      const tabsNames = [
        'brand',
        'model',
      ];
      if (tabName.includes(tabName)) {
        this.$nextTick().then(() => {
          this.slider.showTab(tabsNames.indexOf(tabName));
        });
      }
    },
  },
  computed: {
    ...mapFields('form', {
      selectedBrand: 'autoData.brand',
      selectedModel: 'autoData.model',
    }),
    expandAllCarsListIfNeed() {

    },
    errorText() {
      return (this.showError && !this.selectedBrand)
        ? 'Сначала выберите марку'
        : '';
    },
    isBrandSelect() {
      return this.selectedBrand !== '';
    },
    carsList() {
      return this.showOnlyPopular
        ? this.cars.popular
        : this.cars.all;
    },
    carsBrands() {
      return this.carsList.reduce((carsBrands, car) => {
        if (!carsBrands.includes(car.UF_BRAND)) {
          carsBrands.push(car.UF_BRAND);
        }
        return carsBrands;
      }, []);
    },
    carsModels() {
      if (!this.selectedBrand) {
        return [];
      }
      return this.cars.all.filter(car => car.UF_BRAND === this.selectedBrand);
    },
    tabs() {
      return [
        {
          title: 'Марка',
        },
        {
          title: 'Модель',
          disabled: !this.isBrandSelect,
        },
      ];
    },
    slider() {
      return this.$refs.slider;
    },
  },
  watch: {
    selectedBrand(brand) {
      if (brand) {
        this.slideToTab('model');
      } else {
        this.slideToTab('brand');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.main-info {
  width: 100%;
  &__content {
    padding: 44px 0 64px 0;
  }
  &__brand {
    margin-bottom: 40px;
  }
  &__centered-content {
    text-align: center;
  }
}
</style>
