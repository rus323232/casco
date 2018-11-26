<template>
  <div id="soglasie-casco-calc">
    <router-view/>
    <v-footer></v-footer>
  </div>
</template>

<script>
import VFooter from './components/common/VFooter';

export default {
  components: {
    VFooter,
  },
};

</script>

<style lang="scss" src="./styles/main.scss"></style>
