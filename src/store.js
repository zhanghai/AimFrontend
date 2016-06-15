'use strict';

import Api from './api'

function consoleError(e) {
    console.error(e);
}

export default {

    state: {
        user: {}
    },

    login(username, password) {
        return Api.login(username, password)
            .then(user => {
                this.state.user = user;
            });
    },

    fetchProfile() {
        Api.fetchProfile()
            .then(user => {
                this.state.user = user;
                return user;
            })
            .catch(consoleError);
    },

    fetchRequests() {
        Api.fetchRequests()
            .catch(consoleError);
    },

    resolveRequest(requestId, accept) {
        return Api.resolveRequest(requestId, accept)
            .catch(consoleError)
    },

    deleteRequest(requestId) {
        return Api.deleteRequest(requestId)
            .catch(consoleError);
    },

    fetchRecents() {
        return Api.fetchRecents()
            .catch(consoleError);
    },

    fetchRecent(recentId) {
        return Api.fetchRecent(recentId)
            .catch(consoleError);
    },

    updateRecent(recentId, lastReadAt) {
        return Api.updateRecent(recentId, lastReadAt)
            .catch(consoleError);
    },

    deleteRecent(recentId) {
        return Api.delete(recentId)
            .catch(consoleError);
    },

    fetchFriends() {
        return Api.fetchFriends()
            .catch(consoleError);
    },

    fetchUser(username) {
        return Api.fetchUser(username)
            .catch(consoleError);
    },

    fetchChat(chatId) {
        return Api.fetchChat(chatId)
            .catch(consoleError);
    },

    fetchChatByUser(username) {
        return Api.fetchChatByUser(username)
            .catch(consoleError);
    },

    sendMessage(chatId, text) {
        return Api.sendMessage(chatId, text)
            .catch(consoleError);
    }
}
