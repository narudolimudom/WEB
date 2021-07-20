<template>
  <div class="Map">
    <div class="inside" style="height: 900px; width: 100%">
      <l-map
        ref="map"
        :zoom="zoom"
        :center="center"
        :options="mapOptions"
        :minZoom= '5'
        style="height: 80%"
        @update:center="centerUpdate"
        @update:zoom="zoomUpdate"
      >
        <l-tile-layer :url="url" :attribution="attribution" />
        <l-control class="custom-control" :position="'bottomleft'">
           <v-btn-toggle 
          v-model="toggle_exclusive"
          color ='black'
          multiple
          
        >
          <v-btn
         
            class="mapButton "
            v-for="(key, index) in this.$store.getters.GetKeyList"
            :key="'A' + index"
            small
            elevation="15"
            color=""
            >{{ key }}</v-btn
          >
          </v-btn-toggle>
        </l-control>
          <l-control position="bottomright"
        ><v-card style="padding: 1rem" color="#CFD8DC">
          <h4 style="padding-bottom: 1em; text-align: center">{{$store.getters.GetKeyList[$store.getters.GetKeyForChart]}}</h4>
          <i style="background: #f6f7d4">&emsp;</i
          ><span style="margin-left: 1em">{{GetMin()}}-{{Math.round((1 / 5) * (GetMax() - GetMin()) + GetMin())}}</span><br />
          <i style="background: #d2f6c5">&emsp;</i
          ><span style="margin-left: 1em">{{Math.round((1 / 5) * (GetMax() - GetMin()) + GetMin())+1}}-{{Math.round((2 / 5) * (GetMax() - GetMin()) + GetMin())}}</span><br />
          <i style="background: #99f3bd">&emsp;</i
          ><span style="margin-left: 1em">{{Math.round((2 / 5) * (GetMax() - GetMin()) + GetMin())+1}}-{{Math.round((3 / 5) * (GetMax() - GetMin()) + GetMin())}}</span><br />
          <i style="background: #28df99">&emsp;</i
          ><span style="margin-left: 1em">{{Math.round((3 / 5) * (GetMax() - GetMin()) + GetMin())+1}}-{{Math.round((4 / 5) * (GetMax() - GetMin()) + GetMin())}}</span><br />
          <i style="background: #2ec1ac">&emsp;</i
          ><span style="margin-left: 1em">{{Math.round((4 / 5) * (GetMax() - GetMin()) + GetMin())+1}}-{{Math.round(GetMax())}}</span></v-card
        ></l-control>
        <l-marker
         :visible="ShowCondition(index)"
          @click="
            MoveToMakerByIndex(index);
            SendHospitalNameForControlSelect(index);
            SendHospitalIndexForComtrolSelect(index);
            SetToggle();
          "
          v-for="(allhospitaldata, index) in allHospitalData"
          :key="index"
          :lat-lng="allhospitaldata.coordinates"
          :icon="getIcon(allhospitaldata.show_data[$store.getters.GetKeyList[$store.state.KeyForChart]])"
        >
          <!-- <l-tooltip >{{ allhospitaldata.name +" จำนวนการ Scan" +allhospitaldata.show_data.Patient }}</l-tooltip> -->
          <l-tooltip ><pre>{{allhospitaldata.name +" "+ testme(allhospitaldata)}}</pre></l-tooltip>
        </l-marker>
        <l-control></l-control>
        <l-polygon
          v-for="(region, i) in Polygons"
          :key="i + 'a'"
          :visible="ShowRegion(i)"
          :lat-lngs="region.latlngs"
          :options="style_polygon"
        ></l-polygon>
      </l-map>
    </div>
  </div>
</template>

