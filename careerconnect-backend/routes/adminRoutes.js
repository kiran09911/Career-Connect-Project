const express = require("express");
const router = express.Router();
const {
  isAdmin,
  getUsers,
  updateUser,
  deleteUser,
  getJobs,
  deleteJob,
  getConversationMessages,
  getApplications,
  updateApplication,
  getAnalytics,
  updateSettings
} = require("../controllers/adminController");

// Admin routes
router.get("/users", isAdmin, getUsers);
router.put("/users/:id", isAdmin, updateUser);
router.delete("/users/:id", isAdmin, deleteUser);
router.get("/conversations/:conversationId/ messages", isAdmin, getConversationMessages);


router.get("/jobs", isAdmin, getJobs);
router.delete("/jobs/:id", isAdmin, deleteJob);
router.get("/applications", isAdmin, getApplications);
router.put("/applications/:id", isAdmin, updateApplication);
router.get("/analytics", isAdmin, getAnalytics);
router.put("/settings", isAdmin, updateSettings);

module.exports = router;
