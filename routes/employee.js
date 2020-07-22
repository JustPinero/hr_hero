const router = require("express").Router();
//Employee Controllers
const {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
} = require('../controllers/employeeController')

//API Employee routes
router.post('/employees', createEmployee)
router.get('/employees', getAllEmployees)
router.get('/employees/:id', getEmployeeById)
router.put('/employees/:id', updateEmployee)
router.delete('/employees/:id', deleteEmployee)

module.exports = router;