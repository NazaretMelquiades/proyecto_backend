 const loginbtn = document.getElementById('loginForm');
 
 if(loginbtn) {
    loginbtn.addEventListener('submit', async (e) => {
    e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'include'
        });
    });
};

const logoutBtn = document.getElementById('logoutBtn');
if(logoutBtn) {
    
    logoutBtn.addEventListener('click', async () => {
        const res = await fetch('/api/logout', {
            method: 'POST',
            credentials: 'include'
        });
        const data = await res.json();
        window.location.href = data.redirect;
    });
};