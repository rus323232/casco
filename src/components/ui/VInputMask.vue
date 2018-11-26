<template>
  <input ref="input"
         :value="value"
         @input="updateValue($event.target.value)"
         :disabled="disabled"
  />
</template>

<script>
/**
 * Модуль для добавления маски текстовым полям ввода
 * Основан на плагине inputmask https://github.com/RobinHerbots/Inputmask
 * @property value - объект из родительского компонента, который необходимо привязать к полю Input
 * @property {String}mask- маска ввода, согласно плагину inputmask
 * @property {Object}options - опции для инициализации плагина inputmask
 * (имеет приоритет над @property mask)
 * @property {Boolean}disabled - активировать/деактивировать input */
import InputMask from 'inputmask';

export default {
  name: 'MaskedInput',
  data: () => ({
    marginLeft: 0,
    mask_core: null,
    updateAfterAll: false,
  }),
  props: {
    value: {},
    mask: {
      validator: value => !!((value && value.length >= 1) || value instanceof Object),
    },
    placeholderChar: {
      type: String,
      default: '_',
      validator: value => !!(value && value.length === 1),
    },
    options: {
      type: Object,
      default: () => {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.initMask();
  },
  methods: {
    initMask() {
      try {
        let currentOptions = {};

        if (this.mask) { currentOptions.mask = this.mask; }

        if (this.placeholderChar) { currentOptions.placeholder = this.placeholderChar; }

        currentOptions = {
          ...currentOptions,
          ...this.options,
        };

        new InputMask(currentOptions).mask(this.$refs.input);
      } catch (e) {
        console.error(e.message);
        this.mask_core = null;
        this.$refs.input.value = 'Error, see console';
        this.$emit('input', this.$refs.input.value, '');
      }
    },
    updateValue(newValue) {
      this.$emit('input', newValue);
    },
  },
};
</script>
