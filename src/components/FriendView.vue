<template>
    <div v-link="{ name: 'chatByUser', params: { username: friend.username } }" class="list-group-item withripple">
        <img :src="friend.avatar" class="img-circle" @click.stop="showUser(friend.username)">
        <div>
            <span class="name">{{ friend.alias || friend.nickname }}</span>
            <span class="signature">{{ friend.signature || '（无签名）' }}</span>
        </div>
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

    .list-group-item > div {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        /* https://css-tricks.com/flexbox-truncated-text/ */
        min-width: 0;
        margin-left: 16px;
    }

    .name {
        font-size: 16px;
    }

    .signature {
        color: @md-dark-secondary;
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
