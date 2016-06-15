<template>
    <div class="list-group">
        <div v-for="friend of friends" track-by="_id" v-link="{ name: 'chatByUser', params: { username: friend.username } }" class="list-group-item withripple">
            <img :src="friend.avatar" class="img-circle">
            <span class="name">{{ friend.alias || friend.nickname }}</span>
        </div>
    </div>
</template>

<style scoped lang="less">
    @import "../material-colors";

    .list-group {
        margin: 0;
    }

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
    }

    .name {
        margin-left: 16px;
        font-size: 16px;
    }
</style>

<script>
    import Store from '../store'

    export default {
        data() {
            return {
                friends: []
            };
        },
        created() {
            Store.fetchFriends().then(friends => this.friends = friends);
        }
    }
</script>
