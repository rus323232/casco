<template>
  <div class="search-options">
    <div class="search-options__item"
         v-html="HTMLContent()"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      required: true,
    },
    searchText: {
      required: true,
    },
  },
  methods: {
    /**
     * @return {string}
     */
    HTMLContent() {
      const stringValue = `${this.item.UF_BRAND} ${this.item.UF_MODEL}`;
      const matchIndex = stringValue
        .toLowerCase()
        .indexOf(this.searchText.toLowerCase());
      if (!this.searchText) return '';
      if (matchIndex > -1) {
        const arrayOfChar = stringValue.split('');
        const matchedStringInCarName = stringValue.slice(
          matchIndex,
          this.searchText.length + matchIndex,
        );
        arrayOfChar.splice(
          matchIndex,
          this.searchText.length,
          `<span class="search-options__match">${matchedStringInCarName}</span>`,
        );
        return arrayOfChar.join('');
      }
      return stringValue;
    },
  },
};
</script>

<style lang="scss">
.search-options {
  &__item {
    span {
      text-decoration: underline;
      color: $black;
    }
  }
}
</style>
