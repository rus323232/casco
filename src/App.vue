<template>
  <div id="soglasie-casco-calc" class="app">
    <v-loader v-if="$store.getters.showLoader"/>
    <v-header></v-header>
    <div class="b-content">
      <v-bread-crumbs>
        <a href="/" slot="link-1">Согласие</a>
        <a href="/individuals/" slot="link-2">Частным лицам</a>
        <a href="/individuals/avto/" slot="link-3">Автострахование</a>
        <a slot="link-4">Калькулятор КАСКО</a>
      </v-bread-crumbs>
    </div>
    <v-main-title text="Онлайн-калькулятор расчета стоимости полиса КАСКО" />
    <v-step-info />
    <router-view/>
    <v-main-info-block class="b-content" />
    <v-bottom-info-block />
    <v-footer></v-footer>
  </div>
</template>

<script>
import {
  createNamespacedHelpers,
} from 'vuex';
import VFooter from './components/common/VFooter.vue';
import VHeader from './components/common/VHeader.vue';
import VBreadCrumbs from './components/common/VBreadCrumbs.vue';
import VStepInfo from './components/common/VStepInfo.vue';
import VMainInfoBlock from './components/common/VMainInfoBlock.vue';
import VBottomInfoBlock from './components/common/VBottomInfoBlock.vue';
import VLoader from './components/common/VLoader.vue';
import VMainTitle from './components/ui/VMainTitle.vue';

const { mapActions } = createNamespacedHelpers('calc');

export default {
  components: {
    VFooter,
    VHeader,
    VBreadCrumbs,
    VMainTitle,
    VStepInfo,
    VMainInfoBlock,
    VBottomInfoBlock,
    VLoader,
  },
  methods: {
    ...mapActions({
      initCalcState: 'init',
    }),
  },
  created() {
    this.initCalcState(this);

    this.$axios.interceptors.response.use(
      response => response,
      (error) => {
        if (error.response.status === 401) {
          // this.showNotify({
          //   text: 'Вам необходимо пройти авторизацию'
          // });
        } else if ((error.response.status === 413)) {
          // this.showNotify({
          //   text: 'Размер файла превышает допустимую норму'
          // });
        } else {
          // this.showNotify({
          //   text: 'Ошибка соединения с сервером'
          // });
          return Promise.reject(error);
        }
        return Promise.resolve();
      },
    );
  },
};

</script>

<style lang="scss" src="./styles/main.scss"></style>
