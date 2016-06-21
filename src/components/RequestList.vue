<template>
    <div class="page">
        <header class="navbar navbar-default">
            <span class="navbar-brand">好友请求</span>
        </header>
        <main class="list-group">
            <request-view v-for="request of requests" track-by="_id" :request="request"></request-view>
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

    main {
        flex-grow: 1;
        overflow-y: auto;
    }
</style>

<script>
    import Vue from 'vue';

    import RequestView from './RequestView'

    import EventBus from '../eventbus'
    import Store from '../store'

    export default {
        data() {
            return {
                requests: []
            };
        },
        methods: {
            fetchRequests() {
                return Store.fetchRequests().then(requests => this.requests = requests);
            }
        },
        created() {
            this.fetchRequests()
                    .then(() => EventBus.$on('requests-updated', this.fetchRequests));
        },
        components: {
            RequestView
        },
        route: {
            data(transition) {
                return {
                    requests: Store.fetchRequests()
                };
            }
        }
    }
</script>
