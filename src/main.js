'use strict';

require('material-design-lite/dist/material.blue-yellow.min.css');
require('material-design-lite/material.min.js');
require('material-design-icons/iconfont/material-icons.css');

import Vue from 'vue';
import VueRouter from 'vue-router'
import VueMdl from 'vue-mdl';

import App from './App';

import UserView from './components/UserView'

Vue.use(VueRouter);
Vue.use(VueMdl);

const router = new VueRouter({
    abstract: true
});
router.map({
    '/user/:username': {
        name: 'user',
        component: UserView
    }
});

import Store from './store';
import Api from './api';

window.Store = Store;
window.Api = Api;

router.start(App, 'body');

