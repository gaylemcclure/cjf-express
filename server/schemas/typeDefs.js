const typeDefs = `

  type User {
    _id: ID
    first: String!
    last: String!
    email: String!
  }

  type EmailResponse {
    responseMsg: String
  }

  type Query {
    users: [User]
  }

  type Mutation {

    sendContactConfirmation(senderEmail: String, senderName: String, message: String) : EmailResponse

    }
`;

module.exports = typeDefs;
