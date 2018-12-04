<template>
<div class="main-info-block">
  <v-tabs-slider
    :tabs="tabs"
  >
    <div slot="slide-1">
      bla
    </div>
    <div slot="slide-2">
      blaasdsad
    </div>
  </v-tabs-slider>
</div>
</template>

<script>
import VTabsSlider from '../ui/VTabsSlider.vue';

export default {
  components: {
    VTabsSlider,
  },
  data() {
    return {
      tabs: [
        'Зачем нужно страховать КАСКО?',
        'Факторы, влияющие на стоимость КАСКО',
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.main-info-block {
  margin-top: 100px;
  margin-bottom: 100px;

}
</style>
