document.getElementById('login-btn').addEventListener('click', async () => {

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');
    try {
        // Intentar hacer login
        let response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        

        const data = await response.json();
        if (response.ok) {
            messageElement.innerText = 'Login successful! Token: ' + data.token;

        } else {
            messageElement.innerText = 'An error occured during login';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'An error occurred';
    }
});

document.getElementById('sign-btn').addEventListener('click', async () => {

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');
    try {
        // Intentar hacer login
        let response = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        

        const data = await response.json();
        if (response.ok) {
            messageElement.innerText = 'Signup successful!';
        } else {
            messageElement.innerText = data.message;
        }
    } catch (error) {
        console.error('Error:', error);
        messageElement.innerText = 'An error occurred during signup';
    }
});
