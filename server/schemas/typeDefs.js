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
    sendMembershipConfirmationMember(    
    senderEmail: String
    senderName: String
    firstParagraph: String
    from: String
    fromName: String
    signoff: String
    subjectLine: String
    year: Int
    ) : EmailResponse
    sendMembershipConfirmationCJF(senderEmail: String, senderName: String, year: Int) : EmailResponse
    }
`;

module.exports = typeDefs;
