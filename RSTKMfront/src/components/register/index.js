import React, { useState } from 'react';
import service from '../../services'

function Register(props) {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [mail, setMail] = useState('')


    const onRegister = (e) => {
        e.preventDefault()

        service.register({
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
        <form onSubmit={onRegister} style={{ maxWidth: '400px' }}>
            <div className="form-outline mb-4">
                <input type="login" value={login} onChange={(e) => setLogin(e.target.value)} id="form2Example1" className="form-control" />
                <label className="form-label" htmlFor="form2Example1">Псевдоним</label>
            </div>

            <div className="form-outline mb-4">
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="form2Example2" className="form-control" />
                <label className="form-label" htmlFor="form2Example2">Пароль</label>
            </div>

            <div className="form-outline mb-4">
                <input type="mail" value={mail} onChange={(e) => setMail(e.target.value)} id="form2Example2" className="form-control" />
                <label className="form-label" htmlFor="form2Example2">Почта</label>
            </div>

            <button type="submit" className="btn btn-primary btn-block mb-4">Создать</button>
        </form>
    );
}

export default Register;
