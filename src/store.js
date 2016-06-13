'use strict';

import Api from './api'
import Vue from 'vue'

function updateArrayById(array) {
    return newItem => {
        const index = array.findIndex(item => item._id === newItem._id);
        if (index !== -1) {
            array.$set(index, newItem);
        }
    };
}

function updateArrayByIds(array) {
    return newArray => {
        for (const newItem of newArray) {
            const index = array.findIndex(item => item._id === newItem._id);
            if (index !== -1) {
                array.$set(index, newItem);
            }
        }
    };
}

function removeFromArrayById(array, id) {
    return () => {
        const index = array.findIndex(item => item._id === id);
        if (index !== -1) {
            array.splice(index, 1);
        }
    };
}

function updateMapByIds(map) {
    return newArray => {
        for (const newItem of newArray) {
            if (map[newItem._id]) {
                Vue.set(map, newItem._id, newItem);
            }
        }
    };
}

function consoleError(e) {
    console.error(e);
}

export default {

    state: {
        profile: {},
        friends: [],
        requests: [],
        usersById: {}
    },

    fetchProfile() {
        Api.fetchProfile()
            .then(profile => {
                this.state.profile = profile;
                return profile;
            })
            .catch(consoleError);
    },

    fetchRequests() {
        Api.fetchRequests()
            .then(requests => this.state.requests = requests)
            .catch(consoleError);
    },

    resolveRequest(requestId, accept) {
        return Api.resolveRequest(requestId, accept)
            .then(updateArrayById(this.state.requests))
            .catch(consoleError)
    },

    deleteRequest(requestId) {
        return Api.deleteRequest(requestId)
            .then(removeFromArrayById(this.state.requests, requestId))
            .catch(consoleError);
    },

    fetchFriends() {
        Api.fetchFriends()
            .then(friends => {
                this.state.friends = friends;
                return friends;
            })
            .then(updateMapByIds(this.state.usersById))
            .catch(consoleError);
    },

    fetchUser(username) {
        Api.fetchUser(username)
            .then(user => {
                Vue.set(this.state.usersById, user._id, user);
                return user;
            })
            .then(updateArrayById(this.state.friends))
            .catch(consoleError);
    }
}
