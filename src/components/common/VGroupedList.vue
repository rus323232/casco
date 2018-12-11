<template>
  <div class="grouped-list">
    <div class="grouped-list__error">
      {{ errorText }}
    </div>
    <div class="grouped-list__body">
      <ul class="grouped-list__inner">
        <li
          class="grouped-list__item"
          v-for="item of sortedItems"
          :key="item.id"
        >
          <span class="grouped-list__letter">
            {{ item.key.toUpperCase()}}
          </span>
          <ul class="grouped-list__group-wrapper">
            <li
              v-for="(itemValue, itemIndex) of item.group"
              :key="itemValue.id"
            >
              <v-grouped-list-item
                :selected="itemValue === selectedItem"
                :text="itemValue"
                @click="selectItem(itemValue)"
                @unselect="unSelectItem(itemIndex)"
              />
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  sortArrayOfObjectByAlphabet,
  groupByLetter,
} from '@/tools';
import VGroupedListItem from './VGroupedListItem.vue';

export default {
  components: {
    VGroupedListItem,
  },
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
    selectedItem: {
      type: [String, Object],
    },
  },
  methods: {
    selectItem(item) {
      this.$emit('select', item);
    },
    unSelectItem(itemIndex) {
      this.$emit('unselect', itemIndex);
    },
  },
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
    column-count: 3;
    list-style: none;
    margin: 0;
    padding: 0;
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
    display: block;
    padding-top: 5px;
    font-family: $open-sans-bold;
    font-size: rem(24);
    width: 23px;
    color: $accent;
  }
  &__group-wrapper {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      &:not(:last-child) {
        margin-bottom: 5px;
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
