const router = require("express").Router();
const employeeRoutes = require("./employee");

router.use('/api', employeeRoutes);
router.get('/', (req, res) => res.send('I AM ROOT'));

module.exports = router