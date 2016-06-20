<template>
    <div class="container">
        <div class="well">
            <form class="form-horizontal" @submit.prevent="logIn">
                <fieldset>
                    <legend>登录</legend>
                    <div v-show="showError" class="alert alert-dismissible alert-danger">
                        <button type="button" class="close" @click="showError = false">×</button>
                        <p>用户名或密码错误</p>
                    </div>
                    <div class="form-group label-floating" style="margin: 14px 0 0 0">
                        <label for="username" class="control-label" style="padding-top: initial">用户名</label>
                        <input id="username" required pattern="[0-9A-Za-z]{1,16}" title="1-16 位英文字母或数字" class="form-control" v-model="username">
                    </div>
                    <div class="form-group label-floating" style="margin: 14px 0 14px 0">
                        <label for="password" class="control-label" style="padding-top: initial">密码</label>
                        <input id="password" required type="password" class="form-control" v-model="password">
                    </div>
                    <input type="submit" value="登录" class="btn btn-raised btn-primary col-xs-12">
                    <a href="/register" class="btn btn-primary pull-right">没有账户？现在注册</a>
                </fieldset>
            </form>
        </div>
    </div>
</template>

<style scoped lang="less">
    .container {
        display: flex;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        align-items: center;
        justify-content: center;
    }
    .well {
        width: 480px;
    }
</style>

<script>
    import EventBus from '../eventbus'

    export default{
        data() {
            return {
                username: "",
                password: "",
                showError: false
            };
        },
        methods: {
            logIn() {
                Store.login(this.username, this.password)
                        .then(() => EventBus.$emit('show-login', false))
                        .catch(() => this.showError = true);
            }
        }
    }
</script>
