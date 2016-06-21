<template>
    <div>
        <header class="navbar navbar-default">
            <span class="navbar-brand">{{ state.user.nickname }}</span>
            <button class="btn search" @click="showSearch"><i class="material-icons">search</i></button>
            <button class="btn" @click="showProfile"><i class="material-icons">person</i></button>
        </header>
        <nav>
            <ul class="nav nav-tabs">
                <li class="active"><a href="#chats" data-toggle="tab">聊天</a></li>
                <li><a href="#friends" data-toggle="tab">朋友</a></li>
            </ul>
        </nav>
        <main class="tab-content">
            <section id="chats" class="tab-pane fade in active">
                <recent-list></recent-list>
            </section>
            <section id="friends" class="tab-pane fade">
                <friend-list></friend-list>
            </section>
        </main>
    </div>
</template>

<style scoped lang="less">
    @import "../material-colors";

    .navbar > .btn {
        margin: 0 4px 0 0;
        padding: 12px;
        border-radius: 50%;
        color: @md-white;
    }
    .navbar > .btn.search {
        margin: 0 0 0 auto;
    }

    .nav {
        flex-shrink: 0;
    }
    .nav-tabs {
        display: flex;
        height: 48px;
        align-items: center;
        background: transparent;
        border-bottom: 1px solid @md-dark-divider;
    }
    .nav-tabs > li {
        flex-grow: 1;
        margin: 0;
    }
    .nav-tabs > li > a {
        display: block;
        height: 48px;
        padding: 0;
        border-radius: 0;
        color: @md-dark-secondary !important;
        font-size: 16px;
        line-height: 48px;
        text-align: center;
        text-transform: uppercase;
        transition: color 0.2s ease;
    }
    .nav-tabs > li > a:hover {
        color: @md-dark-primary !important;
    }
    .nav-tabs > li.active > a {
        border-bottom: 2px solid @md-blue-500 !important;
        color: @md-blue-500 !important;
    }
</style>

<script>
    import FriendList from './FriendList'
    import RecentList from './RecentList'

    import EventBus from '../eventbus'
    import Store from '../store'

    export default{
        data() {
            return {
                state: Store.state
            }
        },
        methods: {
            showSearch() {
                EventBus.$emit('show-search');
            },
            showProfile() {
                EventBus.$emit('show-user', this.state.user.username);
            }
        },
        components: {
            FriendList,
            RecentList
        }
    }
</script>
