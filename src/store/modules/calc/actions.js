import store from 'store';
import axios from 'axios';
import objectToArrayTransformer from '@/transformers/object-to-array';

const api = {
  getCar: () => '/mock/CarModelMock.json',
};

const getPopularCars = carsArray => carsArray.filter(car => car.UF_POPULAR !== '0');

export default {
  async getCars({ commit }) {
    try {
      const valueFromLS = store.get('carsCollection');
      if (valueFromLS) {
        commit('setCarsCollection', {
          popular: valueFromLS.popular,
          all: valueFromLS.all,
        });
      } else {
        const cars = await axios.get(api.getCar());
        const carsArray = objectToArrayTransformer(cars.data);
        const popularCars = getPopularCars(carsArray);
        store.set('carsCollection', {
          popular: popularCars,
          all: carsArray,
        });
        commit('setCarsCollection', {
          popular: popularCars,
          all: carsArray,
        });
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
