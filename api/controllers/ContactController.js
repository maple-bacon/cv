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
    var params = req.params.all();

		var options = {
			subject: 'Contact Form',
			message: params.message,
			from: params.name + ' <' + params.email + '>',
			to: sails.config.mail.generalInqueriesAddress
		};

		var locals = {
			name: req.param('name'),
			email: req.param('email'),
			message: req.param('message')
		};

		var promise = EmailService.deliver("contact", options, locals);

    promise.done(function (info) {
      req.flash('success', 'Your message has been sent.');
      return res.redirect('/contact');
		});

    promise.fail(function (error) {
      req.flash('error', 'Failed to send message.');
      return res.redirect('/contact');
		});
  }
};
