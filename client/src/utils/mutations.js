import { gql } from "@apollo/client";

export const CONTACT_CONFIRMATION = gql`
  mutation sendContactConfirmation($senderEmail: String, $senderName: String, $message: String) {
    sendContactConfirmation(senderEmail: $senderEmail, senderName: $senderName, message: $message) {
      responseMsg
    }
  }
`;

export const MEMBER_CONFIRMATION = gql`
  mutation sendMembershipConfirmationMember(
    $senderEmail: String
    $senderName: String
    $firstParagraph: String
    $from: String
    $fromName: String
    $signoff: String
    $subjectLine: String
    $year: Int
  ) {
    sendMembershipConfirmationMember(
      senderEmail: $senderEmail
      senderName: $senderName
      firstParagraph: $firstParagraph
      from: $from
      fromName: $fromName
      signoff: $signoff
      subjectLine: $subjectLine
      year: $year
    ) {
      responseMsg
    }
  }
`;

export const MEMBER_CONFIRMATION_CJF = gql`
  mutation sendMembershipConfirmationCJF($senderEmail: String, $senderName: String, $year: Int) {
    sendMembershipConfirmationCJF(senderEmail: $senderEmail, senderName: $senderName, year: $year) {
      responseMsg
    }
  }
`;
