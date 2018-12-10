<template>
  <div class="grouped-list">
    <div class="grouped-list__error">
      {{ errorText }}
    </div>
    <div class="grouped-list__body">
      <div class="grouped-list__inner">
        <div
          class="grouped-list__item"
          v-for="item in sortedItems"
          :key="item.id"
        >
          <span class="grouped-list__letter">
            {{ item.key.toUpperCase()}}
          </span>
          <ul class="grouped-list__group-wrapper">
            <li
              v-for="itemValue in item.group"
              :key="itemValue.id"
            >
              <a
                class="grouped-list__caption"
              >
                {{ itemValue }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  sortArrayOfObjectByAlphabet,
  groupByLetter,
} from '@/tools';

export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    errorText: {
      type: String,
      default: '',
    },
    splitByAlphabet: {
      type: Boolean,
      default: true,
    },
    keyForSort: {
      type: String,
      default: '',
    },
  },
  methods: {},
  computed: {
    sortedItems() {
      return this.splitByAlphabet
        ? groupByLetter(sortArrayOfObjectByAlphabet(this.items, this.keyForSort))
        : this.items;
    },
  },
};
</script>

<style lang="scss" scoped>
.grouped-list {
  @include flex-col;
  &__error {
    @include flex-col;
    justify-content: center;
    width: 100%;
    text-align: center;
    font-size: rem(14);
    color: $red;
    height: 40px;
  }
  &__inner {
    overflow: hidden;
    column-count: 3;
  }
  &__item {
    @include flex-row;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 30px;

    &._no-margin {
      margin: 0;
    }
  }
  &__letter {
    font-family: $open-sans-bold;
    font-size: rem(24);
    width: 37px;
    height: 100%;
    float: left;
    color: $accent;
  }
  &__group-wrapper {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  &__caption {
    display: inline-block;
    cursor: pointer;
    position: relative;
    font-size: rem(14);
    line-height: rem(23);
    color: $black;
    border-bottom: 1px $black dashed;
    &:not(:last-child) {
      margin-bottom: 5px;
    }
    &:hover {
      color: $accent;
      border-bottom: 1px $accent dashed;
    }
    &._disabled {
      cursor: not-allowed;
      opacity: .6;
      &:hover {
        color: $grey;
      }
    }
  }
}

@include media-phone(){
  .grouped-list {
    &__innder {
      column-count: 2;
    }
    &__group-wrapper {
      float: right;
      width: 100%;
    }
    &__letter {
      width: 100%;
    }
  }
}
</style>
