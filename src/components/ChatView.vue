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
</style>

<script>
    import Store from '../store'

    export default {
        data() {
            return {
                chat: {},
                state: Store.state
            };
        },
        computed: {
            title() {
                return this.chat.members.filter(member => member.user._id === this.state.user._id).join(', ');
            }
        }
    }
</script>
