<template lang="pug">
  .b-input(
    :class=`{
      '_disabled' : disabled,
      '_required' : required,
      '_error' : error,
      '_large' : type === 'textarea'
    }`
  )
    label
      span.b-input__caption
        slot
    v-input-mask(
      v-if="type === 'masked'",
      :mask="mask",
      :value="value",
      :disabled="disabled",
      @input="onMaskedInput"
    )
    textarea(
      v-else-if="type === 'textarea'",
      :value="value",
      @input="onInput",
      :disabled="disabled",
      :placeholder="placeholder",
      :name="name"
    )
    select(
      v-else-if="type === 'select'",
      :value="value",
      @change="onInput",
      :disabled="disabled",
      :placeholder="placeholder",
      :name="name"
    )
      slot(
        name="options"
      )
    input(
      v-else,
      :type="type",
      :value="value",
      @input="onInput",
      :disabled="disabled",
      :placeholder="placeholder",
      :name="name"
    )
    .b-input__error {{ errorMsg }}
</template>

<script>
import VInputMask from './VInputMask.vue';

export default {
  name: 'v-input',
  components: {
    VInputMask,
  },
  props: {
    value: null,
    name: String,
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    errorMsg: {
      type: String,
      default: '',
    },
    mask: null,
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value);
    },
    onMaskedInput(value) {
      this.$emit('input', value);
    },
  },
};
</script>

<style lang="scss" scoped>
$selector : '.b-input';

#{$selector}:last-child{
  margin-bottom: 0;
}

#{$selector} {
  position: relative;
  width: 100%;
  margin-bottom: 20px;

  &._large {
    height: 120px;
  }

  &._disabled {
    input, textarea {
      color: $grey;
      background-color: $grey-lighter;
      cursor: not-allowed;
    }
  }

  input, textarea {
    &::placeholder {
      text-transform: uppercase;
    }
  }

  input, textarea, select {
    font-family: $open-sans;
    height: 60px;
    border: 1px solid $grey-light;
    box-shadow: none;
    text-overflow: ellipsis;
    padding: 0 30px 0 15px;
    background-color: $white;
    width: 100%;
    font-size: rem(14);
    text-transform: none;

    &:focus {
      border: 1px solid $blue;
      outline: none;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
    }

    &::placeholder {
      text-transform: none;
    }
  }
  select {
    background-image: url('~@/assets/images/angle.png');
    background-position: calc(100% - 13px) 50%;
    background-size: 11px;
    background-repeat: no-repeat;
    background-color: #fff;
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: '';

    &::-ms-expand {
      display: none;
    }

  }
  textarea {
    padding: 15px 15px 0 15px;
    resize: none;
    height: 120px;
    white-space: pre-line;
  }
  label {
    display: block;
    color: $grey-medium;
    padding: 0 20px 0 0;
    font-size: rem(12);
    max-height: 25px;
    max-width: 90%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 700;
    text-transform: uppercase;
    z-index: 2;
  }

  &__error {
    pointer-events: none;
    display: none;
    margin-left: 20px;
    color: $error;
    font-size: rem(12);
  }

  &._required {
    label {
      .b-input__caption {
        position: relative;
      }

      &::after {
        content: '*';
        position: absolute;
        font-size: 12px;
        color: $red;
        right: 10px;
        top: 1px;
      }
    }
  }

  &._error {
    input, textarea, select {
      border: 1px solid $red;
    }

    #{$selector}__error {
      display: block;
    }
  }
}
</style>
