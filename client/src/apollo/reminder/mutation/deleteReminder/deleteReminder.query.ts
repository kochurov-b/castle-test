import { gql } from '@apollo/react-hooks';

export const DELETE_REMINDER = gql`
  mutation deleteReminder($id: ID!) {
    deleteReminder(id: $id) {
      id
      title
      date
      complete
    }
  }
`;
