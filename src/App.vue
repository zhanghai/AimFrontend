<template>
    <main>
        <section class="left mdl-shadow--8dp">
            <home-view></home-view>
        </section>
        <section class="right mdl-shadow--8dp">
            <router-view></router-view>
        </section>
    </main>
</template>

<script>
import HomeView from './components/HomeView'

export default {
    replace: false,
    components: {
        HomeView
    }
}
</script>

<style>
html, body {
    width: 100%;
    height: 100%;
}

body {
    display: flex;
    background: url('assets/background.jpg') center / cover;
}

/* HACK: Fix width. */
.mdl-layout__container {
    position: relative !important;
}
</style>

<style scoped lang="less">
@import "material-colors";

main {
    display: flex;
    width: 960px;
    height: 90%;
    max-height: 720px;
    margin: auto;
}

section {
    width: 400px;
    height: 100%;
    margin: auto;
    background-color: @md-white;
}
</style>
