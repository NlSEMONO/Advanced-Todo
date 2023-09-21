import {useContext, useState} from 'react';
import {TaskSettings} from './Context.js';

export const Modal = () => {
    const [editing, setEditing] = useState(false);
    const settings = useContext(TaskSettings);
    const [taskName, setTaskName] = useState(settings['task_name']);
    const [taskContent, setTaskContent] = useState(settings['task_details']);

    const view_objects = [];
    if (editing || settings['adding']) {
        view_objects.push(<><h2>Task Name: </h2><br/></>);
        view_objects.push(<> <input type='text' onChange={e => setTaskName(e.target.value)}> {taskName} </input> <br/> </>);
        view_objects.push(<><h2>Task Content: </h2><br/></>);
        view_objects.push(<input type='text' onChange={e => setTaskContent(e.target.value)}> {taskContent} </input>);
        view_objects.push(
        <div style={{display: 'flex', justifyContent: 'center', height: '50px'}}> 
            <button onClick={settings['adding'] ? () => settings['add_function'](settings['task_name'], settings['task_details']) : 
                            () => settings['edit_function'](settings['task_name'], settings['task_details'], taskName, taskContent)}> 
                {settings['adding'] ? 'Add' : 'Save' }
            </button>
            <button onClick={() => settings['delete_function'](settings['task_name'], settings['task_details'])}> Delete </button> 
        </div>);
    }
    else {
        view_objects.push(<><h2>Task Name: </h2><br/></>);
        view_objects.push(<> <h1> {settings['task_name']} </h1><br/> </>);
        view_objects.push(<><h2>Task Content: </h2><br/></>);
        view_objects.push(<p> {settings['task_details']} </p>);
        view_objects.push(
        <div style={{display: 'flex', justifyContent: 'center', height: '50px'}}> 
            <button onClick={() => setEditing(true)}> Edit </button>
            <button onClick={settings['delete']}> Delete </button> 
        </div>);
    }
    
    return settings['open'] ? (
        {view_objects}
    ): null;
    // return (settings['open']) ? <div> {children} </div> : null;
};