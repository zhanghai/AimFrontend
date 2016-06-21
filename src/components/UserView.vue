<template>
    <div class="container" @click.stop="">
        <header :style="{ background: 'linear-gradient(transparent, transparent, rgba(0, 0, 0, 0.38)), url(' + user.avatar + ') center / cover' }">
            <span class="title">{{ user.nickname }}</span>
        </header>
        <button class="btn btn-fab" @click="fabAction"><i class="material-icons">{{ user.isFriend ? 'chat' : requestSent ? 'done' : 'add' }}</i></button>
        <main>
            <div>
                <i class="material-icons">format_quote</i>
                <span :class="{ hint: !user.signature }">{{ user.signature || '（没有签名）' }}</span>
            </div>
            <div>
                <i class="material-icons">label</i>
                <div class="form-group">
                    <input placeholder="备注" :value="user.alias" class="form-control" v-model="alias">
                </div>
            </div>
            <div>
                <i class="material-icons">create</i>
                <div class="form-group">
                    <input placeholder="描述" :value="user.description" class="form-control" v-model="description">
                </div>
            </div>
            <div>
                <i class="material-icons">people</i>
                <div class="form-group">
                    <input placeholder="标签" :value="user.tags" class="form-control" v-model="tags">
                </div>
            </div>
        </main>
        <footer>
            <button class="btn btn-raised btn-primary" @click="save">保存</button>
            <button class="btn btn-primary" @click="close">取消</button>
            <button class="btn delete" v-show="user.isFriend" @click="delete">删除好友</button>
        </footer>
    </div>
</template>

<style scoped lang="less">
    @import "../material-colors";

    .container {
        display: flex;
        width: 400px;
        height: 80%;
        padding: 0;
        margin: 0;
        flex-direction: column;
        background: @md-white;
    }

    header {
        flex-shrink: 0;
        display: flex;
        height: 240px;
        padding: 16px;
        flex-direction: column;
        justify-content: flex-end;
    }
    header > span {
        margin: 0 0 12px 56px;
        font-size: 34px;
        color: @md-white;
    }

    .btn-fab {
        align-self: flex-end;
        margin: -28px 16px -28px 0 !important;
        background: @md-blue-500 !important;
        color: white !important;
    }

    main {
        flex-grow: 1;
        display: flex;
        padding: 16px;
        flex-direction: column;
        overflow-y: auto;
    }
    main > div {
        display: flex;
        min-height: 56px;
        align-items: center;
    }
    main > div > i {
        flex-shrink: 0;
        color: @md-dark-hint;
    }
    main > div > span {
        flex-grow: 1;
        margin-left: 32px;
    }
    .form-group {
        flex-grow: 1;
        margin: 0 0 0 32px;
    }
    .form-control {
        margin: 0 !important;
    }
    main > div > span.hint {
        color: @md-dark-hint;
    }

    footer {
        display: flex;
        flex-direction: row-reverse;
        height: 56px;
        padding: 0 16px;
    }
    footer > .btn-raised {
        margin-left: 8px;
    }
    footer > .delete {
        margin-right: auto;
        color: @md-red-500;
    }
</style>

<script>
    import EventBus from '../eventbus'
    import Store from '../store'

    export default{
        data() {
            return {
                user: {},
                alias: "",
                description: "",
                tags: [],
                requestSent: false
            };
        },
        methods: {
            fabAction() {
                if (this.user.isFriend) {
                    this.chat();
                } else if (!this.requestSent) {
                    this.sendRequest();
                }
            },
            sendRequest() {
                Store.sendRequest(this.user.username)
                        .then(() => this.requestSent = true)
                        .then(() => $.snackbar({ content: '已发送好友请求' }));
            },
            chat() {
                this.$router.go({ name: 'chatByUser', params: { username: this.user.username } });
                this.close();
            },
            save() {
                Store.updateUser(this.user.username, this.alias, this.description, this.tags)
                        .then(() => EventBus.$emit('chat-updated'))
                        .then(() => EventBus.$emit('recents-updated'))
                        .then(() => EventBus.$emit('friends-updated'))
                        .then(this.close);
            },
            delete() {
                if (window.confirm('真的要删除好友么？')) {
                    Store.deleteFriend(this.user.username)
                            .then(() => EventBus.$emit('friends-updated'))
                            .then(() => $.snackbar({ content: '已删除好友' }))
                            .then(this.close);
                }
            },
            close() {
                EventBus.$emit('hide-user');
            }
        },
        created() {
            EventBus.$on('show-user', username => Store.fetchUser(username).then(user => this.user = user));
        }
    }
</script>
