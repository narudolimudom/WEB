<script>
import { HorizontalBar } from "vue-chartjs";
export default {
  extends: HorizontalBar,
  props: ["data", "options", 'label', 'chartcolor','labelchart'],
//   data() {
//       return {
//           chartData: [1,2,3,4,5,6,7,8,9,10,11,12]
//       }
//   },
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
    }
    
  },
  methods: {
    renderLineChart: function() {
    this.renderChart(
      {
        labels: this.charLabel,
        datasets: [
          {
            
  
            label: this.ChartName,
            borderWidth: 1,
            pointBorderColor: '#2554FF',
            data: this.chartData,
            backgroundColor: this.ChartColor
          },
          //   {
            
  
          //   label: this.ChartName,
          //   borderWidth: 1,
          //   pointBorderColor: '#2554FF',
          //   data: [20,54,87,99,15,17,68],
          //   backgroundColor: this.ChartColor
          // }
        ]
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