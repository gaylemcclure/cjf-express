import { gql } from "@apollo/client";

export const CONTACT_CONFIRMATION = gql`
  mutation sendContactConfirmation($senderEmail: String, $senderName: String, $message: String) {
    sendContactConfirmation(senderEmail: $senderEmail, senderName: $senderName, message: $message) {
      responseMsg
    }
  }
`;
// export const CONTACT_NOTIFICATION = gql`
//   mutation sendContactNotification($email: String!, $senderEmail: String, $projectId: ID, $projectName: String, $first: String, $last: String) {
//     sendContactNotification(email: $email, senderEmail: $senderEmail, projectId: $projectId, projectName: $projectName, first: $first, last: $last) {
//       responseMsg
//     }
//   }
// `;
