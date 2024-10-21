import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query users($username: String!) {
    users {
      _id
      first
      last
      email
    }
  }
`;
