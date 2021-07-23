// write make new id function at some point
import { getUsers, setUsers } from '../utils/storage-utils.js';
import { makeUser, userNameExists } from '../utils/login-utils.js';

const userForm = document.getElementById('userForm');

userForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const users = getUsers();
    
    const signInData = new FormData(userForm);
    const name = signInData.get('name');
    const password = signInData.get('pwd');

    if (!userNameExists(users, name)) {
        const newUser = makeUser(name, password);
        users.push(newUser);
        setUsers(users);
        window.location.replace(`../list/index.html?name=${name}`);
    } else {
        alert('User name already in use.');
    }
});

// this functions takes in whatever contains currently
// need to know the name to find match