/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  // models: {
  //   connection: 'someMongodbServer'
  // },

  mail: {
    /**
     * NodeMailer SMTP configuration settings
     * See <https://github.com/andris9/nodemailer-smtp-transport#usage>
     */
     smtp: {
       host: 'smtp.sparkpostmail.com',
       port: 587,
       auth: {
         user: 'SMTP_Injection',
         pass: process.env.SPARKPOST_API_KEY
       }
    },

    defaultFromAdress: 'Jason Taylor <no-reply@jasontaylor.ca>',
    generalInqueriesAddress: 'Jason Taylor <jason.lee.taylor@me.com>'
  }

};
