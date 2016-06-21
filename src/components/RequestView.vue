<template>
    <div class="list-group-item">
        <img :src="request.requester.avatar" class="img-circle" @click.stop="showUser(request.requester.username)">
        <div class="text">
            <span class="name">{{ request.requester.alias || request.requester.nickname }}</span>
            <span class="message">{{ request.message }}</span>
        </div>
        <div class="right">
            <span class="state">{{ state }}</span>
            <button class="btn reject" v-show="!state" @click="resolve(false)">拒绝</button>
            <button class="btn btn-raised btn-primary" v-show="!state" @click="resolve(true)">同意</button>
        </div>
    </div>
</template>

<style scoped lang="less">
    @import "../material-colors";

    .list-group-item {
        display: flex;
        height: 64px;
        padding: 8px 16px;
        align-items: center;
        border-bottom: solid 1px @md-dark-divider !important;
    }
    .list-group-item.v-link-active {
        background: rgba(0, 0, 0, 0.06);
    }

    .img-circle {
        flex-shrink: 0;
        width: 40px;
        height: 40px;
        cursor: pointer;
    }

    .text {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 16px;
    }
    .name {
        font-size: 16px;
    }
    .message {
        color: @md-dark-secondary;
    }

    .right {
        flex-shrink: 0;
        display: flex;
        flex-direction: row;
        margin-left: auto;
    }
    .state {
        color: @md-dark-hint;
    }
    .reject {
        margin-right: 8px;
    }
</style>

<script>
    import EventBus from '../eventbus'
    import Store from '../store'

    export default {
        props: {
            request: {}
        },
        computed: {
            state() {
                switch (this.request.state) {
                    case 'accepted':
                        return '已同意';
                    case 'rejected':
                        return '已拒绝';
                    default:
                        return '';
                }
            }
        },
        methods: {
            showUser(username) {
                EventBus.$emit('show-user', username);
            },
            resolve(accept) {
                Store.resolveRequest(this.request._id, accept)
                        .then(() => EventBus.$emit('requests-updated'))
                        .then(() => EventBus.$emit('friends-updated'));
            }
        }
    }
</script>
