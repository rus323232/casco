<template>
  <div class="tab-header"
       :class="{
          '_active': isActive,
       }"
  >
    <div class="tab-header__title-wrapper">
      <div class="tab-header__icon">
        <slot name="icon" />
      </div>
      <div class="tab-header__title"
           :class="{
              '_grey': !isActive,
           }"
      >
        <slot name="title" />
      </div>
    </div>
    <div class="tab-header__info"
         v-if="!isActive"
    >
      <slot name="info" />
    </div>
    <div class="tab-header__change-btn-wrapper">
      <button class="tab-header__change-btn"
              v-if="!isActive"
              @click="$emit('change')"
      >
        <icon-edit class="tab-header__change-icon" />
        <span>изменить</span>
      </button>
    </div>
  </div>
</template>

<script>
import IconEdit from '../icons/IconEdit.vue';

export default {
  components: {
    IconEdit,
  },
  props: {
    isActive: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.tab-header {
  @include flex-row;
  align-items: center;
  padding: 28px 80px;
  &__title-wrapper {
    @include flex-row;
    align-items: center;
    width: 100%;
  }
  &__title {
    color: $black;
    font-family: $open-sans-bold;
    font-size: rem(20);
    &._grey {
      color: $grey-lighter;
    }
  }
  &__icon {
    margin-right: 20px;
    width: 47px;
    height: 47px;
    overflow: hidden;
    img {
      object-fit: contain;
    }
  }
  &__change-btn-wrapper {
    text-align: right;
  }
  &__change-btn {
    width: 100%;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-decoration: none;
    text-overflow: ellipsis;
    cursor: pointer;
    background-color: $white;
    border: none;
    &:focus {
      outline: none;
    }
    span {
      color: $accent;
      font-family: $open-sans-semibold;
      font-size: rem(14);
      line-height: rem(24);
      text-transform: uppercase;
      border-bottom: 1px $accent dashed;
    }
  }
  &__change-icon {
    margin-right: 10px;
    vertical-align: middle;
  }
  &__info {
    width: 100%;
  }
  &._active {
    border-bottom: 1px $grey-lighter solid;
  }
}
</style>
