const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employeesController");

router
  .route("/")
  .get(employeesController.getEmployees)
  .post(employeesController.createNewemployee);

//.delete(employeesController.deleteEmployee);

//router.route("/id").get(employeesController.getAnyEmployee);

module.exports = router;
