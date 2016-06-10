'use strict';

import Api from './api'

const consoleError = e => console.error(e);

export default {

    state: {
        friends: [],
        requests: []
    },

    fetchFriends() {
        Api.fetchFriends()
            .then(friends => this.state.friends = friends)
            .catch(consoleError);
    },

    fetchRequests() {
        Api.fetchRequests()
            .then(requests => this.state.requests = requests)
            .catch(consoleError);
    }
}
