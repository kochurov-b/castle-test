import { gql } from '@apollo/react-hooks';

export const GET_REMINDERS = gql`
  query reminders {
    reminders {
      id
      title
      date
      complete
    }
  }
`;
