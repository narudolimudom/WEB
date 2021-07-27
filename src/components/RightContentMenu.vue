<template>
  <v-menu bottom origin="center center" transition="scale-transition">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="#4B86AA" dark v-bind="attrs" v-on="on">{{ClickName}}</v-btn>
    </template>

    <v-list>
      <v-list-item v-for="(item, i) in items" :key="i" link router @click="RegionSelector(item.coord, item.zoom, item.region, item.title); selectName(item.title)">
        <v-list-item-title>{{item.title}}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "RightContentMenu",

  data() {
    return {
      ClickName: "ประเทศ",
      items: [
        { title: "ประเทศ", id: 0, region: "All", coord:[14.291228795166935, 101.25946999245441], zoom:6},
        { title: "ภาคเหนือ", id: 1, region: "North" , coord:[18.065789795735572, 99.38174050839791], zoom:7.3 },
        { title: "ภาคตะวันออกเฉียงเหนือ", id: 3, region: "Northeastern", coord:[16.369260732811526, 103.47163504654239], zoom:7.3},
        { title: "ภาคกลาง", id: 2, region: "Central", coord:[15.640242400334444, 100.21879460394888], zoom:7.7 },
        { title: "ภาคตะวันออก", id: 5 ,region: "East", coord:[13.383864623591109, 101.61978410883461], zoom:8 },
        { title: "ภาคตะวันตก", id: 4 ,region: "West", coord:[15.264224754051988, 99.1858989488873], zoom:7.3 },
        { title: "ภาคใต้", id: 6 ,region: "South", coord:[8.436610993512057, 100.24158924159565], zoom:7 },
      ],
    };
  },


  methods:{
    RegionSelector(coord,zoom,region,title){
        this.$store.dispatch('feedDataToRegionFlyTo',{coord,zoom})
        this.$store.dispatch('feedDataToRegionSelect',region)
        this.$store.dispatch('feedDataTosetNameOFzone',title)
        
    },
    selectName(name){
      this.ClickName = name
    }
  }
};
</script>

<style>
</style>