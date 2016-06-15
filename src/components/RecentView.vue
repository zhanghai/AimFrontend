<template>
    <div v-link="{ name: 'chat', params: { chatId: recent.chat._id } }" class="list-group-item withripple">
        <img :src="avatar" class="img-circle">
        <div>
            <span class="name">{{ name }}</span>
            <span class="message">{{ message }}</span>
        </div>
        <span v-if="unreadCount > 0" class="badge">{{ unreadCount }}</span>
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
        flex-shrink: 0;
        width: 40px;
        height: 40px;
    }

    .list-group-item > div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 16px;
    }

    .name {
        font-size: 16px;
    }

    .message {
        color: @md-dark-secondary;
    }

    .badge {
        flex-shrink: 0;
        margin-left: auto;
        background-color: @md-red-500;
    }
</style>

<script>
    import Store from '../store'

    export default {
        props: ['recent'],
        data() {
            return {
                state: Store.state
            };
        },
        computed: {
            avatar() {
                //noinspection BadExpressionStatementJS
                this.state.user._id;
                const avatars = this.recent.chat.members
                        .filter(member => member.user._id !== this.state.user._id)
                        .map(member => member.user.avatar);
                // HACK: Use the last one.
                return avatars[avatars.length - 1];
            },
            name() {
                //noinspection BadExpressionStatementJS
                this.state.user._id;
                return this.recent.chat.name || this.recent.chat.members
                        .filter(member => member.user._id !== this.state.user._id)
                        .map(member => member.user.alias ? member.user.alias : member.user.nickname)
                        .join('，');
            },
            message() {
                return this.recent.chat.messages[this.recent.chat.messages.length - 1].text;
            },
            unreadCount() {
                //noinspection BadExpressionStatementJS
                this.state.user._id;
                const member = this.recent.chat.members.find(member => member.user._id === this.state.user._id);
                if (member && member.lastReadAt) {
                    return this.recent.chat.messages.filter(message => message.createdAt > member.lastReadAt).length;
                }
                return this.recent.chat.messages.length;
            }
        },
        created() {
            Store.fetchRecents().then(recents => this.recents = recents);
        }
    }
</script>
