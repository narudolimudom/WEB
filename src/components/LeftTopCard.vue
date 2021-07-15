<template>
<div class="box pt-6">
  <div class="LeftTopcard mr-5 ml-5">
    <h1></h1>
    <newchart v-if="Show($store.getters.GetShowInfoToggle)" />
    <showinfo v-show="$store.getters.GetShowInfoToggle"></showinfo>
    <!-- <div class="btn_showdata pt-15">
      <v-btn
        @click="SelectKeyForChart(index)"
        class="mapButton mr-1"
        v-for="(key, index) in this.$store.getters.GetKeyList"
        :key="'A' + index"
        small
        elevation="3"
        color=""
        >{{ key }}</v-btn
      >
    </div> -->
  </div>
  </div>
</template>

<script>
// import RenderChart from "./BarChart.vue"
import newchart from "./InitialDataChart.vue";
import showinfo from "./ShowInfo.vue"
export default {
  name: "LeftTopCard",
  components: {
    // RenderChart
    newchart,
    showinfo
  },
  methods:{
          SelectKeyForChart(index) {
      // this.$store.dispatch('feedDatatToKeyForChart',index)
      this.$store.state.KeyForChart = index;
    },
    Show(boolean){
      var boo = false
      if (boolean == false ) {
        boo = true
      }
      return boo
    }
  }
};
</script>

<style  scoped>
.LeftTopcard {
  height: 580px;
  overflow: hidden;
}
</style>



