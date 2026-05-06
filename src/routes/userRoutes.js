const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  toggleBlockUser,
} = require("../controllers/userController");

router.get("/", getAllUsers);

router.post("/", createUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

router.patch("/:id/toggle-block", toggleBlockUser);

module.exports = router;
