<template>
    <div class="mdl-layout mdl-layout--no-drawer-button mdl-js-layout">
        <header class="mdl-layout__header mdl-layout__header--fixed">
            <div class="mdl-layout__header-row">
                <button v-show="false" class="mdl-button mdl-button--icon mdl-js-button mdl-layout-back">
                    <i class="material-icons">arrow_back</i>
                </button>
                <span class="mdl-layout-title">{{ title }}</span>
            </div>
        </header>
        <main class="mdl-layout__content">
            <div class="flex-grow">
                <div v-for="message of chat.messages">
                    <span>{{ message.text }}</span>
                </div>
            </div>
            <div class="display-flex align-items-center">
                <div class="mdl-textfield mdl-js-textfield flex-grow">
                    <textarea id="message" type="text" rows="3" class="mdl-textfield__input"></textarea>
                    <label for="message" class="mdl-textfield__label">发送消息…</label>
                </div>
                <button class="mdl-button mdl-js-button mdl-js-ripple"><i class="material-icons">send</i></button>
            </div>
        </main>
    </div>
</template>

<style scoped>
    @media screen and (min-width: 1024px) {
        .mdl-layout__header-row {
            padding-left: 16px !important;
        }
    }
    .mdl-layout__header {
        display: flex;
    }
    .mdl-layout-back {
        margin-right: 16px;
    }
    .mdl-layout__content {
        display: flex;
        flex-direction: column;
    }
    .mdl-textfield {
        padding: 8px 0;
    }
    .display-flex {
        display: flex;
    }
    .align-items-center {
        align-items: center;
    }
    .flex-grow {
        flex-grow: 1;
    }
</style>

<script>
    import Store from '../store'

    export default {
        data() {
            return {
                chat: null,
                state: Store.state
            };
        },
        computed: {
            title() {
                return this.chat ?
                        this.chat.members
                            .filter(member => member.user._id !== this.state.user._id)
                            .map(member => member.user.alias ? member.user.alias : member.user.nickname)
                            .join(', ')
                        : "";
            }
        },
        route: {
            data(transition) {
                return {
                    chat: Store.fetchChatByUser(transition.to.params.username)
                };
            }
        }
    }
</script>
