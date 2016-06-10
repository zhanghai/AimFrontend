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

    .mdl-list__item {
        padding: 8px 16px;
        cursor: pointer;
        &:active {
            background: @md-dark-divider;
        }
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
