import { useState } from "react"

export default function CreateTask({ token }) {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [assigned_to, setAssigned] = useState("")

  const create = async () => {

    const res = await fetch("http://127.0.0.1:8000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        title,
        description,
        assigned_to: Number(assigned_to)
      })
    })

    if (res.ok)
      alert("Task created")
    else
      alert("Not allowed")
  }

  return (
    <div>

      <h3>Create Task</h3>

      <input placeholder="title"
        onChange={(e) => setTitle(e.target.value)} />

      <br /><br />

      <input placeholder="description"
        onChange={(e) => setDescription(e.target.value)} />

      <br /><br />

      <input placeholder="assign user id"
        onChange={(e) => setAssigned(e.target.value)} />

      <br /><br />

      <button onClick={create}>Create</button>

    </div>
  )
}