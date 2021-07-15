
<script>
import { Bar } from 'vue-chartjs'
 import axios from 'axios'
export default {
extends: Bar,
name: 'BarChart',
data() {
    return {
        WatchKeyForChart: null,
        SortedData: [],
        SortedIndex: [],
        ListData: [],
        loaded: false,
        KeyList:[],
        labelName: [],
        chartdata:{
            labels:[],
            datasets: [{
                label: null,
                borderWidth: 1,
                backgroundColor:[
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
                ],
                borderColor:[
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
                ],
                pointBorderColor: '#2554FF',
                data: [],

            }]
        },
        options:{
            indexAxis: 'y',
            scales:{
                yAxes:[{
                    ticks:{
                        beginAtZero: true
                    },
                    gridLines:{
                        display: true
                    }
                }],
                xAxes:[{
                    ticks:{
                        maxRotation: 90,
                        minRotation: 90,
                    },
                    gridLines:{
                        display: false
                    }
                }]
            },
            legend:{
                display: true
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
},


async mounted() {
    this.$store.dispatch('feedDatatToKeyForChart',3)
    this.loaded = false
try{

    
    const resp = await axios.get(this.$store.getters.GetURLdata);
    this.KeyList.push(Object.keys(resp.data[0]))
    this.labelName.push(Object.keys(resp.data[0])) 
    

    this.chartdata.datasets[0].label = this.labelName[0][this.$store.getters.GetKeyForChart];
    
  
        
      
        const Alldata= resp.data
        const sorted_names  = Alldata.sort((a,b) => b[this.KeyList[0][this.$store.getters.GetKeyForChart]] - a[this.KeyList[0][this.$store.getters.GetKeyForChart]]).map(item => item.name)
        const sorted_value =  Alldata.sort((a,b) => b[this.KeyList[0][this.$store.getters.GetKeyForChart]] - a[this.KeyList[0][this.$store.getters.GetKeyForChart]]).map(item => item[this.KeyList[0][this.$store.getters.GetKeyForChart]])
        console.log(sorted_names);
        console.log(sorted_value);
       
        this.chartdata.labels = sorted_names
        this.chartdata.datasets[0].data = sorted_value

        
  // for (let index = 0; index < resp.data.length; index++) {
    //     this.SortedIndex.push(resp.data[index][this.KeyList[0][this.$store.getters.GetKeyForChart]])
    //      this.ListData.push(resp.data[index][this.KeyList[0][this.$store.getters.GetKeyForChart]])
        
    // } 

    
       
        // this.SortedIndex.sort(function (a,b){
        //     return b-a;
        // })

        // for (let index = 0; index < resp.data.length; index++) {
        //     this.SortedData.push(this.ListData.indexOf(this.SortedIndex[index]))
            
        // }

       


    // for (let index = 0; index < resp.data.length; index++) {
    //    this.chartdata.labels.push(resp.data[this.SortedData[index]][this.KeyList[0][1]])
    //    this.chartdata.datasets[0].data.push(resp.data[this.SortedData[index]][this.KeyList[0][this.$store.getters.GetKeyForChart]])
        
    // }
    this.$store.dispatch('feedDataToChartData',this.chartdata)
    this.$store.dispatch('feedDataToOptions',this.options)
    
    
    this.loaded = true
}catch(e){
    console.error(e);
}

this.renderChart(this.$store.getters.GetChartData, this.$store.getters.GetOptions)
},

computed: {
    WatchValueKeyForChart(){
      return this.$store.getters.GetKeyForChart
    },
},
watch: {
    WatchValueKeyForChart(selector){
   console.log(selector);
    }
},

}
</script>
