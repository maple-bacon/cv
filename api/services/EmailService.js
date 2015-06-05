var q = require('q'),
    path = require('path'),
    juice = require('juice'),
    nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport(sails.config.mail.smtp);

function send(view, options, locals, callback) {
  var html, text;
  var deferred = q.defer();

  if (typeof(callback) !== "function") {
    callback = function() {};
  }

  options = options || {};
  locals = locals || {};

  async.parallel({
    html: function(cb){
      sails.renderView('/email/' + view + '.html', locals, function (error, html) {
        if (error) return cb(error);
        juice.juiceResources(html, { url: 'file://' + sails.config.appPath }, cb);
      });
    },
    text: function(cb) {
      sails.renderView('/email/' + view + '.text', locals, cb);
    }
  }, done );

  function done (error, content) {
    if (error) {
      deferred.reject(error);
      return callback(error);
    }

    // var options = {
    //   from: sails.config.mail.from,
    //   to: 'murphy.mark@live.ca',//user.email,
    //   subject: 'Welcome',
    //   html: content.html,
    //   text: content.text
    // };

    options.html = content.html;
    options.text = content.text;

    transporter.sendMail(options, function(error, info) {
      if (error) {
        sails.log(error);
        deferred.reject(error);
      } else {
        sails.log('Message sent: ' + info.response);
        deferred.resolve(info);
      }

      callback(error, info);
    });
  }

  return deferred.promise;
}

module.exports = {
  deliver: send
}
