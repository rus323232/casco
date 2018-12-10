<template>
  <div class="mark">
    <v-smart-search
      placeholder="Введите название автомобиля"
    />
    <div class="mark__content">
      <v-tabs-slider
        :tabs="[
          'Марка',
          'Модель',
        ]"
        tabs-type="square"
      >
        <div slot="slide-1">
          <v-grouped-list
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
    };
  },
  methods: {
    toggleCarsList() {
      this.showOnlyPopular = !this.showOnlyPopular;
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
