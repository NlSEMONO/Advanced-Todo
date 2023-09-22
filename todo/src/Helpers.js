import {getSS, setSS} from './CookieHelpers.js';

export function getTasksHelper(updateTasks) {
    let SS = getSS();
    if (SS === '') {
    //   window.location.href = '/todo/login';
      return;
    }
    fetch('get-tasks', createPostRequest({'SS': SS})).then(
      res => res.json()
    ).then(
      data => {
        updateTasks(data['tasks']);
        console.log('hi');
      }
    ).catch(
      () => {
        window.alert('An error occured please login again.');
        window.location.href = '/todo/login';
        setSS('', true);
      }
    )
}

export function addTaskHelper(updateTasks, body) {
    fetch('add-task', createPostRequest({
        'SS': getSS(), 'task': body['task_name'], 'content': body['task_content']
    }))
    .then(
        res => res.json()
    ).then(
        data => {
            updateTasks(data['tasks']);
        }
    );
}

export function deleteTaskHelper(updateTasks, body) {
    fetch('remove-task', createPostRequest({
        'SS': getSS(), 'task': body['task_name'], 'content': body['task_content']
    })).then(
        res => res.json()
    ).then(
        data => {
            updateTasks(data['tasks'])
        }
    );
}


export function editTaskHelper(updateTasks, body) {
    fetch('edit-task', createPostRequest({
        'SS': getSS(), 'task': body['task_name'], 'content': body['task_content'], 
                        'new_task': body['new_task_name'], 'new_content': body['new_task_content']
    })).then(
        res => res.json()
    ).then(
        data => {
            updateTasks(data['tasks'])
        }
    );
}

function createPostRequest(body) {
    return  {
      method: 'POST', 
      body: JSON.stringify(body),
      headers: {
        'content-type': 'application/json'
      }
    }
}

export const closeModalSettings = {
    'adding': false, 
    'editing': false,
    'open': false,
}