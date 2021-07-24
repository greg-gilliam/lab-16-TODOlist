import { isValidPassword } from '../utils/login-utils.js';
import { getUsers } from '../utils/storage-utils.js';


const userForm = document.getElementById('userForm');
const createAcct = document.getElementById('createAcct');

userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const signInData = new FormData(userForm);
    const name = signInData.get('name');
    const password = signInData.get('pwd');
    const users = getUsers();
    if (isValidPassword(name, password, users)) {
        window.location = `list/?name=${name}`;
    } else {
        alert('wrong username or password');
    }
});

createAcct.addEventListener('click', (e) => {
    e.preventDefault();
    window.location = ('./create');
});