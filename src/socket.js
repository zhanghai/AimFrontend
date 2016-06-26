const io = require('socket.io-client');

const isDebugEnvironment = process.env.NODE_ENV === 'development';

export default isDebugEnvironment ? io('localhost:3000') : io();
