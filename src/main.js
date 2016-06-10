'use strict';

require('material-design-lite/material.min.css');
require('material-design-lite/material.min.js');

import Vue from 'vue';
import VueMdl from 'vue-mdl';
import App from './App';

Vue.use(VueMdl);

new Vue({
    el: 'body',
    components: { App }
});

import Store from './store';
import Api from './api';

window.Store = Store;
window.Api = Api;
