const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");

module.exports = {
  //New contact form submissions
  contactFormEmail: async function (senderEmail, senderName, message) {
    const readHTMLFile = function (path, callback) {
      fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
        if (err) {
          callback(err);
        } else {
          callback(null, html);
        }
      });
    };
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: "website@castlemainejazzfestival.com.au", // Your email address
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.WEBSITE_REFRESH_TOKEN,
      },
    });
    try {
      await transporter.verify();
      readHTMLFile(__dirname + "/newEmailTemplate.html", function (err, html) {
        if (err) {
          console.log("error reading file", err);
          return;
        }
        const template = handlebars.compile(html);
        const emailSub = "New contact form submission.";
        const replacements = {
          userEmail: senderEmail,
          senderName: senderName,
          message: message,
        };
        const htmlToSend = template(replacements);
        const mailOptions = {
          from: "CJF Website Contact Form<website@castlemainejazzfestival.com.au>",
          to: "committee@castlemainejazzfestival.com.au",
          // to: "gaylekdennison@gmail.com",
          subject: emailSub,
          html: htmlToSend,
          replyTo: senderEmail,
        };
        transporter.sendMail(mailOptions, function (error, response) {
          if (error) {
            console.log(error);
          }
        });
      });
    } catch (error) {
      console.error(error);
    }
  },
  membershipConfirmationMember: async function (senderEmail, senderName, firstParagraph, from, fromName, signoff, subjectLine, year) {
    const readHTMLFile = function (path, callback) {
      fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
        if (err) {
          callback(err);
        } else {
          callback(null, html);
        }
      });
    };
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: "website@castlemainejazzfestival.com.au", // Your email address
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.WEBSITE_REFRESH_TOKEN,
      },
    });
    try {
      await transporter.verify();
      readHTMLFile(__dirname + "/memberTemplate.html", function (err, html) {
        if (err) {
          console.log("error reading file", err);
          return;
        }
        const template = handlebars.compile(html);
        const emailSub = subjectLine;
        const replacements = {
          userEmail: senderEmail,
          senderName: senderName,
          firstParagraph: firstParagraph,
          fromName: fromName,
          from: from,
          signoff: signoff,
          subjectLine: subjectLine,
          year: year,
        };
        const htmlToSend = template(replacements);
        const mailOptions = {
          from: "CJF Membership Form<website@castlemainejazzfestival.com.au>",
          to: senderEmail,
          subject: emailSub,
          html: htmlToSend,
          replyTo: senderEmail,
        };
        transporter.sendMail(mailOptions, function (error, response) {
          if (error) {
            console.log(error);
          }
        });
      });
    } catch (error) {
      console.error(error);
    }
  },
  membershipConfirmationCJF: async function (senderEmail, senderName, year) {
    const readHTMLFile = function (path, callback) {
      fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
        if (err) {
          callback(err);
        } else {
          callback(null, html);
        }
      });
    };
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: "website@castlemainejazzfestival.com.au", // Your email address
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.WEBSITE_REFRESH_TOKEN,
      },
    });
    try {
      await transporter.verify();
      readHTMLFile(__dirname + "/memberTemplateCJF.html", function (err, html) {
        if (err) {
          console.log("error reading file", err);
          return;
        }
        const template = handlebars.compile(html);
        const emailSub = "New membership submission.";
        const replacements = {
          userEmail: senderEmail,
          senderName: senderName,
          year: year,
        };
        const htmlToSend = template(replacements);
        const mailOptions = {
          from: "CJF Website Member Form<website@castlemainejazzfestival.com.au>",
          // to: "committee@castlemainejazzfestival.com.au",
          to: "gaylekdennison@gmail.com",
          subject: emailSub,
          html: htmlToSend,
          replyTo: senderEmail,
        };
        transporter.sendMail(mailOptions, function (error, response) {
          if (error) {
            console.log(error);
          }
        });
      });
    } catch (error) {
      console.error(error);
    }
  },
};
