<template>
  <div class="mark">
    <v-smart-search
      placeholder="Введите название автомобиля"
    />
    <div class="mark__content">
      <v-tabs-slider
        :tabs="tabs"
        tabs-type="square"
        :body-styles="{
          padding: '0px 0px',
        }"
        :mouseDrag="false"
        @selectDisabledTab="onSelectDisabledTab"
      >
        <div slot="slide-1">
          <v-grouped-list
            :error-text="brandError"
            :items="carsBrands"
          />
          <button @click="toggleCarsList">
            {{ showOnlyPopular ? 'Показать все марки' : 'Показать популярные марки' }}
          </button>
        </div>
        <div slot="slide-2">
          <v-grouped-list
            :items="carsModels"
          />
        </div>
      </v-tabs-slider>
    </div>
  </div>
</template>

<script>
import VGroupedList from '../common/VGroupedList.vue';
import VSmartSearch from '../common/VSmartSearch.vue';
import VTabsSlider from '../ui/VTabsSlider.vue';

export default {
  components: {
    VGroupedList,
    VSmartSearch,
    VTabsSlider,
  },
  props: {
    cars: {
      type: Object,
    },
  },
  data() {
    return {
      showOnlyPopular: true,
      selectedBrand: '',
      brandError: '',
    };
  },
  methods: {
    toggleCarsList() {
      this.showOnlyPopular = !this.showOnlyPopular;
    },
    onSelectDisabledTab() {
      this.brandError = 'Сначала выберете марку';
    },
  },
  computed: {
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
      if (this.selectedBrand) {
        return '';
      }
      return [];
    },
    tabs() {
      return [
        {
          title: 'Марка',
        },
        {
          title: 'Модель',
          disabled: true,
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.mark {
  width: 100%;
  &__content {
    padding: 44px 81px 64px 81px;
  }
}
</style>
