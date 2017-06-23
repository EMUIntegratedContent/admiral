"use strict"

require('console-group').install()
var PubSub = require('./PublisherSubscriber')
var User   = require('./models/user')

/*
 * uses the PublisherSubscriber Class to notify other users when a message is sent.
 */
class UserMail{
  constructor(user) {
    this.pubsub = new PubSub();
    this.pubsub.subscribe('message', this.emitMessage, this);
    this.pubsub.subscribe('mailinfo', this.emitUserMailInfo, this);

    this.user = user
  }

  emitUserMailInfo(user){
    console.log('You have ' + user.id + 'unread messages.')
  }
  emitMessage(msg) {
    console.group('PubSub')
    console.log('user sent message!', msg);
    console.groupEnd();
  }

  sendMessage() {
    this.pubsub.publish('message', 'Hey, how are you?');
    this.pubsub.publish('mailinfo', this.user);
  }
}

module.exports = UserMail
