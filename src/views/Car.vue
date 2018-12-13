<template>
  <div class="step-car">
    <div class="b-content">
      <v-accordion
        :toggle-element-by-index="activeAutoTabIndex"
        ref="accordion"
      >
        <template slot="accordion-item-1">
          <tab-header
            :is-active="mainInfoActive"
            @change="setActiveTabIndex(0)"
          >
            <template slot="icon">
              <img src="~@/assets/images/icon-auto.png" alt="Авто">
            </template>
            <template slot="title">
              {{ mainInfoActive
              ? 'Выберите марку и модель автомобиля'
              : 'Марка и модель'
              }}
            </template>
            <template slot="info">
              {{ carName }}
            </template>
          </tab-header>
          <div class="step-car__content">
            <div class="step-car__content-wrapper">
              <v-main-info
                :cars="carsCollection"
                @complete="onMainInfoComplete"
              />
            </div>
          </div>
        </template>
        <template slot="accordion-item-2" v-if="characteristicsActive">
          <tab-header
            :is-active="mainInfoActive"
            @change="setActiveTabIndex(0)"
          >
            <template slot="icon">
              <img src="~@/assets/images/icon-characteristic.png" alt="Характеристики">
            </template>
            <template slot="title">
              {{ characteristicsActive
              ? 'Выберите характеристики'
              : 'Характеристики'
              }}
            </template>
            <template slot="info">
              {{ carName }}
            </template>
          </tab-header>
          <div class="step-car__content">
            <div class="step-car__content-wrapper">
              !!!!!!!!!!!!!!!!!!!!!!!!!!
              !!!!!!!!!!!!!!!!!!!
              !
            </div>
          </div>
        </template>
      </v-accordion>
    </div>
  </div>
</template>

<script>
import {
  mapState as mapGlobalState,
} from 'vuex';
import { mapFields } from 'vuex-map-fields';
import VAccordion from '../components/ui/VAccordion.vue';
import TabHeader from '../components/step-auto/VTabHeader.vue';
import VMainInfo from '../components/step-auto/VMainInfo.vue';

export default {
  components: {
    VAccordion,
    VMainInfo,
    TabHeader,
  },
  methods: {
    onMainInfoComplete() {
      this.accordion.toggleContent(0);
      this.setActiveTabIndex(1);
    },
    setActiveTabIndex(index) {
      if (typeof index === 'number') {
        this.activeAutoTabIndex = index;
      }
    },
  },
  computed: {
    ...mapGlobalState({
      carsCollection: state => state.carsCollection,
    }),
    ...mapFields('form', {
      activeAutoTabIndex: 'activeAutoTabIndex',
      carInfo: 'autoData.model',
    }),
    carName() {
      const {
        UF_MODEL = '',
        UF_BRAND = '',
      } = this.carInfo;
      return `${UF_BRAND} ${UF_MODEL}`;
    },
    mainInfoActive() {
      return this.activeAutoTabIndex === 0;
    },
    characteristicsActive() {
      return this.activeAutoTabIndex === 1;
    },
    costActive() {
      return this.activeAutoTabIndex === 2;
    },
    accordion() {
      return this.$refs.accordion;
    },
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
    &._space-between {
      justify-content: space-between;
    }
  }
  &__info {
    font-size: 22px;
  }
  &__change-icon {
    margin-right: 10px;
    vertical-align: middle;
  }
  &__title-wrapper {
    @include flex-row;
    align-items: center;
  }
  &__two-columns {
    @include flex-row;
    justify-content: space-between;
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
    &._grey {
      color: $grey-lighter;
    }
  }
  &__change-btn-wrapper {
    text-align: right;
  }
  &__change-btn {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-decoration: none;
    text-overflow: ellipsis;
    cursor: pointer;
    background-color: $white;
    border: none;
    &:focus {
      outline: none;
    }
    span {
      color: $accent;
      font-family: $open-sans-semibold;
      font-size: rem(14);
      line-height: rem(24);
      text-transform: uppercase;
      border-bottom: 1px $accent dashed;
    }
  }
}
</style>
