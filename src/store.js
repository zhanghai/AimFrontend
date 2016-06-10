'use strict';

import Api from './api'

export default {

    state: {
        friends: [],
        requests: []
    },

    fetchFriends() {
        Api.get('friends')
            .then(friends => state.friends = friends)
            .catch(e => Console.error(e));
    },

    fetchRequests() {
        Api.get('requests')
            .then(friends => state.friends = friends)
            .catch(e => Console.error(e));
    }
}
