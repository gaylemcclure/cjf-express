const nodemailer = require("nodemailer");
const { contactFormEmail, membershipConfirmationCJF, membershipConfirmationMember } = require("../utils/emailHelper");

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
    sendMembershipConfirmationMember: async (parent, { senderEmail, senderName, firstParagraph, from, fromName, signoff, subjectLine, year }) => {
      const emailResponseMessage = await membershipConfirmationMember(
        senderEmail,
        senderName,
        firstParagraph,
        from,
        fromName,
        signoff,
        subjectLine,
        year
      );
      return emailResponseMessage;
    },
    sendMembershipConfirmationCJF: async (parent, { senderEmail, senderName, year }) => {
      const emailResponseMessage = await membershipConfirmationCJF(senderEmail, senderName, year);
      return emailResponseMessage;
    },
  },
};

module.exports = resolvers;
