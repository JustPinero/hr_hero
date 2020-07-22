const router = require("express").Router();
const employeeRoutes = require("./employee");

router.use('/employee', employeeRoutes)
router.get('/', (req, res) => res.send('This is root!'))

module.exports = router