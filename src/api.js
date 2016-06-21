'use strict';

import 'whatwg-fetch'

const isDebugEnvironment = process.env.NODE_ENV === 'development';

const base = isDebugEnvironment ? '//localhost:3000/api/' : '/api/';

const credentials = isDebugEnvironment ? 'include' : 'same-origin';

const validateStatus = function(response) {
    if (response.status === 401) {
        window.location = '/login';
    }
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

const delete_ = function (resource) {
    return fetch(base + resource, {
        method: 'delete',
        credentials
    })
        .then(validateStatus);
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
            .then(toJson);
    },

    fetchProfile() {
        return get('profile');
    },

    updateProfile(avatar, nickname, signature) {
        return patch('profile', {
            avatar,
            nickname,
            signature
        });
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
    },

    deleteRequest(requestId) {
        return delete_('requests/' + requestId);
    },

    fetchRecents() {
        return get('recents');
    },

    fetchRecent(recentId) {
        return get('recents/' + recentId);
    },

    updateRecent(recentId, lastReadAt) {
        return post('recents/' + recentId, { lastReadAt });
    },

    deleteRecent(recentId) {
        return delete_('recents/' + recentId);
    },

    fetchFriends() {
        return get('friends');
    },

    deleteFriend(username) {
        return delete_('friends/' + username);
    },

    searchUsers(keyword) {
        return get('users?keyword=' + window.encodeURIComponent(keyword));
    },

    fetchUser(username) {
        return get('users/' + username);
    },

    updateUser(username, alias, description, tags) {
        return patch('users/' + username, {
            alias,
            description,
            tags
        });
    },

    fetchChat(chatId) {
        return get('chats/' + chatId);
    },

    fetchChatByUser(username) {
        return get('chats/user/' + username);
    },

    sendMessage(chatId, text) {
        return post('chats/' + chatId + '/messages', { text });
    }
}
