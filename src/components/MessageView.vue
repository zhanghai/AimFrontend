<template>
    <div class="message" :class="{ reverse: message.user._id === state.user._id }">
        <img :src="message.user.avatar" class="img-circle" @click="showUser(message.user.username)">
        <div>
            <span class="time">{{ message.createdAt | moment 'calendar' }}</span>
            <div class="well text">{{ message.text }}</div>
        </div>
    </div>
</template>

<style scoped lang="less">
    @import "../material-colors";

    .message {
        display: flex;
        padding: 8px 16px;
        align-items: flex-start;
    }
    .message.reverse {
        flex-direction: row-reverse;
    }
    .message:first-child {
        padding-top: 16px;
    }
    .message:last-child {
        padding-bottom: 16px;
    }

    .img-circle {
        width: 40px;
        height: 40px;
        cursor: pointer;
    }

    .message > div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 16px;
    }
    .message.reverse > div {
        align-items: flex-end;
        margin-right: 16px;
    }
    .message > div > .time {
        font-size: 10px;
    }
    .message > div > .text {
        margin: 0;
        padding: 7px;
        background: @md-white;
        white-space: pre-wrap;
    }
</style>

<script>
    import EventBus from '../eventbus'

    export default{
        props: ['message'],
        data() {
            return {
                state: Store.state
            };
        },
        methods: {
            showUser(username) {
                EventBus.$emit('show-user', username);
            }
        }
    }
</script>
