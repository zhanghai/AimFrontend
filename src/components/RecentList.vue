<template>
    <div class="list-group">
        <recent-view v-for="recent of recents" track-by="_id" :recent="recent"></recent-view>
    </div>
</template>

<style scoped lang="less">
    @import "../material-colors";

    .list-group {
        margin: 0;
    }
</style>

<script>
    import RecentView from './RecentView'

    import EventBus from '../eventbus'
    import Store from '../store'

    export default {
        components: {
            RecentView
        },
        data() {
            return {
                recents: []
            };
        },
        methods: {
            fetchRecents() {
                return Store.fetchRecents().then(recents => this.recents = recents);
            }
        },
        created() {
            this.fetchRecents().then(() => EventBus.$on('recents-updated', this.fetchRecents));
        }
    }
</script>
