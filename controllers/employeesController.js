const data = {
  employees: require("../model/employees.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
};

const getEmployees = (req, res) => {
  res.json(data.employees);
};

const createNewemployee = (req, res) => {
  // create a new employee variable
  //increment the id by one depending on the last one
  //check if the data provided has all parameters before sending the post request
  // set the data to the setemplyees object
  const newEmployee = {
    id: data.employees[data.employees.length - 1].id + 1 || 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };
  if (!newEmployee.firstName || !newEmployee.lastName) {
    return res
      .status(400)
      .json({ message: "requires a fistname and lastname" });
  }
  data.setEmployees([...data.employees, newEmployee]);
  res.status(201).json(data.employees);
};

// const deleteEmployee = (req, res) => {
//   res.json({ id: req.body.id });
// };

const getAnyEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.params.id)
  );
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee ID ${req.params.id} not found` });
  }
  res.json(employee);
};

module.exports = {
  getEmployees,
  createNewemployee,
  //deleteEmployee,
  getAnyEmployee,
};
