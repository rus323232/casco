<template>
  <div class="grouped-list">
    <div class="grouped-list__error">
      {{ errorText }}
    </div>
    <div class="grouped-list__body">
      <div v-for="item of items" class="itetm">{{ item }}</div>
    </div>
  </div>
</template>

<script>
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
  },
  methods: {
    sortArrayOfObjectByAlphabet(value, fieldName = 'name') {
      return value.sort((a, b) => {
        const fieldCurrent = a[fieldName].toLowerCase();
        const fieldNext = b[fieldName].toLowerCase();

        if (fieldCurrent > fieldNext) {
          return 1;
        }
        if (fieldCurrent < fieldNext) {
          return -1;
        }
        return 0;
      });
    },
  },
  computed: {
    filteredItems() {
      return this.splitByAlphabet
        ? this.sortArrayOfObjectByAlphabet(this.items, '')
        : this.items;
    },
  },
};
</script>

<style lang="scss" scoped>
.grouped-list {
  &__error {
    display: inline-block;
    padding-top: 10px;
    padding-bottom: 10px;
    width: 100%;
    text-align: center;
    font-size: rem(14);
    color: $red;
  }
}
</style>
