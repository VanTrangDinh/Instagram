'use strict';

const mongoose = require('mongoose');
const _SECONDS = 5000;
const os = require('os'); //Get CPU Cores Numbers
const process = require('process'); //get memory usage
//count connect
const countConnect = () => {
  const numConnection = mongoose.connections.length;
  console.log(`Number of connections:::[${numConnection}]`);
};

//check overload

const checkOverload = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length;
    const numCore = os.cpus().length; //Get CPU Cores Numbers
    const memoryUsage = process.memoryUsage().rss;
    //example maximun number of connections  based  on numbers of cores
    const maxConnections = numCore * 5
    console.log(`Active connectons:::[${numConnection}]`)
    console.log(`Memory usage:::[${memoryUsage / 1024 / 1024}] MB`)
    if(numConnection > maxConnections) {
        console.log('Conenction overload detected!')
    }
  }, _SECONDS);
}; // monitor every 5s

module.exports = {
  countConnect,
  checkOverload
};
