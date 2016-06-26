'use strict';

require('material-design-icons/iconfont/material-icons.css');
require('bootstrap/dist/css/bootstrap.min.css');
require('./bootstrap-material-design/bootstrap-material-design.min.css');
require('./bootstrap-material-design/ripples.min.css');
require('snackbarjs/dist/snackbar.min.css');

require('arrive');
require('bootstrap/dist/js/bootstrap.min.js');
require('./bootstrap-material-design/material.min.js');
require('./bootstrap-material-design/ripples.min.js');
require('snackbarjs/dist/snackbar.min.js');

$(function () {
    $.material.init();
});

import Vue from 'vue';
import VueRouter from 'vue-router'
import moment from 'moment';
import VueMomemnt from 'vue-moment';

import App from './App';

import EmptyView from './components/EmptyView'
import ChatView from './components/ChatView'
import RequestList from './components/RequestList'

Vue.use(VueRouter);

const router = new VueRouter({
    abstract: true
});
router.map({
    '/': {
        name: 'empty',
        component: EmptyView
    },
    '/requests': {
        name: 'requests',
        component: RequestList
    },
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
        nextDay: 'YYYY-MM-DD HH:mm',
        lastWeek: 'YYYY-MM-DD HH:mm',
        nextWeek: 'YYYY-MM-DD HH:mm',
        sameElse: 'YYYY-MM-DD HH:mm'
    }
});
Vue.use(VueMomemnt);

import Store from './store';
import Api from './api';

window.Store = Store;
window.Api = Api;

router.start(App, 'body');
