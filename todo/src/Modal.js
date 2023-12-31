import './App.css'
import {useContext, useState, useEffect} from 'react';
import {TaskSettings} from './Context.js';

export const Modal = () => {
    const [editing, setEditing] = useState(false);
    const settings = useContext(TaskSettings);
    const [taskName, setTaskName] = useState(settings['task_name']);
    const [taskContent, setTaskContent] = useState(settings['task_details']);

    useEffect(() => {
        setEditing(settings['editing']);
        const body = document.body;
        const html = document.documentElement;
        if (settings['open']) {
            let shade = document.getElementById("shade");
            let height = Math.max(body.scrollHeight, body.offsetHeight,
                html.clientHeight, html.scrollHeight, html.offsetHeight);
            console.log(height);
            shade.style.height = `${height}px`;
        }
    }, [settings]);

    const view_objects = [];
    if (editing || settings['adding']) {
        view_objects.push(<><h2><strong> Task Name: </strong></h2></>);
        view_objects.push(<input type='text' onChange={e => setTaskName(e.target.value)} value={taskName}/>);
        view_objects.push(<><h2><strong> Task Content: </strong> </h2></>);
        view_objects.push(<input type='text' onChange={e => setTaskContent(e.target.value)} value={taskContent}/>);
        view_objects.push(
        <div> 
            <button className='btn-small-round contrast-back' onClick={settings['adding'] ? () => {settings['add_function'](taskName, taskContent); setTaskContent(''); setTaskName('')}: 
                            () => {settings['edit_function'](settings['task_name'], settings['task_details'], taskName, taskContent); setTaskContent(''); setTaskName('')}}> 
                {settings['adding'] ? 'Add' : 'Save' }
            </button>
            {!settings['adding'] ? <button className='btn-small-round contrast-back' onClick={
            () => settings['delete_function'](settings['task_name'], settings['task_details'])}> Delete </button> : null}
            <button className='btn-small-round contrast-back' onClick={() => settings['close_modal']()}> Cancel </button> 
        </div>);
    }
    else {
        view_objects.push(<><h2><strong> Task Name: </strong> </h2></>);
        view_objects.push(<> <h3> {settings['task_name']} </h3> </>);
        view_objects.push(<><h2><strong> Task Content: </strong> </h2></>);
        view_objects.push(<p> {settings['task_details']} </p>);
        view_objects.push(
        <div> 
            <button className='btn-small-round contrast-back' onClick={() => setEditing(true)}> Edit </button>
            <button className='btn-small-round contrast-back' onClick={() => settings['delete_function'](settings['task_name'], settings['task_details'])}> Delete </button> 
            <button className='btn-small-round contrast-back' onClick={() => settings['close_modal']()}> Cancel </button> 
        </div>);
    }
    
    return settings['open'] ? (
        <>
            <div id='shade'>
            </div>  
            <div id='modal'> 
                {view_objects}
            </div>
        </>
    ): null;
    // return (settings['open']) ? <div> {children} </div> : null;
};