<template>
  <div class="search-options">
    <div class="search-options__item"
         v-html="HTMLContent"
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
  },
  computed: {
    /**
     * @return {string}
     */
    HTMLContent() {
      if (!this.searchText) return '';
      const stringValue = `${this.item.UF_BRAND} ${this.item.UF_MODEL}`;
      const pattern = new RegExp(`(${this.searchText.toUpperCase()})`, 'gi');
      return stringValue
        .toUpperCase()
        .replace(pattern, '<span class="search-options__match">$1</span>');
    },
  },
};
</script>

<style lang="scss">
.search-options {
  &__item {
    span {
      color: red;
    }
  }
}
</style>
