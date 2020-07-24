const { Employee } = require('../models');
console.log('employees get all working', Employee)
const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll();
        console.log("success")
        return res.status(200).json({ employees });
    } catch (error) {
        console.log("failure")
        return res.status(500).send(error.message);
    }
}

const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findOne({
            where: { id: id }
        });
        if (employee) {
            return res.status(200).json({ employee });
        }
        return res.status(404).send('Employee with the specified ID does not exists');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}


const createEmployee = async (req, res) => {
    try {
        const employee = await Employee.create(req.body);
        return res.status(201).json({
            employee,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const [updatedEmployee] = await Employee.update(req.body, {
            where: { id: id }
        });
        if (updatedEmployee) {
            const updatedEmployee = await Employee.findOne({ where: { id: id } });
            return res.status(200).json({ employee: updatedEmployee });
        }
        throw new Error('Employee not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEmployee = await Employee.destroy({
            where: { id: id }
        });
        if (deletedEmployee) {
            return res.status(204).send("Employee deleted");
        }
        throw new Error("Employee not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
}