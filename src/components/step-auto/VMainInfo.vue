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
            :items="carsList"
          />
          <button @click="toggleCarsList">
            {{ showOnlyPopular ? 'Показать все марки' : 'Показать популярные марки' }}
          </button>
        </div>
        <div slot="slide-2">
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
      type: Array,
    },
  },
  data() {
    return {
      showOnlyPopular: true,
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
        ? this.cars.filter(car => car.UF_POPULAR !== '0')
        : this.cars;
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
