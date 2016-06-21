<template>
    <div class="list-group">
        <div v-for="group of groups">
            <div class="tag">{{ group.tag }}</div>
            <friend-view v-for="friend of group.friends" track-by="_id" :friend="friend"></friend-view>
        </div>
    </div>
</template>

<style scoped lang="less">
    @import "../material-colors";

    .list-group {
        margin: 0;
    }

    .tag {
        height: 48px;
        padding: 0 16px;
        border-top: solid @md-dark-divider 1px;
        color: @md-dark-secondary;
        font-size: 14px;
        line-height: 48px;
    }
    .tag:first-child {
        border: none;
    }
</style>

<script>
    import FriendView from './FriendView'

    import EventBus from '../eventbus'
    import Store from '../store'

    export default {
        data() {
            return {
                friends: [{
                    tags: []
                }]
            };
        },
        computed: {
            groups() {
                const groups = [];
                for (const friend of this.friends) {
                    if (friend.tags.length) {
                        for (const tag of friend.tags) {
                            const group = groups.find(group => group.tag === tag);
                            if (!group) {
                                groups.push({
                                    tag,
                                    friends: [friend]
                                })
                            } else {
                                group.friends.push(friend);
                            }
                        }
                    } else {
                        const tag = '未分类';
                        const group = groups.find(group => group.tag === tag);
                        if (!group) {
                            groups.push({
                                tag,
                                friends: [friend]
                            })
                        } else {
                            group.friends.push(friend);
                        }
                    }
                }
                groups.sort((group1, group2) => group1.tag - group2.tag);
                return groups;
            }
        },
        methods: {
            fetchFriends() {
                return Store.fetchFriends().then(friends => this.friends = friends);
            }
        },
        created() {
            this.fetchFriends()
                .then(() => EventBus.$on('friends-updated', this.fetchFriends));
        },
        components: {
            FriendView
        }
    }
</script>
