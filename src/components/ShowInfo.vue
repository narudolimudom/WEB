<template>
  <div class="showinfo">
    <h3>{{ $store.state.NameHospitalSelection }}</h3>
    <!-- <h3>{{($store.getters.GetallHospitalAllData[$store.getters.GetHospitalIndex].show_data)}}</h3> -->
    <div class="table">
      <v-simple-table fixed-header height="300px">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">ข้อมูล</th>
              <th class="text-left">จำนวน</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in $store.getters.GetKeyList" :key="index">
              <td>{{ item }}</td>
              <td>
                {{
                  $store.getters.GetallHospitalAllData[
                    $store.getters.GetHospitalIndex
                  ].show_data[item]
                }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
    <div class="moredetails mt-8">
      <h3>ที่อยู่</h3>
      <p>
        {{
          $store.getters.GetallHospitalAllData[$store.getters.GetHospitalIndex]
            .address
        }}
      </p>
      <p>
        {{
          "โทร : " +
          $store.getters.GetallHospitalAllData[$store.getters.GetHospitalIndex]
            .tel
        }}
      </p>
      <br />
      <v-btn @click="Reset()" small elevation="5" dark color="#4B86AA"
        >ย้อนกลับ</v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "showinfo",

  methods: {
    Reset() {
      var coord = [14.291228795166935, 101.25946999245441];
      var zoom = 6;
      this.$store.dispatch("feedDataToShowInfoToggle", false);
      this.$store.dispatch("feedDataToRegionFlyTo", { coord, zoom });
  
    },
  },
};
</script>

<style>
.addb {
  border: 5px solid red;
}
</style>