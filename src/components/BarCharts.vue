<script>
import { HorizontalBar } from "vue-chartjs";
export default {
  extends: HorizontalBar,
  props: ["data", "options ", 'label', 'chartcolor','labelchart','anotherdata','anotherlabel','anothercolor'],
  data() {
      return {
          SortedChart:[],
      }
  },
  mounted() {

    this.renderLineChart();

  },
  computed: {
    chartData: function () {
      return this.data;
    },
   charLabel: function(){
      return this.label
    },
    ChartColor: function(){
        return this.chartcolor
    },
    ChartName: function(){
      return this.labelchart
    },
    AnotherData: function(){
      return this.anotherdata
    },
    AnotherLebel: function(){
      return this.anotherlabel
    },
    AnotherColor: function(){
      return this.anothercolor
    }
    
  },
  methods: {

    
    renderLineChart: function() {
      this.SortedChart = [
          {
            
  
            label: this.ChartName,
            borderWidth: 1,
            pointBorderColor: '#2554FF',
            data: this.chartData,
            backgroundColor: this.ChartColor
 
          },

          
        ]

        for (let index = 0; index < this.AnotherData.length; index++) {
          this.SortedChart.push({
            
  
            label: this.AnotherLebel[index],
            borderWidth: 1,
            pointBorderColor: '#2554FF',
            data: this.AnotherData[index],
            backgroundColor: this.AnotherColor[index]
 
          },)
          
        }
        

    this.renderChart(
      {
        labels: this.charLabel,
        datasets: this.SortedChart
      },
        {

            scales:{
                yAxes:[{
                    ticks:{
                        beginAtZero: true
                    },
                    gridLines:{
                        display: true
                    },
                    // stacked: true
                }],
                xAxes:[{
                    ticks:{
                        maxRotation: 0,
                        minRotation: 0,
                        beginAtZero: true
                    },
                    gridLines:{
                        display: false
                    },
                    //  stacked: true
                }]
            },
            legend:{
                display: true
            },
            responsive: true,
            maintainAspectRatio: false
        }
    );      
    }
  },
    watch: {
    data: function() {
      this.$data._chart.destroy();
      //this.renderChart(this.data, this.options);
      this.renderLineChart();
    }
  }
};
</script>