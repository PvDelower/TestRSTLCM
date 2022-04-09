import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Route, Routes, Link } from 'react-router-dom'

import VulnerabilitiesList from '../mainList'
import Vulnerabilities from '../vulnerabilities'
import Login from '../login'
import { isAuth } from '../../selectors/isAuth'
import services from '../../services'
import Register from "../register";
import './styles.css';

const BaseLayout = ({ onLogout, onDownloadFile }) => (
    <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Site</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="nav-item nav-link" to="/">Уязвимости</Link>
                    <Link className="nav-item nav-link" to="/register">Регистрация</Link>
                    {isAuth() ? (
                        <>
                            <Link className="nav-item nav-link" to="/vulnerabilities">Создать</Link>
                            <button onClick={onDownloadFile} className="nav-item nav-link button">Скачать CSV файл</button>
                            <button onClick={onLogout} className="nav-item nav-link button">Выйти</button>
                        </>
                    ) : (
                        <Link className="nav-item nav-link" to="/login">Войти</Link>
                    )}
                </div>
            </div>
        </nav>

        <div className="content">
            <Routes>
                <Route path="/" exact element={<VulnerabilitiesList />} />
                <Route path="/register" exact element={<Register />} />

                <Route path="/vulnerabilities" exact element={<Vulnerabilities />} />
                {isAuth() ? (
                    <Route path="/vulnerabilities/:id" element={<Vulnerabilities />} />
                ) : (
                    <Route path="/login" element={<Login />} />
                )}
            </Routes>
        </div>

    </div>
)

class App extends Component {
    componentDidMount() {
        if (isAuth()) {
            services.me(localStorage.getItem('token')).then((response) => {
                localStorage.setItem('userId', response.data?.id)
            })
        }
    }

    onDownloadFile() {
        const token = localStorage.getItem('token')

        services.downloadFile(token)
    }

    onLogout() {
        const token = localStorage.getItem('token')

        localStorage.clear();

        services.logout(token).then(() => {
            window.location.reload()
        })
    }

    render() {
        return (
            <BrowserRouter>
                <BaseLayout onLogout={this.onLogout} onDownloadFile={this.onDownloadFile} />
            </BrowserRouter>
        );
    }
}

export default App;
