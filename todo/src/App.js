import './App.css';
import {useContext, useEffect, useState} from 'react';
import {TaskSettings} from './Context.js';
import {Modal} from './Modal.js';
import {setSS} from './CookieHelpers.js'
import { getTasksHelper, deleteTaskHelper, addTaskHelper, closeModalSettings, editTaskHelper } from './Helpers';

function StickyNote({handleClick, task, content}) {
  return (
    <div className='note' onClick={handleClick}> 
      <h3> {task} </h3>
      <p> {content} </p>
    </div>
  );
}

function App() {
  useContext(TaskSettings);
  const notes = [];
  const [modalSettings, setModalSettings] = useState({'open': false});
  const [tasks, setTasks] = useState([]); 

  useEffect(() => {
    getTasksHelper(updateTasks);
  }, [])

  const add_function = (taskName, taskContent) => {
    addTaskHelper(updateTasks, {'task_name': taskName, 'task_content': taskContent});
    setModalSettings(closeModalSettings);
  }

  const delete_function = (taskName, taskContent) => {
    deleteTaskHelper(updateTasks, {'task_name': taskName, 'task_content': taskContent});
    setModalSettings(closeModalSettings);
  }

  const edit_function = (taskName, taskContent, newTaskName, newTaskContent) => {
    editTaskHelper(updateTasks, {'task_name': taskName, 'task_content': taskContent, 
                                'new_task_name': newTaskName, 'new_task_content': newTaskContent});
    setModalSettings(closeModalSettings);
  }

  function addTask() {
    let settingsToSend = {
      'task_name': '', 
      'task_details': '', 
      'delete': delete_function, 
      'adding': true, 
      'add_function': add_function, 
      'edit_function': edit_function,
      'editing': false,
      'open': true,
    }
    setModalSettings(settingsToSend);
  }

  function updateTasks(data) {
    let allTasks = {};
    for (let task in data) {
      allTasks[task] = {'task': task, 'content': data[task]}
    }
    setTasks(allTasks);
  }
  
  function logOut() {
    setSS('', true);
    window.location.href = '/todo/login';
  }

  function handleClick(item) {
    let settingsToSend = {
      'task_name': tasks[item]['task'], 
      'task_details': tasks[item]['task'], 
      'adding': false, 
      'add_function': add_function, 
      'edit_function': edit_function,
      'delete': delete_function, 
      'editing': false,
      'open': true,
    }
    setModalSettings(settingsToSend);
  }

  for (let item in tasks) {
    notes.push(
      <StickyNote handleClick={() => handleClick(item)} task={tasks[item]['task']} content={tasks[item]['content']}/>
    );
  }

  return (
    <>
      <h1> {`My Tasks`} </h1>
      <div className='main'> 
        {notes}
      </div> <br/>  
      <TaskSettings.Provider value={modalSettings}>
        <Modal/>    
      </TaskSettings.Provider>
      <button onClick={() => {addTask()}}> Add Task </button>
      <button onClick={() => {logOut()}}> Log Out</button>
    </>
  );
}


export default App;