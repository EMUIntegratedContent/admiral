"use strict"

var util = require('util');
var EventEmitter = require('events').EventEmitter;

class MessageObserver extends EventEmitter{
    constructor(){
        super()
        this.count = 0
    }

    registerObserver(){
        this.count += 1
        this.emit('register', this.count, 'RABBITS');
    }
}

module.exports = MessageObserver
