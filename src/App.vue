<template>
    <main>
        <section class="left">
            <home></home>
        </section>
        <section class="right"></section>
    </main>
</template>

<script>
import Home from './components/Home'

export default {
    components: {
        Home
    }
}
</script>

<style>
html, body {
    width: 100%;
    height: 100%;
}
</style>

<style scoped lang="less">
main {
    width: 100%;
    height: 100%;
}

section {
    &.left {
        width: 33.3333%;
    }
    &.right {
        width: 66.6667%;
    }
    height: 100%;
    display: inline-block;
    &.right {
        float: right;
    }
}
</style>
