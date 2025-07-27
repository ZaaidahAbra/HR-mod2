import { createStore } from 'vuex'

export default createStore({
  namespaced:true,
  state: {
    leaveRequests:[],
  },
  getters: {},
  mutations: {
    SET_LEAVE_REQUESTS(state, requests){
      state.leaveRequests = requests;
    },
    ADD_LEAVE_REQUEST(state, newRequest) {
      state.leaveRequests.push(newRequest);
    },
    UPDATE_LEAVE_REQUEST_STATUS(state, {id, status}) {
      const req = state.leaveRequests.find(r => r.id === id);
      if (req){
        req.status = status;
      }
    },
  },

  actions: {
    async fetchLeaveRequests({ commit }) {
      const response = await fetch(`http://localhost:3000/api/leave-requests`);
      const data = await response.json();
      commit('SET_LEAVE_REQUESTS', data);
    },
    async submitLeaveRequest({ commit }, payload) {
      const response = await fetch('http://localhost:3000/api/leave-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      commit('ADD_LEAVE_REQUEST', data);
    },
    async updateLeaveRequestStatus({ commit }, { id, status }) {
      const response = await fetch(`http://localhost:3000/api/leave-requests/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      commit('UPDATE_LEAVE_REQUEST_STATUS', { id, status });
    }
  },
  modules: {}
})
