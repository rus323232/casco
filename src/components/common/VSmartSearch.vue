<template>
  <div class="smart-search">
    <div class="smart-search__search-icon">
      <icon-search />
    </div>
    <button class="smart-search__clear-btn">
      <icon-close />
    </button>
    <label class="smart-search__label">
      <input
        class="smart-search__input"
        type="text"
        :placeholder="placeholder"
      >
    </label>
  </div>
</template>

<script>
import IconSearch from '../icons/IconSearch.vue';
import IconClose from '../icons/IconClose.vue';

export default {
  props: {
    placeholder: {
      type: String,
      default: '',
    },
  },
  components: {
    IconSearch,
    IconClose,
  },
};
</script>

<style lang="scss" scoped>
.smart-search {
  position: relative;
  width: 100%;
  height: 73px;
  &__search-icon,
  &__clear-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  &__search-icon {
    left: 40px;
    height: 26px;
  }
  &__clear-btn {
    border: none;
    background-color: transparent;
    right: 40px;
  }
  &__label {
    display: block;
    width: 100%;
    height: 100%;
  }
  &__input {
    width: 100%;
    height: 100%;
    outline: none;
    padding-left: 116px;
    padding-right: 60px;
    border: 1px $grey-lighter solid;
    border-radius: 37px;
    color: $black;
    font-family: $open-sans;
    font-size: rem(18);
    line-height: rem(24);
    text-transform: uppercase;
    &::placeholder {
      color: #929292;;
    }
  }
}
</style>
