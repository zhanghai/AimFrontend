<template>
    <div class="mdl-list">
        <div v-for="friend of state.friends" class="mdl-list__item">
            <span class="mdl-list__item-primary-content">
                <img :src="friend.avatar" class="mdl-list__item-avatar">
                <span>{{ friend.alias || friend.nickname }}</span>
            </span>
        </div>
    </div>
</template>

<style scoped lang="less">
    @import "../material-colors";
    @import "../utils";

    .item {
        height: 56px;
    }

    .avatar {
        .center-vertical;
        width: 40px;
        height: 40px;
        margin-left: 16px;
        border: 1px solid @md-dark-divider;
        border-radius: 50%;
    }

    .name {
       .center-vertical;
       .single-line;
        margin-left: 16px;
    }
</style>

<script>
    import Store from '../store'

    export default {
        data() {
            return {
                state: Store.state
            };
        }
    }
</script>
