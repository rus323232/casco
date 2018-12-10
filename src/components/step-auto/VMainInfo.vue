<template>
  <div class="main-info">
    <v-smart-search
      placeholder="Введите название автомобиля"
    />
    <div class="main-info__content">
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
            class="main-info__brand"
            :error-text="brandError"
            :items="carsBrands"
          />
          <div class="main-info__centered-content">
            <v-button @click="toggleCarsList">
              {{ showOnlyPopular ? 'Показать все марки' : 'Показать популярные марки' }}
            </v-button>
          </div>
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
.main-info {
  width: 100%;
  &__content {
    padding: 44px 81px 64px 81px;
  }
  &__brand {
    margin-bottom: 40px;
  }
  &__centered-content {
    text-align: center;
  }
}
</style>
