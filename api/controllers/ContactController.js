// var q = require('q'),
//     path = require('path'),
//     juice = require('juice'),
//     nodemailer = require('nodemailer');

/**
 * ContactController
 *
 * @description :: Server-side logic for managing contacts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  /**
   * `ContactController.send()`
   */
  send: function (req, res) {
    // req.params['message'] = "Hello";
    // req.params['name'] = "Mark";
    // req.params['email'] = "murphy.mark@live.ca";

		var options = {
			subject: 'Contact Form',
			message: req.params['message'],
			from: req.params['name'] + ' <' + req.params['email'] + '>',
			to: 'murphy.mark@live.ca'
		};

		var locals = {
			name: req.params['name'],
			email: req.params['email'],
			message: req.params['message']
		};

		var promise = EmailService.deliver("contact", options, locals);

    promise.done(function (info) {
      return res.send('send() complete!');
		});

    promise.fail(function (info) {
      return res.send('send() failed!');
		});
  }
};
