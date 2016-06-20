<template>
    <div class="page">
        <header class="navbar navbar-default">
            <span class="navbar-brand">{{ name }}</span>
        </header>
        <main>
            <div class="messages" v-el:messages>
                <message-view v-for="message of chat.messages" :message="message"></message-view>
            </div>
            <div class="compose">
                <div class="form-group">
                    <textarea v-el:text rows="1" placeholder="发送消息…" class="form-control" v-model="text" @keyup.enter="textKeyUp($event)" @input="resizeText"></textarea>
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

    import MessageView from './MessageView'

    import EventBus from '../eventbus'
    import Store from '../store'

    export default {
        data() {
            return {
                chat: {
                    members: [],
                    messages: []
                },
                text: "",
                state: Store.state
            };
        },
        computed: {
            name() {
                if (!Object.keys(this.chat).length) {
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
                if (!this.text.length) {
                    return;
                }
                Store.sendMessage(this.chat._id, this.text)
                    .then(message => {
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
        components: {
            MessageView
        },
        created() {
            EventBus.$on('chat-updated', chatId => {
                if (this.chat._id === chatId) {
                    Store.fetchChat(chatId).then(chat => {
                        this.chat = chat;
                    });
                }
            });
        },
        route: {
            data(transition) {
                if (transition.to.name === 'chat') {
                    return {
                        chat: Store.fetchChat(transition.to.params.chatId)
                    };
                } else {
                    return {
                        chat: Store.fetchChatByUser(transition.to.params.username)
                    };
                }
            }
        }
    }
</script>
