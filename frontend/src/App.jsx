import React, { useState } from "react";
import Login from "./Login";
import Issues from "./Issues";

function App() {
  const [token, setToken] = useState(null);

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return <Issues token={token} />;
}

export default App;
