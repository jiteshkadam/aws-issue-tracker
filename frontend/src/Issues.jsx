import React, { useEffect, useState } from "react";


export default function Issues({ token }) {
  const [issues, setIssues] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const loadIssues = async () => {
    const res = await fetch("http://localhost:5000/api/issues", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setIssues(data);
  };

  const createIssue = async () => {
    await fetch("http://localhost:5000/api/issues", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description }),
    });

    setTitle("");
    setDescription("");
    loadIssues();
  };

  useEffect(() => {
    loadIssues();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Issues</h2>

      <input
        style={styles.input}
        placeholder="Issue title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        style={styles.textarea}
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button style={styles.button} onClick={createIssue}>
        Create Issue
      </button>

      <div style={{ marginTop: 40 }}>
        {issues.map((issue) => (
          <div key={issue.id} style={styles.issue}>
            <strong>{issue.title}</strong>
            <p>{issue.description}</p>
            <small>Status: {issue.status}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 600,
    margin: "60px auto",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  heading: {
    fontWeight: 500,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 10,
  },
  textarea: {
    width: "100%",
    padding: 12,
    minHeight: 80,
    marginBottom: 10,
  },
  button: {
    padding: 12,
    background: "black",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  issue: {
    borderBottom: "1px solid #eee",
    padding: "12px 0",
  },
};
