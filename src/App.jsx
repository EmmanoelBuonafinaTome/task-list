import { useEffect, useState} from 'react';
import AddTask from './components/AddTask';
import Tasks from './components/Tasks';
import Title from "./components/Title";

function App() {

  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem('tasks')) || []
  );

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  // useEffect(() => {
  //   async function fetchTasks () {
  //     const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10', {
  //       method: 'GET'
  //     })
  //     const data = await response.json()
  //     setTasks(data)
  //   }
  //   fetchTasks ()
  // }, [])

  function onTaskClick(taskId) {
    const newTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {...task, isCompleted: !task.isCompleted}
      }

      return task;
    })
    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter(task => task.id != taskId)
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description){
    const newTask = {
      id: tasks.length + 1,
      title,
      description,
      isCompleted: false
    }
    setTasks([...tasks, newTask])
  }

  return (
    <div className='w-screen h-screen bg-slate-500 flex justify-center p-6'>
      <div className='w-[500px] space-y-4'>
        <Title>
          Gerengiador de Tarefas
        </Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit}/>
        <Tasks tasks={tasks} onTaskClick={onTaskClick} onDeleteTaskClick={onDeleteTaskClick}/>
      </div>
    </div>
  )
}

export default App
