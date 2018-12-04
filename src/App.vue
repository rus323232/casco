<template>
  <div id="soglasie-casco-calc" class="app">
    <v-header></v-header>
    <div class="b-content">
      <v-bread-crumbs>
        <a href="/individuals/" slot="link-1">Частным лицам</a>
        <a href="/individuals/" slot="link-2">Частным лицам</a>
        <a href="/individuals/" slot="link-3">Частным лицам</a>
      </v-bread-crumbs>
    </div>
    <v-main-title text="Онлайн-калькулятор расчета стоимости полиса КАСКО" />
    <v-step-info />
    <router-view/>
    <v-main-info-block class="b-content" />
    <v-footer></v-footer>
  </div>
</template>

<script>
import VFooter from './components/common/VFooter.vue';
import VHeader from './components/common/VHeader.vue';
import VBreadCrumbs from './components/common/VBreadCrumbs.vue';
import VStepInfo from './components/common/VStepInfo.vue';
import VMainInfoBlock from './components/common/VMainInfoBlock.vue';
import VMainTitle from './components/ui/VMainTitle.vue';

export default {
  components: {
    VFooter,
    VHeader,
    VBreadCrumbs,
    VMainTitle,
    VStepInfo,
    VMainInfoBlock,
  },
};

</script>

<style lang="scss" src="./styles/main.scss"></style>
