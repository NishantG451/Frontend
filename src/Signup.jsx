import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Signup() {

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("user")

  const signup = async () => {

    const res = await fetch("https://web-production-f3e93.up.railway.app/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, role })
    })

    if (res.ok) {
      alert("Account created")
      navigate("/login")
    }
  }

  return (

    <div style={{ padding: 40 }}>

      <h2>Signup</h2>

      <input placeholder="username"
        onChange={(e) => setUsername(e.target.value)} />

      <br /><br />

      <input placeholder="email"
        onChange={(e) => setEmail(e.target.value)} />

      <br /><br />

      <input type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)} />

      <br /><br />

      <select onChange={(e) => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="manager">Manager</option>
        <option value="admin">Admin</option>
      </select>

      <br /><br />

      <button onClick={signup}>Signup</button>

    </div>
  )
}