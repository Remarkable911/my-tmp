export default {
  state: {
    driverId: "",
  },
  mutations: {
    setDriverId(state, value) {
      state.driverId = value;
    },
    clearState(state) {
      state.driverId = ""; // 清空 driverId
    },
  },
  actions: {},
};
