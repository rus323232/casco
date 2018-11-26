<template>
  <div id="soglasie-casco-calc">
    <v-header></v-header>
    <router-view/>
    <v-footer></v-footer>
  </div>
</template>

<script>
import VFooter from './components/common/VFooter.vue';
import VHeader from './components/common/VHeader.vue';

export default {
  components: {
    VFooter,
    VHeader,
  },
};

</script>

<style lang="scss" src="./styles/main.scss"></style>
