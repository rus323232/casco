export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    activeSlide: {
      type: Number,
      default: 0,
    },
  },
};
