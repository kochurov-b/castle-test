import { gql } from '@apollo/react-hooks';

export const CREATE_REMINDER = gql`
  mutation createReminder($input: Input!) {
    createReminder(input: $input) {
      id
      title
      date
      complete
    }
  }
`;
