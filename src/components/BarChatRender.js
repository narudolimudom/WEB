import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins


export default Bar.extend({  
  props: ['chartData','options'],
  mixins: [reactiveProp],
  watch:{
    'chartData':{
      handler(newChartData, oldChartData){
        this._chart.destroy()
        this.renderChart(this.chartData, this.options)
      },
      deep: true
    }
    
  },
  mounted(){
    this.renderChart(this.chartData,this.options)
  },

})
