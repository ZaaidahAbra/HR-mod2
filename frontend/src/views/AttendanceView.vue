<template>
  <div class="attendance-page">
    <div class="attendance-card">
      <h4 class="attendance-title text-center">Employee Attendance</h4>
      <table class="employee_table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Attendance Tracking</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody v-if="attendanceAndLeave.length > 0">
          <template v-for="employee in attendanceAndLeave" :key="employee.employeeId">
            <tr v-for="(record, index) in employee.attendance" :key="record.date + record.status">
              <td v-if="index === 0" :rowspan="employee.attendance.length">{{ employee.name }}</td>
              <td>{{ record.date }}</td>
              <td>
                <span :class="['status-badge', getStatusClass(record.status)]">
                  {{ record.status }}
                </span>
              </td>
            </tr>
          </template>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="3" class="no-data">No attendance data available.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['attendanceAndLeave'])
  },
  methods: {
    getStatusClass(status) {
      switch (status.toLowerCase()) {
        case 'present':
          return 'present';
        case 'absent':
          return 'absent';
        case 'leave':
          return 'leave';
        default:
          return '';
      }
    }
  }
};
</script>

<style scoped>
.attendance-page {
  background-color: #295c6d;
  min-height: 100vh;
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow-x: auto;
}

.attendance-card {
  background-color: #fbf9f5;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  padding: 30px;
  width: 100%;
  max-width: 1100px;
  overflow-x: auto;
}

.attendance-title {
  font-size: 1.8rem;
  color: #ffffff;
  background-color: #295c6d;
  padding: 16px;
  border-radius: 12px;
  width: 100%;
  max-width: 600px; 
  margin: 0 auto;
}

.employee_table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 10px;
  overflow: visible;
}

th, td {
  padding: 16px;
  text-align: left;
  border-bottom: 1px solid #ececec;
  font-size: 1rem;
  color: #333;
  vertical-align: top;
  word-break: break-word;
}

thead {
  background-color: #f6f6f6;
}

.status-badge {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: bold;
  text-transform: capitalize;
}

.present {
  background-color: #22c55e;
  color: white;
}

.absent {
  background-color: #ef4444;
  color: white;
}

.leave {
  background-color: #facc15;
  color: #333;
}

.no-data {
  text-align: center;
  font-style: italic;
  padding: 20px;
}
</style>
