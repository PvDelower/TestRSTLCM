import React from 'react';
import ReactDOM from 'react-dom';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs'
import App from './components/app';
import './index.css';

dayjs.extend(utc)

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root'),
);

