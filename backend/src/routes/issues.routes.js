const express = require("express");
const db = require("../db/database");
const auth = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");

const router = express.Router();

/**
 * Create issue
 */
router.post("/", auth, (req, res) => {
  const { title, description } = req.body;

  db.run(
    `INSERT INTO issues (title, description, created_by) VALUES (?, ?, ?)`,
    [title, description, req.user.id],
    function (err) {
      if (err) {
        return res.status(400).json({ message: "Failed to create issue" });
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});

/**
 * Get my issues
 */
router.get("/", auth, (req, res) => {
  db.all(
    `SELECT * FROM issues WHERE created_by = ?`,
    [req.user.id],
    (err, rows) => {
      res.json(rows);
    }
  );
});

/**
 * Get issue by ID
 */
router.get("/:id", auth, (req, res) => {
  const { id } = req.params;

  db.get(
    `SELECT * FROM issues WHERE id = ?`,
    [id],
    (err, issue) => {
      if (!issue) {
        return res.status(404).json({ message: "Issue not found" });
      }
      res.json(issue);
    }
  );
});

/**
 * Update issue status (admin only)
 */
router.patch("/:id/status", auth, admin, (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  db.run(
    `UPDATE issues SET status = ? WHERE id = ?`,
    [status, id],
    function (err) {
      if (this.changes === 0) {
        return res.status(404).json({ message: "Issue not found" });
      }
      res.json({ message: "Status updated" });
    }
  );
});

module.exports = router;
