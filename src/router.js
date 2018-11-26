import Vue from 'vue';
import Router from 'vue-router';
import Car from './views/Car.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'car',
      component: Car,
    },
    {
      path: '/drivers',
      name: 'drivers',
      component: () => import('./views/Drivers.vue'),
    },
    {
      path: '/cost',
      name: 'cost',
      component: () => import('./views/Cost.vue'),
    },
    {
      path: '/data-check',
      name: 'data-check',
      component: () => import('./views/DataCheck.vue'),
    },
  ],
});
