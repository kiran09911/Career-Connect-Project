const express = require("express");
const router = express.Router();
const { submitApplication, getApplicationsForRecruiter, getAppliedJobsByCandidate, updateApplicationStatus, deleteApplication } = require("../controllers/applicationController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/applications", authMiddleware, submitApplication);
router.get("/applications/recruiter", authMiddleware, getApplicationsForRecruiter);
router.get("/applications/candidate", authMiddleware, getAppliedJobsByCandidate);
router.put("/applications/:id/status", authMiddleware, updateApplicationStatus);
router.delete("/:jobId", authMiddleware, deleteApplication);

module.exports = router;
