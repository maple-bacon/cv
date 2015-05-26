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
		var options = {
			subject: 'Contact Form',
			message: req.params['message'],
			from: req.params['name'] + ' <' + req.params['email'] + '>',
			to: 'jason.lee.taylor@me.com'
		};

		var locals = {
			name: req.params['name'],
			email: req.params['email'],
			message: req.params['message']
		};

		EmailService.deliver("contact", options, locals, function (error, info) {
			
		});

    return res.json({
      todo: 'send() is not implemented yet!'
    });
  }
};
