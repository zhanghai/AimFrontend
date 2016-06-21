<template>
    <div class="list-group-item withripple"  @click.stop="showUser(user.username)">
        <img :src="user.avatar" class="img-circle">
        <span class="name">{{ user.alias || user.nickname }}</span>
    </div>
</template>

<style scoped lang="less">
    @import "../material-colors";

    .list-group-item {
        display: flex;
        height: 56px;
        padding: 8px 16px;
        align-items: center;
        border-bottom: solid @md-dark-divider 1px !important;
        cursor: pointer;
        transition: background ease 0.2s;
    }
    .list-group-item.v-link-active {
        background: rgba(0, 0, 0, 0.06);
    }

    .img-circle {
        flex-shrink: 0;
        width: 40px;
        height: 40px;
    }

    .name {
        margin-left: 16px;
        font-size: 16px;
    }
</style>

<script>
    import EventBus from '../eventbus'

    export default{
        props: ['user'],
        methods: {
            showUser(username) {
                EventBus.$emit('show-user', username);
            }
        }
    }
</script>
