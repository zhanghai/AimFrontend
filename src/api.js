'use strict';

import 'whatwg-fetch'

const validateStatus = function(response) {
    if (response.status < 200 || response.status >= 300) {
        return Promise.reject(new Error('Bad response status: ' + response.status));
    }
    return response;
};

const toJson = response => response.json();

export default {

    login(username, password) {
        return fetch('/api/login', {
            method: 'post',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify({
                username,
                password
            })
        })
            .then(validateStatus)
    },

    get(resource) {
        return fetch('/api/' + resource, { credentials: 'same-origin' })
            .then(validateStatus)
            .then(toJson);
    },

    post(resource, body) {
        return fetch('/api/' + resource, {
            method: 'post',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            credentials: 'same-origin',
            body: JSON.stringify(body)
        })
            .then(validateStatus)
            .then(toJson);
    }
}
