import {useState, usestate} from 'react';

function LoginForm({onLogin}) {
    const[username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        fetch('/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        })
            .then(r => r.json())
            .then(user => onLogin(user))
            
    }

    return (
        <form onSubmit={handleSubmit}>
            <input value = {username} onChange={e => setUsername(e.target.value)} placeholder = "Username"/>
            <input type = "password" value={password} onChange={ e => setPassword(e.target.value)} placeholder="PAssword"/>
            <button type = "submit">Login</button>

        </form>
    );
}
export default LoginForm;