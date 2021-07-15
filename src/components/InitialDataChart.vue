<template>
  <div class="small">
    <h1>ระดับประเทศ</h1>
    <LineChart
      :labelchart="labelchart"
      :label="dataLabel"
      :data="dataChart"
      :options="{responsive: true, maintainAspectRatio: false}"
      :chartcolor='chartcolor'

    ></LineChart>
    <div class="btn pt-10">
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
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LineChart from "./BarCharts.vue";
export default {
  components: {
    LineChart,
  },

  computed:{
    KeyForChart(){
      return  this.$store.getters.GetKeyForChart
    }
  },
  watch: {
     KeyForChart(){
       this.changeData()
     }
  },

  data() {
    return {
      allData: [],
      labelchart: null,
      change: null,
      dataChart: [],
      sortData: null,
      dataLabel: [],
      chartcolor: null,
    };
  },
  methods: {
    changeData(){
       var KeyList = [];
       var ColorArr =[];
      KeyList.push(Object.keys(this.allData[0].show_data));
      this.labelchart = KeyList[0][this.$store.getters.GetKeyForChart];
      this.sortData = this.allData
        .sort(
          (a, b) =>
            b.show_data[this.labelchart] -
            a.show_data[this.labelchart]
        )
        // .slice(0, 10)
      
      this.dataLabel = this.sortData.map(item => item.name);
      this.dataChart = this.sortData.map(item => item.show_data[this.labelchart])
      for (let index = 0; index < this.allData.length; index++) {
        ColorArr.push(this.colors(this.dataChart[index]))
      }
      this.chartcolor = ColorArr
      
  },
  
        GetMax(){
      var dataValue = this.allData.map((item) => item.show_data[this.$store.state.KeyList[this.$store.state.KeyForChart]])
     return Math.max(...dataValue)
      
    },
     GetMin(){
      var dataValue = this.allData.map((item) => item.show_data[this.$store.state.KeyList[this.$store.state.KeyForChart]])
      return Math.min(...dataValue)
      
    },

   colors(showdata){
      // console.log(this.allHospitalData.map((item) => item.show_data[this.$store.getters.GetKeyList[this.$store.state.KeyForChart]]));
        var max =   this.GetMax()
        var min = this.GetMin()
        // var i = this.allHospitalData.length
     for  (let index = this.allData.length-1; index >= 0; index--) {
          switch  (true){
          case showdata >= (index/this.allData.length)*(max-min)+min && showdata <= ((index+1)/this.allData.length)*(max-min)+min: 
          return  this.$store.state.ColorSplit[index]; 
        }

      }

    },
    SelectKeyForChart(index) {
      // this.$store.dispatch('feedDatatToKeyForChart',index)
      this.$store.state.KeyForChart = index;
    },





  },
  mounted() {
    // var color = this.$store.getters.GetColorSplit
    this.$store.dispatch("feedDatatToKeyForChart", 0);  //inital show data
    
    axios.get(this.$store.getters.GetURLdata).then((resp) => {
      this.allData = resp.data;
      this.$store.dispatch("feedDataToKeyList",Object.keys(resp.data[0].show_data))
      
      // this.chartcolor = colors()
    this.changeData();
    });

    
  },
    
};
</script>
