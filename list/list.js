import { getUsers, setUsers } from '../utils/storage-utils.js';
import { findByName } from '../utils/helpers.js';

const newNote = document.getElementById('newNote');
const submitNewNote = document.getElementById('submitNewNote');
const searchParams = new URLSearchParams(window.location.search);
const ulContainer = document.getElementById('notesContainer');

let user = findByName(getUsers(), (searchParams.get('name')));
ulContainer.innerHTML = '';
ulContainer.appendChild(renderNotes(user));

submitNewNote.addEventListener('click', () =>{
    let user = findByName(getUsers(), (searchParams.get('name')));
    updateToDos(user, newNote.value, false);
    user = findByName(getUsers(), (searchParams.get('name')));
    ulContainer.innerHTML = '';
    ulContainer.appendChild(renderNotes(user));
    newNote.value = '';
});

function updateToDos(user, newNote, bool) {
    console.log(user);
    const updatedTodos = user.todos.filter(item => item.name !== newNote);
    const updatedUser = {
        id: user.id, 
        name: user.name,
        password: user.password,
        todos: [...updatedTodos, { name: newNote, completed:bool }],
    };
    const users = getUsers().filter(item => item.name !== user.name);
    users.push(updatedUser);
    setUsers(users);
}

function renderNotes(user) {
    const ul = document.createElement('ul');
    for (let listItem of user.todos) {
        const span = document.createElement('span');
        const li = document.createElement('li');
        const button = document.createElement('button');
        li.append(button, span);
        ul.appendChild(li);
        span.textContent = listItem.name;
        if (listItem.completed === true) {
            button.innerHTML = 'X';
            span.style.textDecoration = 'line-through';
        }
        button.addEventListener('click', () => {
            let upDatedUser = findByName(getUsers(), user.name);
            button.innerHTML = 'X';
            span.style.textDecoration = 'line-through';
            updateListItemCompleted(upDatedUser, listItem);
        });
    }
    return ul;
} 

function updateListItemCompleted(user, listItem) {
    updateToDos(user, listItem.name, true);
}