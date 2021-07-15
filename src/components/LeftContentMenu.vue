<template>

    <v-autocomplete
      v-model="$store.state.NameHospitalSelection"
      :items="ShowHospitalName()"
      dense
      filled
      label="ค้นหาโรงพยาบาล"
      class="pt-0 pb-0"
      @change="SearchNameSelectMarker($store.state.NameHospitalSelection);SendHospitalIndexForComtrolSelect($store.state.NameHospitalSelection)"
    ></v-autocomplete>

</template>

<script>
export default {
  name: "LeftContentMenu",

  data() {
    return {
      allHospitalNames:[],
      value: null,
    };
  },

    mounted(){
   this.allHospitalNames= this.$store.getters.GetallHospitalNames
  },



  methods:{
    SearchNameSelectMarker(name){
      this.$store.dispatch('feetDataToIndexHospitalSelection',this.allHospitalNames.indexOf(name)) //index start from 0
    },

    ShowHospitalName(){
      var name =[]
      // console.log(this.allHospitalNames.indexOf(name));
      // console.log(name);
      // if (this.$stote.getters.Gettest ) {
      //   console.log('ok');
      // } this.allHospitalNames.indexOf(name)
      for (let index = 0; index < this.$store.getters.GetallHospitalAllData.length; index++) {
     
         if (this.$store.getters.GetRegionSelect == this.$store.getters.GetallHospitalAllData[index].region) {
           name.push(this.$store.getters.GetallHospitalAllData[index].name)
          }else if( 'All' == this.$store.getters.GetRegionSelect ){
              name = this.allHospitalNames
      }
      }
     
      return name
    },
     SendHospitalIndexForComtrolSelect(name){

     this.$store.dispatch('feedDataToHospitalIndex',this.allHospitalNames.indexOf(name))
    },
  }

};
</script>

<style>

</style>