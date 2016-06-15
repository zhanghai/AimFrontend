<template>
    <div>
        <header class="navbar navbar-default">
            <span class="navbar-brand">Aim</span>
        </header>
        <nav>
            <ul class="nav nav-tabs">
                <li class="active"><a href="#chats" data-toggle="tab">Chats</a></li>
                <li><a href="#friends" data-toggle="tab">Friends</a></li>
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

    .navbar {
        display: flex;
        height: 56px;
        margin: 0;
        align-items: center;
    }
    .navbar-brand {
        flex-shrink: 0;
        height: initial !important;
        padding: 0 16px;
        color: @md-light-primary !important;
        line-height: initial !important;
        font-size: 20px;
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

    export default{
        components: {
            FriendList,
            RecentList
        }
    }
</script>
