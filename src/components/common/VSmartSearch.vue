<template>
  <div class="smart-search">
    <div class="smart-search__input-wrapper">
      <label class="smart-search__label">
        <input type="text"
               class="smart-search__input"
               v-model.trim="searchText"
               @focus="showItems"
               @blur="onBlur"
               @keydown="keyDown"
        />
      </label>
      <div class="smart-search__search-icon">
        <icon-search />
      </div>
      <button class="smart-search__clear-btn"
              @click="clearData"
      >
        <icon-close />
      </button>
    </div>
    <div class="smart-search__items-wrapper"
         :style="{
            maxHeight: containerMaxHeight,
         }"
    >
      <div class="smart-search__bar-content" v-bar>
        <ul class="smart-search__items"
            ref="scrollbar"
            :style="{
              maxHeight: itemsContainerMaxHeight,
            }"
        >
          <li class="smart-search__item"
              :class="{
                '_active': index === focusIndex,
              }"
              :style="{
                minHeight: `${itemMinHeight}px`,
              }"
              v-for="(item, index) of items"
              :key="item.id"
              @click="chooseItem(item)"
          >
            <span v-html="HTMLContent(item)"></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import EngToRusKeyMap from '@/maps/EngToRusKeyMap';
import RusToEngKeyMap from '@/maps/RusToEngKeyMap';
import TranslitKeyMap from '@/maps/TranslitKeyMap';
import IconSearch from '../icons/IconSearch.vue';
import IconClose from '../icons/IconClose.vue';

export default {
  components: {
    IconSearch,
    IconClose,
  },
  props: {
    value: {
      type: [Object, Array, String],
    },
    cars: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    itemMinHeight: {
      type: Number,
      default: 48,
    },
    itemsContainerMaxHeight: {
      type: Number,
      default: 444,
    },
    itemsContainerTopOffset: {
      type: Number,
      default: 44,
    },
    maxCharsTrigger: {
      type: Number,
      default: 2,
    },
    getLabel: {
      type: Function,
      default({ UF_BRAND, UF_MODEL }) {
        return `${UF_BRAND} ${UF_MODEL}`;
      },
    },
  },
  data() {
    return {
      items: [],
      searchText: this.getLabel(this.value).trim(),
      showList: false,
      focusIndex: -1, // индекс активного элемента списка
      searchTimeOut: {}, // таймаут запроса после смены строки поиска
    };
  },
  methods: {
    onBlur() {
      this.showList = false;
    },
    clearData() {
      this.$emit('delete');
      this.searchText = '';
    },
    onScrollbarWheel() {
      this.refreshFocusIndex();
    },
    chooseItem(item) {
      if (item) {
        this.searchText = this.getLabel(item);
        this.$emit('input', item);
      }
    },
    refreshFocusIndex() {
      if (this.focusIndex !== -1) {
        this.focusIndex = -1;
      }
    },
    showItems() {
      if (this.items.length && this.searchText) {
        this.showList = true;
      }
    },
    handleArrowKeys(key) {
      const { scrollContainerTo } = this;
      // When cursor out of range
      const lastItemIndex = this.items.length - 1;
      if (!this.showList) return;
      switch (key) {
        case 40: // down
          this.focusIndex += 1;
          if (this.focusIndex === 0) {
            scrollContainerTo('start');
          } else {
            scrollContainerTo('down');
          }
          break;
        case 38: // up
          this.focusIndex -= 1;
          scrollContainerTo('up');
          break;
        case 13: // enter
          if (this.focusIndex !== -1) {
            this.chooseItem(this.items[this.focusIndex]);
          }
          this.showList = false;
          break;
        case 27: // esc
          this.showList = false;
          break;
        default:
          this.showList = false;
      }
      if (this.focusIndex > lastItemIndex) {
        this.focusIndex = 0;
        scrollContainerTo('start');
      } else if (this.focusIndex < 0) {
        this.focusIndex = lastItemIndex;
        scrollContainerTo('end');
      }
    },
    keyDown(e) {
      const key = e.keyCode;
      switch (key) {
        case 37: // left
        case 38: // up
        case 39: // right
        case 40: // down
        case 13: // enter
        case 27: // esc
          this.handleArrowKeys(key);
          break;
        default:
          this.showList = false;
          this.onSearchChange(e.target.value);
      }
    },
    /**
     * @return {string}
     */
    HTMLContent(option) {
      const stringValue = this.getLabel(option);
      const matchIndex = stringValue
        .toLowerCase()
        .indexOf(this.searchText.toLowerCase());
      if (!this.searchText) return stringValue;
      if (matchIndex > -1) {
        const arrayOfChar = stringValue.split('');
        const matchedStringInCarName = stringValue.slice(
          matchIndex,
          this.searchText.length + matchIndex,
        );
        arrayOfChar.splice(
          matchIndex,
          this.searchText.length,
          `<span class="smart-search__match">${matchedStringInCarName}</span>`,
        );
        return arrayOfChar.join('');
      }
      return stringValue;
    },
    onInput(value) {
      if (value) {
        this.$emit('input', value);
      }
    },
    updateItems(searchString) {
      this.items = this.filterCarsList(searchString);
    },
    filterCarsList(searchText) {
      const {
        cars,
        isFilterMatch,
        translit,
        getLabel,
        keyMapRusToEng,
        keyMapEngToRus,
      } = this;
      return cars.filter((car) => {
        const fullCarName = getLabel(car);
        return isFilterMatch(fullCarName, searchText)
        || isFilterMatch(fullCarName, translit(searchText))
        || isFilterMatch(fullCarName, keyMapEngToRus(searchText))
        || isFilterMatch(fullCarName, keyMapRusToEng(searchText));
      });
    },
    translit(str) {
      const symbols = str.split('');
      return symbols.map(char => TranslitKeyMap[char] || char).join('');
    },
    keyMapRusToEng(str) {
      const symbols = str.split('');
      return symbols.map(char => RusToEngKeyMap[char] || char)
        .join('');
    },
    keyMapEngToRus(str) {
      const symbols = str.split('');
      return symbols.map(char => EngToRusKeyMap[char] || char)
        .join('');
    },
    isFilterMatch(currentValue, filterValue) {
      return currentValue.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1;
    },
    onSearchChange(value) {
      if (value.length >= this.maxCharsTrigger) {
        this.searchTimeOut = setTimeout(() => {
          this.updateItems(value);
          if (this.items.length) this.showList = true;
          clearTimeout(this.searchTimeOut);
        }, 500);
      } else {
        this.items = [];
      }
      this.refreshFocusIndex();
    },
    /**
     * @return {Function}
     */
    scrollContainerTo(direction) {
      const {
        itemMinHeight,
        itemsContainerMaxHeight,
        scrollbar,
        itemsContainerTopOffset,
      } = this;
      const itemsCount = this.items.length;
      const maxItemsInContainer = Math.floor(
        itemsContainerMaxHeight / itemMinHeight,
      );
      const maxScrollTop = scrollbar.scrollHeight - itemsContainerMaxHeight;
      const isScrollNotAvailable = itemsCount > maxItemsInContainer;
      if (!isScrollNotAvailable) {
        return;
      }
      if (direction === 'down') {
        this.scrollbar.scrollTop += itemMinHeight;
      }
      if (direction === 'up') {
        this.scrollbar.scrollTop -= itemMinHeight;
      }
      if (direction === 'start') {
        this.scrollbar.scrollTop = 0;
      }
      if (direction === 'end') {
        this.scrollbar.scrollTop = maxScrollTop + itemsContainerTopOffset;
      }
    },
  },
  computed: {
    scrollbar() {
      return this.$refs.scrollbar;
    },
    containerMaxHeight() {
      return (this.showList && this.items.length)
        ? `${this.itemsContainerMaxHeight}px`
        : '0px';
    },
  },
  mounted() {
    this.scrollbar.onwheel = () => {
      this.onScrollbarWheel();
    };
  },
};
</script>

