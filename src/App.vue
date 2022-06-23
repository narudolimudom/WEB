<template>
  <v-app>
    <v-app-bar app color="#294D65" dark class="appbar">
      <div class="d-flex align-center">
        <v-img 
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/mislogo.png"
          transition="scale-transition"
          width="120"
          @click="Reset()"
        />
        <h1>sdff</h1>
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main class="content">
      <v-container fluid ma-0>
        <div class="main">
          <v-row wrap>
            <v-col cols="12" sm="4" class="left_card pr-0">
              <v-card height="580px" class="card_top_left " elevation="10">
                <LeftTopCard />
              </v-card>
              <v-col xs="12" sm="12" md="12" lg="12" class="pl-0 pr-0">
                <v-card height="228px" class="pa-5 " elevation="10" >
                  <LeftBottomCard />
                </v-card>
              </v-col>
            </v-col>
            <v-col cols="12" sm="8">
              <v-card height="821px" class="pa-2 mapPanel " elevation="10">
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
          <strong>MIS</strong>
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
      hospital_name: [],
      value: null,
      id_from_marker: null,
      region_value: null,
      region_id: null,
      sorted: [],
      send_hospital_ids: null,
      hospital_ids: [],
      zoom_map_value: null,
      
    };
  },

  mounted() {
    
    axios
      .get(
        this.$store.getters.GetURLdata ).then((resp) => {
        for (let index = 0; index < resp.data.info.length; index++) {
          this.$store.dispatch("feedDataToallHospitalData", resp.data.info[index]);
        
        
        
        
        this.$store.dispatch(
            "feedDataToHospitalCoordinates",
            resp.data.info[index].coordinates
          );
          this.$store.dispatch(
            "feetDataToHospitalNames",
            resp.data.info[index].name
          );
          this.$store.dispatch('feedDataToHospitalImage',resp.data.info[index].image)
        } 
         this.$store.dispatch("feedDataToKeyList",Object.keys(resp.data.info[0].show_data))

      });


  },

  methods: {
  
    Reset(){
        var coord= [14.291228795166935, 101.25946999245441];
        var  zoom = 6;
      this.$store.dispatch('feedDataToShowInfoToggle',false)
      this.$store.dispatch('feedDataToRegionFlyTo',{coord,zoom})
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
