import { getUsers, setUsers } from '../utils/storage-utils.js';
import { findByName } from '../utils/helpers.js';

const newNote = document.getElementById('newNote');
const submitNewNote = document.getElementById('submitNewNote');
const searchParams = new URLSearchParams(window.location.search);

let user = findByName(getUsers(), (searchParams.get('name')));
renderNotes(user);

submitNewNote.addEventListener('click', () =>{
    let user = findByName(getUsers(), (searchParams.get('name')));
    updateToDos(user, newNote.value, false);
    user = findByName(getUsers(), (searchParams.get('name')));
    renderNotes(user);
});

function updateToDos(user, newNote, bool) {
    const updatedUser = {
        id: user.id, 
        name: user.name,
        password: user.password,
        todos: [...user.todos, { name:newNote, completed:bool }],
    };

    const users = getUsers().filter(item => item.name !== user.name);
    users.push(updatedUser);
    setUsers(users);
    
}

function renderNotes(user) {
    const ulContainer = document.getElementById('notesContainer');
    const ul = document.createElement('ul');
    for (let listItem of user.todos) {
        const span = document.createElement('span');
        const li = document.createElement('li');
        const button = document.createElement('button');
        li.append(button, span);
        ul.appendChild(li);
        span.textContent = listItem.name;
        console.log(listItem.completed);
        if (listItem.completed === false){
            button.addEventListener('click', ()=>{
                updateListItemCompleted(user, listItem);
                const updatedUser = findByName(getUsers(), user.name);
                console.log(user);
                renderNotes(updatedUser);
            });
        } else {
            button.textContent = 'X';
            span.style.textDecoration = 'line-through';
        }
    }
    ulContainer.innerHTML = ul.outerHTML;
} 

function updateListItemCompleted(user, listItem) {
    updateToDos(user, listItem, true);
}