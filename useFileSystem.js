if (Meteor.isClient) {
  Template.tuto.explain = function () {
    return "Click on the button and then have a look at the log file on server";
  };

  Template.tuto.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined') {
        console.log("You pressed the button");
        Meteor.call('log', 'hey you clicked the button');
      }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
      var require = __meteor_bootstrap__.require; //to use npm require must be exposed.
      var fstream = require('fs');
        
      // Overloading
      String.prototype.pad = function(padchar, length, side){
        var padded = padchar.times(length);
        if (!side) {
            return (this.toString() + padchar.times(length)).slice(0, length);
        }
        return (padchar.times(length) + this.toString()).slice(-length);
      };
      String.prototype.times = function(times) {
         return (new Array(times + 1)).join(this);
      }
      
      console.toFile = function funcConsoleToFile(msg, mode, options) {
        var mode = mode || 'log',
            options = {path: './logs.log'} || options,
            logDir = './',
            date = new Date,
            dateLog = date.getFullYear() + '-' + new String(date.getMonth()).pad('0', 2, 1) + '-' 
                + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':'+date.getSeconds(),
            msg = '\n['+dateLog+'] ' + mode + ': ' + msg;

        fstream.appendFile(logDir + '\\myLog.log', msg);
        console[mode](msg);
      };

      console.toFile('test');
  });
  
  Meteor.methods({
    'log': function funcLog(data) {
        console.toFile(data);
    }
  });
}
