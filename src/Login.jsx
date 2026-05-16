import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const login = async () => {

    const res = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })

    const data = await res.json()

    if (data.access_token) {

      localStorage.setItem("token", data.access_token)

      navigate("/dashboard")   // 🔥 redirect after login

    } else {
      alert("Login failed")
    }
  }

  return (

    <div style={{ padding: 40 }}>

      <h2>Login</h2>

      <input
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={login}>Login</button>

      <p>
        No account?
        <button onClick={() => navigate("/signup")}>Signup</button>
      </p>

    </div>
  )
}