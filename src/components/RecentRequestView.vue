<template>
    <div v-link="{ name: 'requests' }" class="list-group-item withripple">
        <img src="../assets/requests.svg" class="img-circle">
        <div>
            <span class="name">好友请求</span>
            <span class="message">{{ message }}</span>
        </div>
        <span v-if="unreadCount > 0" class="badge">{{ unreadCount }}</span>
    </div>
</template>

<style scoped lang="less">
    @import "../material-colors";

    .list-group-item {
        display: flex;
        height: 56px;
        padding: 8px 16px;
        align-items: center;
        cursor: pointer;
        transition: background ease 0.2s;
    }
    .list-group-item.v-link-active {
        background: rgba(0, 0, 0, 0.06);
    }

    .img-circle {
        flex-shrink: 0;
        width: 40px;
        height: 40px;
    }

    .list-group-item > div {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        min-width: 0;
        margin-left: 16px;
    }

    .name {
        font-size: 16px;
    }

    .message {
        color: @md-dark-secondary;
    }

    .badge {
        flex-shrink: 0;
        background-color: @md-red-500;
    }
</style>

<script>
    import EventBus from '../eventbus'
    import Store from '../store'

    export default {
        data() {
            return {
                requests: []
            };
        },
        computed: {
            message() {
                if (!this.requests.length) {
                    return "";
                }
                const requester = this.requests[0].requester;
                return requester.alias || requester.nickname;
            },
            unreadCount() {
                return this.requests.filter(request => request.state === 'pending').length;
            }
        },
        methods: {
            fetchRequests() {
                return Store.fetchRequests().then(requests => this.requests = requests);
            }
        },
        created() {
            this.fetchRequests()
                    .then(() => EventBus.$on('requests-updated', this.fetchRequests));
        }
    }
</script>
