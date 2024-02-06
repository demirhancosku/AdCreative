import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int, $name: String) {
    characters(page: $page, filter: { name: $name }) {
      info {
        count
      }
      results {
        id, name, image, episode { id }
      }
    }
  }
`;