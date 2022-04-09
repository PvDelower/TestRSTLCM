import axios from 'axios';

const API_URL = '/api';

class Service {

    constructor() {}

    getDefaultHeaders(token) {
        return {
            headers: {
                Authorization: `Token ${token}`
            }
        }
    }

    getVulnerabilities() {
        const url = `${API_URL}/vulnerabilities/`;
        return axios.get(url).then(response => response.data);
    }

    deleteVulnerabilities(vulnerabilities) {
        const url = `${API_URL}/vulnerabilities/${vulnerabilities.id}/`;
        return axios.delete(url);
    }

    createVulnerabilities(vulnerabilities) {
        const url = `${API_URL}/vulnerabilities/`;
        return axios.post(url, vulnerabilities);
    }

    updateVulnerabilities(vulnerabilities) {
        const url = `${API_URL}/vulnerabilities/${vulnerabilities.id}/`;
        return axios.put(url, vulnerabilities);
    }

    login(data) {
        const url = `${API_URL}/auth/token/login/`;
        return axios.post(url, data)
    }

    register(data) {
        const url = `${API_URL}/auth/users/`;
        return axios.post(url, data)
    }

    logout(token) {
        const url = `${API_URL}/auth/token/logout/`;
        return axios.post(url, undefined, this.getDefaultHeaders(token))
    }

    me(token) {
        const url = `${API_URL}/auth/users/me/`;
        return axios.get(url, this.getDefaultHeaders(token))
    }

    async downloadFile(token) {
        const url = `${API_URL}/csv/`;
        axios.get(url, this.getDefaultHeaders(token)).then(({ data, headers }) => {
            const downloadUrl = window.URL.createObjectURL(new Blob([data]));

            const fileName = headers?.['content-disposition']
                ?.split('filename=')?.[1]?.split(';')?.[0]?.replaceAll('"', '');
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.setAttribute("download", fileName);

            document.body.appendChild(link);

            link.click();
            link.remove();
        })
    }
}

export default new Service()
