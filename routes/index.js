const router = require("express").Router();
const employeeRoutes = require("./employee");

router.use('/api', employeeRoutes);

module.exports = router