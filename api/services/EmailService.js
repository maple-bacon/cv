var q = require('q'),
    path = require('path'),
    juice = require('juice'),
    nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport(sails.config.mail.smtp);

function send(view, options, locals, callback) {
  var html, text;
  var callback = callback || function() {};
  var deferred = q.defer();

  options = options || {};
  locals = locals || {};

  async.parallel({
    html: function(cb){
      sails.renderView('/email/' + view + '.html', locals, function (error, html) {
        if (error) return cb(error);
        juice.juiceContent(html, { url: 'file://' + sails.config.appPath }, cb);
      });
    },
    text: function(cb){
      sails.renderView('/email/' + view + '.text', locals, cb);
    }
  }, done );

  function done (error, content) {
    if (error) return callback(error);

    // var options = {
    //   from: sails.config.mail.defaultFromAddress,
    //   to: 'murphy.mark@live.ca',//user.email,
    //   subject: 'Welcome',
    //   html: content.html,
    //   text: content.text
    // };

    options.html = content.html;
    options.text = content.text;

    var fail = fail || function() {},
        done = done || function() {};

    transporter.sendMail(options, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Message sent: ' + info.response);
      }

      callback(error, info);
    });
  }

  return deferred.promise;
}

module.exports = {
  deliver: send
}
