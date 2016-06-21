<template>
    <div class="container" @click.stop="">
        <header>
            <div class="form-group">
                <input placeholder="搜索用户" class="form-control" v-model="keyword" debounce="200">
            </div>
        </header>
        <main class="list-group">
            <search-user-view v-for="user of users" track-by="_id" :user="user"></search-user-view>
        </main>
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
        height: 56px;
        align-items: center;
        padding: 0 16px;
    }
    header > div {
        flex-grow: 1;
        margin: 0 !important;
        padding: 0;
        font-size: 34px;
        color: @md-white;
    }
    header > div > input {
        margin: 0 !important;
    }

    main {
        flex-grow: 1;
        border-top: solid @md-dark-divider 1px;
    }
</style>

<script>
    import SearchUserView from './SearchUserView'

    import EventBus from '../eventbus'
    import Store from '../store'

    export default{
        data() {
            return {
                users: {},
                keyword: ""
            };
        },
        methods: {
            chat() {
                this.$router.go({ name: 'chatByUser', params: { username: this.user.username } });
                this.close();
            },
            close() {
                EventBus.$emit('hide-user');
            }
        },
        watch: {
            keyword() {
                if (this.keyword) {
                    Store.searchUsers(this.keyword).then(users => this.users = users);
                } else {
                    this.users = [];
                }
            }
        },
        created() {
            EventBus.$on('show-user', username => Store.fetchUser(username).then(user => this.user = user));
        },
        components: {
            SearchUserView
        }
    }
</script>
