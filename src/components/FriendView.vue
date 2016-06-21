<template>
    <div v-link="{ name: 'chatByUser', params: { username: friend.username } }" class="list-group-item withripple">
        <img :src="friend.avatar" class="img-circle" @click.stop="showUser(friend.username)">
        <span class="name">{{ friend.alias || friend.nickname }}</span>
    </div>
</template>

<style scoped lang="less">
    @import "../material-colors";

    .list-group-item {
        display: flex;
        height: 56px;
        padding: 8px 16px;
        align-items: center;
        cursor: pointer;
        transition: background ease 0.2s;
    }
    .list-group-item.v-link-active {
        background: rgba(0, 0, 0, 0.06);
    }

    .img-circle {
        width: 40px;
        height: 40px;
        cursor: pointer;
    }

    .name {
        margin-left: 16px;
        font-size: 16px;
    }
</style>

<script>
    import EventBus from '../eventbus'

    export default{
        props: ['friend'],
        methods: {
            showUser(username) {
                EventBus.$emit('show-user', username);
            }
        }
    }
</script>
