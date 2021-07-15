<template>
  <v-app>
    <v-app-bar app color="#294D65" dark class="appbar">
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/Logo_NECTEC-2020.jpg"
          transition="scale-transition"
          width="120"
          @click="Reset()"
        />
      </div>
      <v-spacer></v-spacer>
      <!-- <v-btn x-large color="#294D65" @click="menuActionClick()" >หน้าแรก</v-btn> -->
    </v-app-bar>

    <v-main class="content">
      <v-container fluid ma-0>
        <div class="main">
          <v-row wrap>
            <v-col cols="12" sm="4" class="left_card pr-0">
              <v-card height="580px" class="card_top_left" elevation="10">
                <LeftTopCard />
              </v-card>
              <v-col xs="12" sm="12" md="12" lg="12" class="pl-0 pr-0">
                <v-card height="228px" class="pa-5" elevation="10">
                  <LeftBottomCard />
                </v-card>
              </v-col>
            </v-col>
            <v-col cols="12" sm="8">
              <v-card height="821px" class="pa-2 mapPanel" elevation="10">
                <v-container fluid class="pt-0 pb-0">
                  <v-row align="center">
                    <v-col cols="7" sm="7">
                      <LeftContentMenu />
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col fluid cols="3" sm="5" class="pr-10">
                      <div class="text-center">
                        <v-row justify="center">
                          <v-spacer></v-spacer>
                          <div class="region_menu">
                            <RightContentMenu />
                          </div>
                        </v-row>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>

                <Map />
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-main>

    <v-footer color="#294D65" padless class="footer">
      <v-row justify="center" no-gutters>
        <v-col class="footer lighten-2 py-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} —
          <strong>Vuetify</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import axios from "axios";
import Map from "./components/Map.vue";
import LeftTopCard from "./components/LeftTopCard.vue";
import LeftBottomCard from "./components/LeftBottomCard.vue";
import LeftContentMenu from "./components/LeftContentMenu.vue";
import RightContentMenu from "./components/RightContentMenu.vue";

export default {
  name: "App",

  components: {
    Map,
    LeftTopCard,
    LeftBottomCard,
    LeftContentMenu,
    RightContentMenu,
  },

  data() {
    return {
      items: [
        { title: "---ไม่เลือก---", link: "/", id: 0 },
        { title: "ภาคเหนือ", link: "/northregion", id: 1 },
        { title: "ภาคตะวันออกเฉียงเหนือ", link: "/northeasternregion", id: 3 },
        { title: "ภาคกลาง", link: "/midregion", id: 2 },
        { title: "ภาคตะวันออก", link: "/eastregion", id: 5 },
        { title: "ภาคตะวันตก", link: "/westregion", id: 4 },
        { title: "ภาคใต้", link: "/southregion", id: 6 },
      ],
      data_url_for_axios:
        "https://raw.githubusercontent.com/narudolimudom/Hospital/main/Thailand_Hospital.json",
      URL_for_axios:
        "https://raw.githubusercontent.com/narudolimudom/Hospital/main/Thailand_Hospital.json",
      hospital_name: [],
      value: null,
      id_from_marker: null,
      region_value: null,
      region_id: null,
      sorted: [],
      send_hospital_ids: null,
      hospital_ids: [],
      zoom_map_value: null,
      hospital_detels: "-",
      hospital_tels: "-",
      get_hos_all_data: [],
      Storecolor:[],
    };
  },

  mounted() {
    axios
      .get(
        this.$store.getters.GetURLdata ).then((resp) => {
        for (let index = 0; index < resp.data.length; index++) {
          this.$store.dispatch("feedDataToallHospitalData", resp.data[index]);
          this.$store.dispatch(
            "feedDataToHospitalCoordinates",
            resp.data[index].coordinates
          );
          this.$store.dispatch(
            "feetDataToHospitalNames",
            resp.data[index].name
          );
          this.$store.dispatch('feedDataToHospitalImage',resp.data[index].image)
          this.$store.dispatch('feedDataTosSetShowData',resp.data[index].show_data)
        } 
         this.$store.dispatch("feedDataToKeyList",Object.keys(resp.data[0].show_data))
          this.$store.state.ColorSplit =  this.CalculateColor(resp.data.length)
         
      });

      
  },

  methods: {
     CalculateColor(steps){
        var step = 1/steps
        let stepup=0

        
        for (let index = 0; index < steps; index++) {
            stepup += step
                
          this.Storecolor.push(this.ToFullHex(this.SplintColor(stepup)))
        }           
        // console.log(this.Storecolor)
        return this.Storecolor
        
    },

    SplintColor(percent){
    var color1 = '#ff3300'
    var color2 = '#33a400'
    var firstColor = this.processHex(color1)
    var secondColor = this.processHex(color2)
    var resultRed = Math.round(Math.abs(firstColor[0] + percent * (secondColor[0] - firstColor[0])))
    var resultGreen = Math.round(Math.abs(firstColor[1] +percent * (secondColor[1] - firstColor[1])))
    var resultBlue  = Math.round(Math.abs(firstColor[2] + percent * (secondColor[2] - firstColor[2])))

       return [
      resultRed,resultGreen,resultBlue
    ]
    },
    
    RGBtoHEX(rgb){
        var hex = Number(rgb).toString(16) ;
        if (hex.length <2) {
            hex  = "0"+hex;
        } 
       return hex
    },

    ToFullHex(rgbArray){
            
        var red = this.RGBtoHEX(rgbArray[0])
        var greed = this.RGBtoHEX(rgbArray[1])
        var blue = this.RGBtoHEX(rgbArray[2])
        return "#"+red+greed+blue
        // console.log("#"+red+greed+blue);
    },


    processHex(hex){
        var color = hex.substr(1,6);
        var r =color.substr(0,2);
        var g =color.substr(2,2);
        var b =color.substr(4,2);
        return [
      parseInt(r, 16),
      parseInt(g, 16),
      parseInt(b, 16)
    ]

    },
    Reset(){
      this.$store.dispatch('feedDataToShowInfoToggle',false)
   }

  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.content {
  background-color: #d9d9d9;
  z-index: 1;
}
.test {
  background-color: #d9d9d9;
}
.appbar {
  z-index: 2;
}

.footer {
  z-index: 2;
}

.mapPanel {
  overflow: hidden;
}

.card_top_left {
  text-align: center;
}

.addb {
  border: red solid 2px;
}

.buttomleft_card {
  text-align: center;
}
</style>
