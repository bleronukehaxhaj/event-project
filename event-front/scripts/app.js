const userUrl = 'http://localhost:8080/api/users';
const inputUsername = document.getElementById('inputUsername');
const inputPassword = document.getElementById('inputPassword');
const inputEmail = document.getElementById('inputEmail');

async function registerUser(event) {
    const username = inputUsername.value;
    const password = inputPassword.value;
    const email = inputEmail.value;
    event.preventDefault();

    if (!username.trim() || !password.trim() || !email.trim()) {
        alert('Please fill in all fields');
        return;
    }

    const userDto = {
        username: username,
        password: password,
        email: email
    };

    try {
        const response = await fetch(userUrl + "/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDto),
        });

        if (!response.ok) {
            throw new Error(`Registration failed: ${response.statusText}`);
        }

        const data = await response.text();
        console.log(data);

        setCookie('loggedInUser', username, 7);
        setCookie('isLoggedIn', 'true', 7);
        goToPage("../index.html")
    } catch (error) {
        console.error('Error during registration:', error.message);
        alert('Registration failed. Please try again.');
    }
}

async function loginUser(event) {
    const username = inputUsername.value;
    const password = inputPassword.value;
    event.preventDefault();

    if (!username.trim() || !password.trim()) {
        alert('Please provide a username and password');
        return;
    }

    const userDto = {
        username: username,
        password: password
    };

    try {
        const response = await fetch(userUrl + "/login", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDto),
        });

        if (!response.ok) {
            throw new Error(`Login failed: ${response.statusText}`);
        }

        const data = await response.text();
        console.log(data);

        setCookie('loggedInUser', username, 7);
        setCookie('isLoggedIn', 'true', 7);
        goToPage("../index.html");

    } catch (error) {
        console.error('Error during login:', error.message);
        alert('Login failed. Please check your credentials and try again.');
    }
}

async function logoutUser(event) {
    const username = getCookie('loggedInUser');
    event.preventDefault();

    const userDto = {
        username: username,
        password: null,
        email: null
    };

    try {
        const response = await fetch(userUrl + "/logout", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDto),
        });

        if (!response.ok) {
            throw new Error(`Logout failed: ${response.statusText}`);
        }

        const data = await response.text();
        console.log(data);

        deleteCookie('loggedInUser');
        deleteCookie('isLoggedIn');
        location.reload();

    } catch (error) {
        console.error('Error during logout:', error.message);
        alert('Logout failed. Please try again.');
    }
}


function goToPage(pageName) {
    window.location.href = pageName;
}

function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const cookieName = `${name}=`;
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

function updateButtonVisibility() {
    const isLoggedIn = getCookie('isLoggedIn') === 'true';
    const btnCreate = document.getElementById('btnCreate');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignup = document.getElementById('btnSignup');
    const btnLogout = document.getElementById('btnLogout');

    if (isLoggedIn) {
        btnLogin.style.display = 'none';
        btnSignup.style.display = 'none';
        btnLogout.style.display = 'block';
    } else {
        btnLogin.style.display = 'block';
        btnSignup.style.display = 'block';
        btnLogout.style.display = 'none';
        btnCreate.href = '../pages/login.html';
    }
}



