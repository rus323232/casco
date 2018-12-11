import Vue from 'vue';
import Vuex from 'vuex';
import steps from './modules/steps';
import form from './modules/form';
import global from './global';

Vue.use(Vuex);

export default new Vuex.Store({
  strictMode: true,
  ...global,
  modules: {
    steps,
    form,
  },
});
