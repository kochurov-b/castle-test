import { gql } from '@apollo/react-hooks';

export const UPDATE_REMINDER = gql`
  mutation updateReminder($id: ID!, $input: Input!) {
    updateReminder(id: $id, input: $input) {
      id
      title
      date
      complete
    }
  }
`;
