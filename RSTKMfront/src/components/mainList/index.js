import React, { Component } from 'react';
import dayjs from 'dayjs'
import { Link } from "react-router-dom";
import service from '../../services';

class VulnerabilitiesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vulnerabilities: [],
            nextPageURL: '',
        };
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        const self = this;
        service.getVulnerabilities().then(function (result) {
            self.setState({ vulnerabilities: result, nextPageURL: result.nextlink })
        });
    }

    handleDelete(e, id) {
        const self = this;
        service.deleteVulnerabilities({ id: id }).then(() => {
            var newArr = self.state.vulnerabilities.filter(function (obj) {
                return obj.id !== id;
            });

            self.setState({ vulnerabilities: newArr })
        });
    }

    render() {

        const userId = localStorage.getItem('userId')

        return (
            <div className="customers--list">
                <table className="table">
                    <thead key="thead">
                    <tr>
                        <th>#</th>
                        <th>Назвbание</th>
                        <th>Продукт</th>
                        <th>Дата обнаружения</th>
                        <th>Описание</th>
                        <th>Наличие эксплойта в сети</th>
                        <th>Создатель</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.vulnerabilities.map(c =>
                        <tr key={c?.id}>
                            <td>{c?.id}  </td>
                            <td>{c?.name}</td>
                            <td>{c?.product}</td>
                            <td>{dayjs(c?.detection_date).format('DD.MM.YYYY в HH:mm')}</td>
                            <td>{c?.description}</td>
                            <td>{c?.has_exploit ? 'Да' : 'Нет'}</td>
                            <td>{c?.owner}</td>
                            <td>
                                {userId == c?.owner && (
                                    <>
                                        <button onClick={(e) => this.handleDelete(e, c?.id)}> Delete</button>
                                        <Link to={"/vulnerabilities/" + c?.id}> Update</Link>
                                    </>
                                )}
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default VulnerabilitiesList;
