<template>
    <div class="page">
        <header class="navbar navbar-default">
            <span class="navbar-brand">{{ name }}</span>
        </header>
        <main>
            <div class="messages" v-el:messages>
                <div v-for="message of chat.messages" :class="['message', message.user._id === state.user._id ? 'reverse' : '']">
                    <img :src="message.user.avatar" class="img-circle">
                    <div>
                        <span class="time">{{ message.createdAt | moment 'calendar' }}</span>
                        <div class="well text">{{ message.text }}</div>
                    </div>
                </div>
            </div>
            <div class="compose">
                <div class="form-group">
                    <textarea v-el:text rows="1" placeholder="发送消息…" v-model="text" @keyup.enter="textKeyUp($event)" @input="resizeText" class="form-control"></textarea>
                </div>
                <button @click="sendMessage" class="btn"><i class="material-icons">send</i></button>
            </div>
        </main>
    </div>
</template>

<style scoped lang="less">
    @import "../material-colors";

    .page {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .navbar {
        flex-shrink: 0;
        display: flex;
        height: 56px;
        margin: 0;
        align-items: center;
    }
    .navbar-brand {
        height: initial !important;
        padding: 0 16px;
        color: @md-light-primary !important;
        line-height: initial !important;
        font-size: 20px;
    }

    main {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
    }

    .messages {
        flex-grow: 1;
        overflow-y: auto;
    }
    .message {
        display: flex;
        padding: 8px 16px;
        align-items: flex-start;
    }
    .message:first-child {
        padding-top: 16px;
    }
    .message:last-child {
        padding-bottom: 16px;
    }
    .message.reverse {
        flex-direction: row-reverse;
    }
    .img-circle {
        width: 40px;
        height: 40px;
    }
    .message > div {
        display: flex;
        flex-direction: column;
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

    .compose {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        border-top: 1px solid @md-dark-divider;
    }
    .compose > .form-group {
        flex-grow: 1;
        margin: 0;
        padding: 0 4px 0 16px;
    }
    .compose > .form-group > textarea {
        margin: 8px 0;
        padding: 0 0 4px 0;
    }
    .compose > button {
        margin: 0 4px 0 0;
        padding: 12px;
        border-radius: 50%;
        color: @md-blue-500;
    }
</style>

<script>
    import Vue from 'vue';

    import Store from '../store'

    export default {
        data() {
            return {
                chat: null,
                text: null,
                state: Store.state
            };
        },
        computed: {
            name() {
                if (!this.chat) {
                    return "";
                }
                return this.chat.name || this.chat.members
                        .filter(member => member.user._id !== this.state.user._id)
                        .map(member => member.user.alias ? member.user.alias : member.user.nickname)
                        .join('，');
            }
        },
        methods: {
            scrollMessagesToBottom() {
                this.$els.messages.scrollTop = this.$els.messages.scrollHeight;
            },
            sendMessage() {
                if (!this.text || !this.text.length) {
                    return;
                }
                Store.sendMessage(this.chat._id, this.text)
                    .then(message => {
                        this.chat.messages.push(message);
                        this.text = "";
                    });
            },
            textKeyUp(event) {
                if (event.ctrlKey) {
                    this.sendMessage();
                }
            },
            resizeText() {
                this.$els.text.rows = Math.min(this.$els.text.value.split('\n').length, 3);
            }
        },
        watch: {
            'chat.messages'() {
                this.scrollMessagesToBottom();
            }
        },
        route: {
            data(transition) {
                if (transition.to.name === 'chat') {
                    return {
                        chat: Store.fetchChat(transition.to.params.chatId)
                    };
                }
                return {
                    chat: Store.fetchChatByUser(transition.to.params.username)
                };
            }
        }
    }
</script>
