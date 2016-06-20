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
        <div class="modal" :class="{ visible: showLogin }">
            <login-view></login-view>
        </div>
    </div>
</template>

<style>
html, body {
    width: 100%;
    height: 100%;
}

body {
    background: url('assets/background.jpg') center / cover;
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
    background-color: @md-white;
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
    background: @md-dark-secondary;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
}
.modal.visible {
    opacity: 1;
    pointer-events: auto;
}
</style>

<script>
    import HomeView from './components/HomeView'
    import LoginView from './components/LoginView'

    import EventBus from './eventbus'
    import Store from './store'

    export default {
        replace: false,
        created() {
            EventBus.$on('show-login', (show = true) => this.showLogin = show);
            Store.fetchProfile();
        },
        data() {
            return {
                showLogin: false
            };
        },
        components: {
            HomeView,
            LoginView
        }
    }
</script>