<script>
import Polygons from '../assets/Regions_Thailand_poly.json'
import { LMap, LTileLayer, LMarker, LTooltip, LControl } from "vue2-leaflet";
import { Icon, latLng } from "leaflet";
import L from "leaflet";

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default {
  name: "Map",
  components: {
    LControl,
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
  },

  data() {
    return {
      zoom: 5,
      currentZoom: 11.5,
      center: latLng(12.5788, 101.4463),
      currentCenter: latLng(47.41322, -1.219482),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      mapOptions: {
        zoomSnap: 0.5,
      },
      region_polygon: [],
      HospitalCoordinates: [],
      allHospitalData: [],
      HospitalIdSelectMarker: null,
        toggle_exclusive: [],
        HospitalByRegion: [],
        Polygons,
        style_polygon:{
      weight: 0.5,
      opacity: 0.02,
      fillColor: "#FFD700",
    }
        
    };
  },

  mounted() {
    this.HospitalCoordinates = this.$store.getters.GetallHospitalCoordinates;
    this.allHospitalData = this.$store.getters.GetallHospitalAllData;
    this.HospitalByRegion = this.$store.getters.GetallHospitalAllData;
    this.Hospitalselect(this.$store.getters.GetRegionSelect);
  },

  computed: {
    WatchValuefromIndexHopsitalSelectionFromStore() {
      return this.$store.getters.GetIndexlHospitalSelection;
    },
    WatchValuefromFlyTo() {
      return this.$store.getters.GetRegionFlyTo;
    },
      WatchRegionSelect(){
      return this.$store.getters.GetRegionSelect
    }
  },

  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    MoveToMakerByIndex(index) {
      this.$refs.map.mapObject.flyTo(
        this.allHospitalData[index].coordinates,
      8
      );
    },
    SendHospitalNameForControlSelect(index) {
      this.$store.dispatch(
        "feetDataToNameHospitalSelection",
        this.allHospitalData[index].name
      );
    },
    SendHospitalIndexForComtrolSelect(index){
      this.$store.dispatch('feedDataToHospitalIndex',index)
    },
    // SelectKeyForChart(index) {
    //   // this.$store.dispatch('feedDatatToKeyForChart',index)
    //   this.$store.state.KeyForChart = index;
    // },
    testme(alldata){
      var x ='';
      if ( this.toggle_exclusive.length == 0) {
        x = ""
      }
      for (let index = 0; index < this.toggle_exclusive.length; index++) {
        x += "\n"+this.$store.getters.GetKeyList[this.toggle_exclusive[index]]+" : " +alldata.show_data[this.$store.getters.GetKeyList[this.toggle_exclusive[index]]]
        
      }
      return x
    },
    
    getIcon(showdata) {
      // console.log(showdata);
      return L.divIcon({
        className: "my-custom-pin",
        html: `<svg width="32px" height="32px" viewBox="-5 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <path id="Path_19" data-name="Path 19" d="M1002,44a10,10,0,0,0-10,10c0,5.523,10,20,10,20s10-14.477,10-20A10,10,0,0,0,1002,44Zm0,13a3,3,0,1,1,3-3A3,3,0,0,1,1002,57Z" transform="translate(-991 -43)" fill="${this.colors(showdata)}" stroke="#333" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
</svg>
`,
      });
    },
    colors(showdata){
      // console.log(this.allHospitalData.map((item) => item.show_data[this.$store.getters.GetKeyList[this.$store.state.KeyForChart]]));
        var max =   this.GetMax()
        var min = this.GetMin()
        // var i = this.allHospitalData.length
         for (let index = 0; index < this.HospitalByRegion.length; index++) {
          switch (true) {
            case showdata >= (4/5.0)*(max-min)+min  && showdata <= max: return '#2ec1ac';
            case showdata >= (3/5.0)*(max-min)+min  && showdata <= (4/5.0)*(max-min)+min: return '#28df99';
            case showdata >= (2/5.0)*(max-min)+min  && showdata <= (3/5.0)*(max-min)+min: return '#99f3bd';
            case showdata >= (1/5.0)*(max-min)+min  && showdata <= (2/5.0)*(max-min)+min: return '#d2f6c5';
            case showdata >=  min  && showdata <= (1/5.0)*(max-min)+min: return '#f6f7d4';
           
          }
      //  switch (true) {
      //   case showdata >= (3/4.0)*(max-min)+min: return '#33a400'
      //   case showdata >=(2/4.0)*(max-min)+min && showdata < (3/4.0)*(max-min)+min: return '#667b00'
      //   case showdata >= (1/4.0)*(max-min)+min && showdata < (2/4.0)*(max-min)+min: return '#995200'
      //   case showdata >= min && showdata < (1/4.0)*(max-min)+min: return '#cc2900'
      
      }
      
     
    
     
     
     
     
     
    },

    GetMax(){
      var dataValue = this.HospitalByRegion.map((item) => item.show_data[this.$store.getters.GetKeyList[this.$store.state.KeyForChart]])
      return Math.max(...dataValue)
      
    },
     GetMin(){
      var dataValue = this.HospitalByRegion.map((item) => item.show_data[this.$store.getters.GetKeyList[this.$store.state.KeyForChart]])
      return Math.min(...dataValue)
      
    },
    SetToggle(){
      this.$store.dispatch('feedDataToShowInfoToggle',true)
    },

    ShowCondition(id){
      if ((this.$store.getters.GetRegionSelect ==  this.allHospitalData[id].region) || (this.$store.getters.GetRegionSelect == 'All')) {
        return true
      }else {
        return false
      }
    },
    Hospitalselect(region){
         if (region == 'All') {
         this.HospitalByRegion = this.allHospitalData
       }else{
        this.HospitalByRegion = this.allHospitalData.filter(hospital => hospital.region == region)
       }
    },
    ShowRegion(i){
      if ((this.Polygons[i].Region == this.$store.getters.GetRegionSelect) ||  this.$store.getters.GetRegionSelect == "All") {
        return true
      }else{
        return false
      }
    }

  },

  watch: {
    WatchValuefromIndexHopsitalSelectionFromStore(IDselector) {
      this.$refs.map.mapObject.flyTo(
        this.allHospitalData[IDselector].coordinates,
        12
      );
    },

    WatchValuefromFlyTo(object) {
      this.$refs.map.mapObject.flyTo(object.coord, object.zoom);
    },
        WatchRegionSelect(region){
    this.Hospitalselect(region);
    }
  },
};
</script>

<style  scoped>
.custom-control {
  padding: 0 0.5em;

  border-radius: 0.1em;
}

</style>>

