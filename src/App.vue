<template>
    <div class="top">
        <main>
            <section class="left">
                <home-view></home-view>
            </section>
            <section class="right">
                <router-view></router-view>
            </section>
        </main>
        <div class="modal" :class="{ active: modal }" @click="modal = ''">
            <user-view v-show="modal === 'user'"></user-view>
            <profile-view v-show="modal === 'profile'"></profile-view>
            <search-view v-show="modal === 'search'"></search-view>
        </div>
    </div>
</template>

<style lang="less">
    @import "material-colors";

    html, body {
        width: 100%;
        height: 100%;
    }

    body {
        background: url('assets/background.jpg') center / cover;
    }

    span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .navbar {
        flex-shrink: 0;
        display: flex;
        height: 56px;
        margin: 0 !important;
        align-items: center;
    }
    .navbar-brand {
        height: initial !important;
        margin-left: 16px;
        padding: 0 !important;
        color: @md-light-primary !important;
        line-height: initial !important;
        font-size: 20px !important;
    }

    .img-circle {
        object-fit: cover;
    }

    .btn {
        outline: none !important;
    }

    .btn-raised .btn-primary {
        color: @md-white !important;
    }
</style>

<style scoped lang="less">
    @import "material-colors";

    .top {
        width: 100%;
        height: 100%;
        display: flex;
    }

    main {
        display: flex;
        width: 960px;
        height: 90%;
        max-height: 720px;
        margin: auto;
    }

    section {
        height: 100%;
        margin: auto;
        background: @md-white;
    }
    .left {
        width: 36%;
    }
    .right {
        width: 64%;
        border-left: solid @md-dark-divider 1px;
    }

    .modal {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: @md-dark-secondary;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
    }
    .modal.active {
        opacity: 1;
        pointer-events: auto;
    }
</style>

<script>
    import HomeView from './components/HomeView'
    import ProfileView from './components/ProfileView'
    import SearchView from './components/SearchView'
    import UserView from './components/UserView'

    import EventBus from './eventbus'
    import Store from './store'

    export default {
        replace: false,
        created() {
            EventBus.$on('show-user', (username) => this.modal = username === Store.state.user.username ? 'profile' : 'user');
            EventBus.$on('hide-user', () => this.modal = '');
            EventBus.$on('show-profile', () => this.modal = 'profile');
            EventBus.$on('hide-profile', () => this.modal = '');
            EventBus.$on('show-search', () => this.modal = 'search');
            EventBus.$on('hide-search', () => this.modal = '');
            Store.fetchProfile();
        },
        data() {
            return {
                modal: false
            };
        },
        components: {
            HomeView,
            ProfileView,
            SearchView,
            UserView
        }
    }
</script>
