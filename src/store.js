'use strict';

import Api from './api'
import EventBus from './eventbus'
import Socket from './socket';

Socket.on('recents-updated', () => {
    EventBus.$emit('recents-updated');
});

Socket.on('requests-updated', () => {
    EventBus.$emit('requests-updated');
});

Socket.on('chat-updated', chatId => {
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
        return Api.fetchProfile()
            .then(user => {
                this.state.user = user;
                return user;
            })
            .catch(onError);
    },

    updateProfile(avatar, nickname, signature) {
        return Api.updateProfile(avatar, nickname, signature)
            .then(user => {
                this.state.user = user;
                return user;
            })
            .catch(onError);
    },

    fetchRequests() {
        return Api.fetchRequests()
            .catch(onError);
    },

    sendRequest(username, message) {
        return Api.sendRequest(username, message)
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

    deleteFriend(username) {
        return Api.deleteFriend(username)
            .catch(onError);
    },

    searchUsers(keyword) {
        return Api.searchUsers(keyword)
            .catch(onError);
    },

    fetchUser(username) {
        return Api.fetchUser(username)
            .catch(onError);
    },

    updateUser(username, alias, description, tags) {
        return Api.updateUser(username, alias, description, tags)
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
