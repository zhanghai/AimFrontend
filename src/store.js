'use strict';

import Api from './api'
import EventBus from './eventbus'
import Socket from './socket';

Socket.on('recentsUpdated', () => {
    EventBus.$emit('recents-updated');
});

Socket.on('chatUpdated', chatId => {
    EventBus.$emit('chat-updated', chatId);
});

function onError(e) {
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
            .catch(onError);
    },

    fetchRequests() {
        Api.fetchRequests()
            .catch(onError);
    },

    resolveRequest(requestId, accept) {
        return Api.resolveRequest(requestId, accept)
            .catch(onError)
    },

    deleteRequest(requestId) {
        return Api.deleteRequest(requestId)
            .catch(onError);
    },

    fetchRecents() {
        return Api.fetchRecents()
            .catch(onError);
    },

    fetchRecent(recentId) {
        return Api.fetchRecent(recentId)
            .catch(onError);
    },

    updateRecent(recentId, lastReadAt) {
        return Api.updateRecent(recentId, lastReadAt)
            .catch(onError);
    },

    deleteRecent(recentId) {
        return Api.delete(recentId)
            .catch(onError);
    },

    fetchFriends() {
        return Api.fetchFriends()
            .catch(onError);
    },

    fetchUser(username) {
        return Api.fetchUser(username)
            .catch(onError);
    },

    fetchChat(chatId) {
        return Api.fetchChat(chatId)
            .catch(onError);
    },

    fetchChatByUser(username) {
        return Api.fetchChatByUser(username)
            .catch(onError);
    },

    sendMessage(chatId, text) {
        return Api.sendMessage(chatId, text)
            .catch(onError);
    }
}
