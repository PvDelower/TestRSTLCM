import React, { useState } from 'react';
import service from '../../services'

function Login() {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const onLogin = (e) => {
        e.preventDefault()

        service.login({
            username: login,
            password,
        }).then((response) => {
            alert('Успешно')
            localStorage.setItem('token', response.data?.auth_token);
            window.location.href = '/'
        }).catch(() => {
            alert('Ошибка при авторизации')
        })
    }

    return (
        <form onSubmit={onLogin} style={{ maxWidth: '400px' }}>
            <div className="form-outline mb-4">
                <input type="login" value={login} onChange={(e) => setLogin(e.target.value)} id="form2Example1" className="form-control" />
                <label className="form-label" htmlFor="form2Example1">Login</label>
            </div>

            <div className="form-outline mb-4">
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="form2Example2" className="form-control" />
                <label className="form-label" htmlFor="form2Example2">Password</label>
            </div>

            <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>
        </form>
    );
}

export default Login;
