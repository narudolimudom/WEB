<template>
  <div class="LeftBottomCard">
    <showimage v-show="$store.getters.GetShowInfoToggle"></showimage>
  </div>
</template>

<script>
import showimage from "./ShowImage.vue";
export default {
  name: "LeftBottomCard",
  components:{
    showimage
  },



};
</script>


<style scoped>
.LeftBottomCard {
  height: 200px;
 
}
</style>