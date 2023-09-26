import './App.css';
import {useContext, useEffect, useState} from 'react';
import {TaskSettings} from './Context.js';
import {Modal} from './Modal.js';
import {setSS} from './CookieHelpers.js'
import { getTasksHelper, deleteTaskHelper, addTaskHelper, closeModalSettings, editTaskHelper } from './Helpers';
import { Navbar } from './Navbar';

function StickyNote({handleClick, task, content}) {
  return (
    <div className='note main-border' onClick={handleClick}> 
      <h3 style={{wordWrap: "normal"}}> {task} </h3>
      <p style={{wordWrap: "normal"}}> {content} </p>
    </div>
  );
}

function App() {
  useContext(TaskSettings);
  const notes = [];
  const [modalSettings, setModalSettings] = useState({'open': false});
  const [dimmed, setDimmed] = useState(false);
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

  const close_modal = () => {
    setModalSettings(closeModalSettings);
  }

  function addTask() {
    let settingsToSend = {
      'task_name': '', 
      'task_details': '', 
      'delete_function': delete_function, 
      'close_modal': close_modal,
      'adding': true, 
      'add_function': add_function, 
      'edit_function': edit_function,
      'editing': false,
      'open': true,
    }
    console.log('herro');
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
      'task_details': tasks[item]['content'], 
      'adding': false, 
      'add_function': add_function, 
      'edit_function': edit_function,
      'delete_function': delete_function, 
      'close_modal': close_modal,
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
      <Navbar dimmed={dimmed} toggleSidebar={() => setDimmed(!dimmed)}/>
      <div id="main" style={{opacity: dimmed ? '40%' : '100%'}}>
        <h1> {`My Tasks`} </h1> <br/>
        <div className='main'> 
          {notes}
        </div> <br/>  
        <TaskSettings.Provider value={modalSettings}>
          <Modal/>    
        </TaskSettings.Provider>
        <button className='btn main-border main-text secondary-back' onClick={() => {addTask()}}> Add Task </button>
        <button className='btn main-border main-text secondary-back' onClick={() => {logOut()}}> Log Out</button>
      </div>
    </>
  );
}


export default App;
