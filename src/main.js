'use strict';

require('material-design-icons/iconfont/material-icons.css');
require('bootstrap/dist/css/bootstrap.min.css');
require('./bootstrap-material-design/bootstrap-material-design.min.css');
require('./bootstrap-material-design/ripples.min.css');

require('arrive');
require('bootstrap/dist/js/bootstrap.min.js');
require('./bootstrap-material-design/material.min.js');
require('./bootstrap-material-design/ripples.min.js');

$(function () {
    $.material.init();
});


import Vue from 'vue';
import VueRouter from 'vue-router'
import moment from 'moment';
import VueMomemnt from 'vue-moment';

import App from './App';

import ChatView from './components/ChatView'

Vue.use(VueRouter);

const router = new VueRouter({
    abstract: true
});
router.map({
    '/chats/:chatId': {
        name: 'chat',
        component: ChatView
    },
    '/chats/user/:username': {
        name: 'chatByUser',
        component: ChatView
    }
});

moment.updateLocale('zh-cn', {
    calendar: {
        lastDay: '[昨天] HH:mm',
        sameDay: 'HH:mm',
        sameElse: 'YYYY-MM-DD HH:mm'
    }
});
Vue.use(VueMomemnt);

import Store from './store';
import Api from './api';

window.Store = Store;
window.Api = Api;

router.start(App, 'body');
