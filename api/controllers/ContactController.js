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
    var params = req.params.all();

    if (!params.name) {
      req.flash('error', 'Please provide your name.');
      return res.redirect('/contact');
    }

    if (!params.email) {
      req.flash('error', 'Please provide your email.');
      return res.redirect('/contact');
    }

    if (!params.message) {
      req.flash('error', 'Please provide a message.');
      return res.redirect('/contact');
    }

		var options = {
			subject: 'Contact Form',
			message: params.message,
			from: params.name + ' <' + params.email + '>',
			to: sails.config.mail.to
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
