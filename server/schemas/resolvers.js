const nodemailer = require("nodemailer");
const { contactFormEmail } = require("../utils/emailHelper");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
  },

  Mutation: {
    //Email mutations
    sendContactConfirmation: async (parent, { senderEmail, senderName, message }) => {
      const emailResponseMessage = await contactFormEmail(senderEmail, senderName, message);
      return emailResponseMessage;
    },
  },
};

module.exports = resolvers;
