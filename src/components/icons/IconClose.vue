<template>
  <svg xmlns="http://www.w3.org/2000/svg"
       xmlns:xlink="http://www.w3.org/1999/xlink"
       :width="width"
       :height="height"
       viewBox="0 0 15 15"
  >
    <defs>
      <path
        id="paiwa"
        d="M1148.517
         551.5l6.272-6.272a.72.72
          0 1 0-1.017-1.017l-6.272
           6.272-6.272-6.271a.72.72
            0 1 0-1.017 1.017l6.272
             6.272-6.271 6.27a.72.72
              0 0 0 1.016 1.018l6.272-6.272
               6.272 6.272a.72.72 0 1 0 1.016-1.017z"
      />
    </defs>
    <g>
      <g transform="translate(-1140 -544)">
        <use :fill="color" xlink:href="#paiwa"/>
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 15,
    },
    height: {
      type: Number,
      default: 15,
    },
    color: {
      type: String,
      default: '#cfcfcf',
    },
  },
};
</script>

<style lang="scss">
.icon {
  width: 15px;
  height: 15px;
}
</style>
