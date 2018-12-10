import store from 'store';
import axios from 'axios';
import objectToArrayTransformer from '@/transformers/object-to-array';

const api = {
  getCar: () => '/mock/CarModelMock.json',
};

export default {
  async getCars({ commit }) {
    try {
      const valueFromLS = store.get('carsCollection');
      if (valueFromLS) {
        commit('setCarsCollection', valueFromLS);
      } else {
        const cars = await axios.get(api.getCar());
        const carsArray = objectToArrayTransformer(cars.data);
        store.set('carsCollection', carsArray);
        commit('setCarsCollection', carsArray);
      }
    } catch (e) {
      console.error('error with getting cars', e);
    }
  },
  async init({ dispatch, commit }) {
    commit(
      'addPromiseToLoader',
      Promise.all([
        dispatch('getCars'),
      ]),
      {
        root: true,
      },
    );
  },
};
