'use strict';

import 'whatwg-fetch'

const isDebugEnvironment = process.env.NODE_ENV === 'development';

const base = isDebugEnvironment ? '//localhost:3000/api/' : '/api/';

const credentials = isDebugEnvironment ? 'include' : 'same-origin';

const validateStatus = function(response) {
    if (response.status < 200 || response.status >= 300) {
        return Promise.reject(new Error('Bad response status: ' + response.status));
    }
    return response;
};

const toJson = response => response.json();

const get = function (resource) {
    return fetch(base + resource, { credentials })
        .then(validateStatus)
        .then(toJson);
};

const post = function (resource, body) {
    return fetch(base + resource, {
        method: 'post',
        credentials,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(body)
    })
        .then(validateStatus)
        .then(toJson);
};

const patch = isDebugEnvironment ? post : function (resource, body) {
    return fetch(base + resource, {
        method: 'patch',
        credentials,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(body)
    })
        .then(validateStatus)
        .then(toJson);
};

export default {

    login(username, password) {
        return fetch(base + 'login', {
            method: 'post',
            credentials,
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify({
                username,
                password
            })
        })
            .then(validateStatus)
    },

    fetchFriends() {
        return get('friends');
    },

    sendRequest(username, message) {
        return post('requests', {
            username,
            message
        });
    },

    fetchRequests() {
        return get('requests');
    },

    resolveRequest(requestId, accept) {
        return patch('requests/' + requestId, { state: accept ? 'accepted' : 'rejected' });
    }
}
