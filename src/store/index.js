
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allHospitalData: [],
    HospitalCoordinates:[],
    HospitalNames: [],
    NameHospitalSelection: null,
    IndexHospitalSelection: null,
    RegionFlyTo: [],
    KeyList: [],
    KeyForChart: 0,
    urlData: 'https://raw.githubusercontent.com/narudolimudom/Hospital/main/NEW_hospital.json',
    chartdata:{},
    options:{},
    ColorSplit:[],
    Color1: '#ff3300',
    Color2:'#33a400',
    RegionSelect: 'All',
    HospitalImage: [],
    HospitalIndex: null,
    ShowInfoToggle: false,
    ShowData: [],//////ไม่ใช้แล้ว,
    testColor:[],//
    testHospital: [],///

  },
  mutations: {
    setAllHospitalData(state, payload) {
      state.allHospitalData.push(payload)
    },
    setHospitalCoordinates(state, coords) {
      state.HospitalCoordinates.push(coords)
    },
    setHospitalNames(state,names){
      state.HospitalNames.push(names)
    },
    setNameHospitalSelection(state,name){
      state.NameHospitalSelection = name
    },
    setIndexHospitalSelection(state,id){
      state.IndexHospitalSelection = id
    },
    setRegionFlyTo(state,value){
      state.RegionFlyTo = value
    },
    setKeyList(state,KeyName){
      state.KeyList = (KeyName)
    },
    setKeyForChart(state,name){
      state.KeyForChart = name
    },
    setUrlData(state,link){
      state.urlData = link
    },
    setChartData(state,data){
      state.chartdata = data
    },
    setOptions(state,data){
      state.options = data
    },
    setColorSplit(state,data){
      state.ColorSplit = data
    },
    setColor1(state,data){
      state.Color1 = data
    },
    setColor2(state,data){
      state.Color2 = data
    },
    setRegionSelect(state,data){
      state.RegionSelect = data
    },
    setHospitalImage(state,data){
      state.HospitalImage.push(data)
    },
    setHospitalIndex(state,index){
      state.HospitalIndex = index
    },
    setShowInfoToggle(state,boo){
      state.ShowInfoToggle = boo
    },
    setShowData(state,data){
      state.ShowData.push(data)
    }




  },
  actions: {
    feedDataToallHospitalData(context, value) {
      context.commit('setAllHospitalData', value)
    },
    feedDataToHospitalCoordinates(context, value) {
      context.commit('setHospitalCoordinates', value)
    },
    feetDataToHospitalNames(context,value){
      context.commit('setHospitalNames',value)
    },
    feetDataToNameHospitalSelection(context,value){
      context.commit('setNameHospitalSelection',value)
    },
    feetDataToIndexHospitalSelection(context,value){
      context.commit('setIndexHospitalSelection',value)
    },
    feedDataToRegionFlyTo(context,value){
      context.commit('setRegionFlyTo',value)
    },
    feedDataToKeyList(context, value){
      context.commit('setKeyList',value)
    },
    feedDatatToKeyForChart(context,value){
      context.commit('setKeyForChart',value)
    },
    feedDataToURLdata(context,value){
      context.commit('setUrlData',value)
    },
    feedDataToChartData(context,value){
      context.commit('setChartData',value)
    },
    feedDataToOptions(context,value){
      context.commit('setOptions',value)
    },
    feedDataToColorSplit(context,value){
      context.commit('setColorSplit',value)
    },
    feedDataToColor1(context,value){
      context.commit('setColor1',value)
    },
    feedDataToColor2(context, value){
      context.commit('setColor2',value)
    },
    feedDataToRegionSelect(context,value){
      context.commit('setRegionSelect',value)
    },
    feedDataToHospitalImage(context,value){
      context.commit('setHospitalImage',value)
    },
    feedDataToHospitalIndex(context,value){
      context.commit('setHospitalIndex',value)
    },
    feedDataToShowInfoToggle(context,value){
      context.commit('setShowInfoToggle',value)
    },
    feedDataTosSetShowData(context,value){
      context.commit('setShowData',value)
    }




  },
  getters: {
    GetallHospitalAllData(state) {
      return state.allHospitalData
    },
    GetallHospitalCoordinates(state) {
      return state.HospitalCoordinates
    },
    GetallHospitalNames(state){
      return state.HospitalNames
    },
    GetameHospitalSelection(state){
      return state.NameHospitalSelection
    },
    GetIndexlHospitalSelection(state){
      return state.IndexHospitalSelection
    },
    GetRegionFlyTo(state){
      return state.RegionFlyTo
    },
    GetKeyList(state){
      return state.KeyList
    },
    GetKeyForChart(state){
      return state.KeyForChart
    },
    GetURLdata(state){
      return state.urlData
    },
    GetChartData(state){
      return state.chartdata
    },
    GetOptions(state){
      return state.options
    },
    GetColorSplit(state){
      return state.ColorSplit
    },
    GetColor1(state){
      return state.Color1
    },
    GetColor2(state){
      return state.Color2
    },
    GetRegionSelect(state){
      return state.RegionSelect
    },
    GetHospitalImage(state){
      return state.HospitalImage
    },
    GetHospitalIndex(state){
      return state.HospitalIndex
    },
    GetShowInfoToggle(state){
      return state.ShowInfoToggle
    },
    GetShowData(state){
      return state.ShowData
    }



    

  }
})
