<template>
  <div class="showimage">
  <v-carousel hide-delimiters height="200">
    <v-carousel-item
      v-for="(item,i) in $store.getters.GetHospitalImage[$store.getters.GetHospitalIndex]"
      :key="i"
      :src="item"
    ></v-carousel-item>
  </v-carousel>
  
  </div>
</template>

<script>
export default {
    name: 'showimage',
    data() {
        return {
      
        }
    },
    // mounted(){
    //     console.log(this.$store.getters.GetHospitalImage[0]);
    // }

}
</script>

<style scoped>

.showimage{
     height: 200px;
}

</style>