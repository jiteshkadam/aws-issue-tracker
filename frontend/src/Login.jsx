import React, { useState } from "react";

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const submit = async () => {
    const endpoint = isRegister
      ? "http://localhost:5000/api/auth/register"
      : "http://localhost:5000/api/auth/login";

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.token) {
      setToken(data.token);
    } else if (isRegister && data.email) {
      alert("Account created. Please sign in.");
      setIsRegister(false);
    } else {
      alert(data.message || "Something went wrong");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Issue Tracker</h1>

      <input
        style={styles.input}
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        style={styles.input}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button style={styles.button} onClick={submit}>
        {isRegister ? "Create Account" : "Sign In"}
      </button>

      <p style={styles.link} onClick={() => setIsRegister(!isRegister)}>
        {isRegister
          ? "Already have an account? Sign in"
          : "New user? Create an account"}
      </p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 360,
    margin: "100px auto",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  title: {
    fontWeight: 600,
    fontSize: 28,
    marginBottom: 20,
  },
  input: {
    padding: 12,
    fontSize: 16,
  },
  button: {
    padding: 12,
    background: "black",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  link: {
    marginTop: 10,
    color: "#555",
    cursor: "pointer",
    fontSize: 14,
    textAlign: "center",
  },
};
