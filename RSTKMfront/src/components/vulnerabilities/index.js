import React, { Component } from 'react';
import dayjs from 'dayjs'
import service from '../../services';
import { withRouter } from '../../hooks/withRouter'

class Vulnerabilities extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { router } = this.props;
        if (router?.params?.id) {
            service.getVulnerabilities(router?.params?.id).then((c) => {
                this.refs.name.value = c.name;
                this.refs.product.value = c.product;
                this.refs.detection_date.value = c.detection_date;
                this.refs.description.value = c.description;
                this.refs.has_exploit.value = c.has_exploit;
                this.refs.owner.value = c.owner;
            })
        }
    }

    handleCreate() {
        service.createVulnerabilities(
            {
                name: this.refs.name.value,
                product: this.refs.product.value,
                detection_date: dayjs.utc(this.refs.detection_date.value),
                description: this.refs.description.value,
                has_exploit: this.refs.has_exploit.value,
                owner: this.refs.owner.value,
            },
        ).then((result) => {
            alert("Form created!");
        }).catch(() => {
            alert('There was an error! Please re-check your form.');
        });
    }

    handleUpdate(id) {
        service.updateVulnerabilities(
            {
                id: id,
                name: this.refs.name.value,
                product: this.refs.product.value,
                detection_date: this.refs.detection_date.value,
                description: this.refs.description.value,
                has_exploit: this.refs.has_exploit.value,
                owner: this.refs.owner.value,
            },
        ).then((result) => {
            alert("Form updated!");
        }).catch(() => {
            alert('There was an error! Please re-check your form.');
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const { router } = this.props;

        if (router?.params && router?.params.id) {
            this.handleUpdate(router?.params.id);
        } else {
            this.handleCreate();
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>
                        Название:
                    </label>
                    <input className="form-control" type="text" ref="name" />

                    <label>
                        Продукт:
                    </label>
                    <input className="form-control" type="text" ref="product" />

                    <label>
                        Дата обнаружения:
                    </label>
                    <input className="form-control" type="datetime-local" ref="detection_date" />

                    <label>
                        Описание:
                    </label>
                    <input className="form-control" type="text" ref="description" />

                    <label>
                        Наличие эксплойта в сети:
                    </label>
                    <input className="form-control" type="text" ref="has_exploit" />

                    <label>
                        Создатель:
                    </label>
                    <textarea className="form-control" ref="owner"></textarea>


                    <input className="btn btn-primary" type="submit" value="Submit" />
                </div>
            </form>
        );
    }
}

export default withRouter(Vulnerabilities);
