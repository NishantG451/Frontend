import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {

  const navigate = useNavigate()

  const [role, setRole] = useState("")
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [assignedTo, setAssignedTo] = useState("")

  const token = localStorage.getItem("token")

  useEffect(() => {

    if (!token) return

    const decoded = jwtDecode(token)

    setRole(decoded.role)

    fetchTasks()

  }, [])


  const fetchTasks = async () => {

    const res = await fetch("https://web-production-f3e93.up.railway.app/tasks", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = await res.json()

    setTasks(data)
  }


  const createTask = async () => {

    await fetch("https://web-production-f3e93.up.railway.app/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title,
        description,
        assigned_to: assignedTo
      })
    })

    setTitle("")
    setDescription("")
    setAssignedTo("")

    fetchTasks()
  }


  const markComplete = async (task) => {

    await fetch(`https://web-production-f3e93.up.railway.app/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        title: task.title,
        description: task.description,
        status: "completed"
      })
    })

    fetchTasks()
  }


  const deleteTask = async (id) => {

    await fetch(`https://web-production-f3e93.up.railway.app/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    fetchTasks()
  }


  const logout = () => {

    localStorage.removeItem("token")

    navigate("/login")
  }


  return (

    <div style={styles.container}>

      <div style={styles.header}>
        <h2>Task Manager Dashboard</h2>

        <div>
          <span style={{marginRight:20}}>
            Role: <b>{role}</b>
          </span>

          <button style={styles.logout} onClick={logout}>
            Logout
          </button>
        </div>

      </div>


      {/* CREATE TASK */}

      {(role === "admin" || role === "manager") && (

        <div style={styles.card}>

          <h3>Create Task</h3>

          <input
            placeholder="Title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            style={styles.input}
          />

          <input
            placeholder="Description"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            style={styles.input}
          />

          <input
            placeholder="Assign To (User ID)"
            value={assignedTo}
            onChange={(e)=>setAssignedTo(e.target.value)}
            style={styles.input}
          />

          <button style={styles.primary} onClick={createTask}>
            Create Task
          </button>

        </div>

      )}


      {/* TASK LIST */}

      <div style={styles.card}>

        <h3>Tasks</h3>

        {tasks.map(task => (

          <div key={task.id} style={styles.task}>

            <div>

              <b>{task.title}</b>

              <p>{task.description}</p>

              <span style={{
                padding:"4px 8px",
                background: task.status === "completed" ? "#16a34a" : "#f59e0b",
                color:"white",
                borderRadius:6,
                fontSize:12
              }}>
                {task.status}
              </span>

            </div>


            <div style={{display:"flex", gap:10}}>

              {/* USER COMPLETE */}

              {role === "user" && task.status !== "completed" && (

                <button
                  style={styles.complete}
                  onClick={()=>markComplete(task)}
                >
                  Mark Complete
                </button>

              )}


              {/* ADMIN DELETE */}

              {role === "admin" && (

                <button
                  style={styles.delete}
                  onClick={()=>deleteTask(task.id)}
                >
                  Delete
                </button>

              )}

            </div>

          </div>

        ))}

      </div>

    </div>

  )
}


const styles = {

  container:{
    maxWidth:850,
    margin:"40px auto",
    fontFamily:"Arial"
  },

  header:{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    marginBottom:20
  },

  card:{
    border:"1px solid #ddd",
    padding:20,
    marginBottom:20,
    borderRadius:8
  },

  input:{
    width:"100%",
    padding:10,
    marginBottom:10
  },

  primary:{
    background:"#2563eb",
    color:"white",
    border:"none",
    padding:"10px 16px",
    borderRadius:6,
    cursor:"pointer"
  },

  complete:{
    background:"#16a34a",
    color:"white",
    border:"none",
    padding:"6px 12px",
    borderRadius:6,
    cursor:"pointer"
  },

  delete:{
    background:"#dc2626",
    color:"white",
    border:"none",
    padding:"6px 12px",
    borderRadius:6,
    cursor:"pointer"
  },

  logout:{
    background:"#111",
    color:"white",
    border:"none",
    padding:"8px 14px",
    borderRadius:6,
    cursor:"pointer"
  },

  task:{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    borderBottom:"1px solid #eee",
    padding:"12px 0"
  }

}