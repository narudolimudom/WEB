const CalculateColor = function() {
    
}
const GetMax = function() {
    var dataValue = this.allHospitalData.map((item) => item.show_data[this.$store.getters.GetKeyList[this.$store.state.KeyForChart]])
    return Math.max(...dataValue)
}