<style lang="scss">
.smart-search {
  position: relative;
  width: 100%;
  z-index: 99999;
  height: 73px;
  &__input-wrapper {
    height: 73px;
    width: 100%;
    position: relative;
    z-index: 100;
  }
  &__match {
    text-decoration: underline;
    color: $black;
  }
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
  &__items-wrapper {
    position: relative;
    z-index: 55;
    margin-top: -44px;
    border: none;
    overflow: hidden;
    border-top: none;
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
    border-bottom: 1px solid transparent;
    background-color: $white;
    box-shadow: 0 10px 50px rgba(212, 188, 176, 0.5);
    transition: max-height .5s ease;
  }
  &__items {
    width: 100%;
    max-height: 400px;
    list-style: none;
    text-align: left;
    margin: 0;
    padding-top: 15px;
    padding-left: 0;
  }
  &__item {
    color: #929292;
    cursor: pointer;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 40px;
    padding-right: 50px;
    &:hover {
      background-color:#f9f9f9;
    }
    &._active {
      background-color: #f9f9f9;
    }
  }
  &__bar-content {
    margin-top: 44px;
  }
  .vb-dragger {
    right: 0;
    width: 12px;
    .vb-dragger-styler {
      backface-visibility: hidden;
      background-color: rgba(239,128,28,.1);
      border-radius: 20px;
      display: block;
      height: 100%;
      margin: 5px 5px 5px 0;
      transform: rotate3d(0,0,0,0);
      transition: height .2s ease-out, background-color .2s ease-in-out;
      &:hover {
        background-color: rgba(239,128,28,.5);
        height: calc(100% + 10px);
      }
    }
  }
}
</style>
