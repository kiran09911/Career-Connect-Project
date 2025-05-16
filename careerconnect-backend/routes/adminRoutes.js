const express = require("express");
const router = express.Router();
const {
  isAdmin,
  getUsers,
  updateUser,
  deleteUser,
  getJobs,
  deleteJob,
  getApplications,
  updateApplication,
  getAnalytics,
  submitFeedback,
   getFeedback
  
} = require("../controllers/adminController");

// Admin routes
router.get("/users", isAdmin, getUsers);
router.put("/users/:id", isAdmin, updateUser);
router.delete("/users/:id", isAdmin, deleteUser);



router.get("/jobs", isAdmin, getJobs);
router.delete("/jobs/:id", isAdmin, deleteJob);
router.get("/applications", isAdmin, getApplications);
router.put("/applications/:id", isAdmin, updateApplication);
router.get("/analytics", isAdmin, getAnalytics);
router.post("/feedback", submitFeedback);
router.get("/feedback",  getFeedback);


module.exports = router;
