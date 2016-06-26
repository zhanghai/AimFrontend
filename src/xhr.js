'use strict';

const isDebugEnvironment = process.env.NODE_ENV === 'development';
const base = isDebugEnvironment ? '//localhost:3000/' : '/';
const credentials = isDebugEnvironment ? 'include' : 'same-origin';

const usePostForPatch = true;

function validateStatus(response) {
    if (response.status === 401) {
        window.location = '/login';
    }
    if (response.status < 200 || response.status >= 300) {
        return Promise.reject(new Error('Bad response status: ' + response.status));
    }
    return response;
}

const toJson = response => response.json();

export default {

    get(resource, formElement) {
        return fetch(base + resource, {
            credentials,
            body: new FormData(formElement)
        })
            .then(validateStatus)
            .then(toJson);
    },

    post(resource, formElement) {
        return fetch(base + resource, {
            method: 'post',
            credentials,
            body: new FormData(formElement)
        })
            .then(validateStatus)
            .then(toJson);
    },

    patch(resource, formElement) {
        if (usePostForPatch) {
            return post(resource, formElement);
        }
        return fetch(base + resource, {
            method: 'patch',
            credentials,
            body: new FormData(formElement)
        })
            .then(validateStatus)
            .then(toJson);
    },

    delete(resource, formElement) {
        return fetch(base + resource, {
            method: 'delete',
            credentials,
            body: new FormData(formElement)
        })
            .then(validateStatus);
    }
}
