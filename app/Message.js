"use strict"

var util = require('util');
var EventEmitter = require('events').EventEmitter;

class Message extends EventEmitter{
    constructor(){
        super()
        this.count = 0
    }

    notifyAllObservers(){
        this.count += 1
        this.emit('register', this.count, 'RABBITS');
    }
}

module.exports = Message
