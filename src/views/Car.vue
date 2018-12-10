<template>
  <div class="step-car">
    <div class="b-content">
      <v-accordion :toggle-element-by-index="0">
        <template slot="accordion-item-1">
          <div class="step-car__content-wrapper">
            <div class="step-car__tab-icon">
              <img src="~@/assets/images/icon-auto.png" alt="Авто">
            </div>
            <div class="step-car__tab-title">
              Выберите марку и модель автомобиля
            </div>
          </div>
          <div class="step-car__content">
            <div class="step-car__content-wrapper">
              <v-main-info
                :cars="carsCollection"
              />
            </div>
          </div>
        </template>
      </v-accordion>
    </div>
  </div>
</template>

<script>
import {
  createNamespacedHelpers,
} from 'vuex';
import VAccordion from '../components/ui/VAccordion.vue';
import VMainInfo from '../components/step-auto/VMainInfo.vue';

const { mapState } = createNamespacedHelpers('calc');

export default {
  components: {
    VAccordion,
    VMainInfo,
  },
  computed: {
    ...mapState({
      carsCollection: state => state.carsCollection,
    }),
  },
};
</script>

<style lang="scss">
.step-car {
  display: flex;
  padding-top: 46px;
  &__content-wrapper {
    @include flex-row;
    align-items: center;
    padding: 28px 80px;
  }
  &__tab-icon {
    margin-right: 20px;
    width: 47px;
    height: 47px;
    overflow: hidden;
    img {
      object-fit: contain;
    }
  }
  &__tab-title {
    color: $black;
    font-family: $open-sans-bold;
    font-size: rem(20);
  }
}
</style>
