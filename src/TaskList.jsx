import { useEffect, useState } from "react"

export default function TaskList({ token }) {

  const [tasks, setTasks] = useState([])

  const loadTasks = async () => {

    const res = await fetch("http://127.0.0.1:8000/tasks", {
      headers: {
        Authorization: "Bearer " + token
      }
    })

    const data = await res.json()

    setTasks(data)
  }

  const deleteTask = async (id) => {

    await fetch(`http://127.0.0.1:8000/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token
      }
    })

    loadTasks()
  }

  useEffect(() => {
    loadTasks()
  }, [])

  return (

    <div>

      <h3>Tasks</h3>

      {tasks.map(t => (

        <div key={t.id} style={{
          border: "1px solid black",
          padding: 10,
          marginBottom: 10
        }}>

          <h4>{t.title}</h4>
          <p>{t.description}</p>
          <p>Status: {t.status}</p>

          <button onClick={() => deleteTask(t.id)}>
            Delete
          </button>

        </div>

      ))}

    </div>

  )
}