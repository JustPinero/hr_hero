import axios from "axios";

export default {
  // Gets all employees
  getEmployees: function() {
    return axios.get("/api/employees");
  },
  // Gets the employee with the given id
  getEmployee: function(id) {
    return axios.get("/api/employees/" + id);
  },
  // Deletes the employee with the given id
  deletePost: function(id) {
    return axios.delete("/api/employees/" + id);
  },
  // Adds employee to the database
  addEmployee: function(employeeData) {
    return axios.post("/api/employees", employeeData);
  }
};