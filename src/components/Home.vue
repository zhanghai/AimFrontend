<template>
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-tabs">
        <header class="mdl-layout__header">
            <div class="mdl-layout__header-row">
                <span class="mdl-layout-title">Aim</span>
            </div>
            <div class="mdl-layout__tab-bar mdl-js-ripple-effect">
                <a href="#chats-panel" class="mdl-layout__tab is-active">Chats</a>
                <a href="#friends-panel" class="mdl-layout__tab">Friends</a>
            </div>
        </header>
        <div class="mdl-layout__drawer">
            <span class="mdl-layout-title">Title</span>
        </div>
        <main class="mdl-layout__content">
            <section id="chats-panel" class="mdl-layout__tab-panel is-active">
                <p>chats</p>
            </section>
            <section id="friends-panel" class="mdl-layout__tab-panel">
                <friend-list></friend-list>
            </section>
        </main>
    </div>
</template>

<style>
    /* HACK: Fix width. */
    .mdl-layout__container {
        position: relative !important;
    }
</style>

<script>
    import FriendList from './FriendList'

    export default{
        data() {
            return {
                msg:'hello vue'
            }
        },
        components: {
            FriendList
        }
    }
</script>
