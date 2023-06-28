import { gql } from "@apollo/client";

export const GET_DIRECTORS = gql`
  query getDirectors {
    directors {
      name
      id
      age
      movies {
        id
        name
      }
    }
  }
`;

export const GET_DIRECTORS_NAME = gql`
  query getDirectors {
    directors {
      name
      id
    }
  }
`;

export const UPDATE_DIRECTOR = gql`
  mutation UpdateDirector($id: ID, $name: String, $age: Int) {
    updateDirector(id: $id, name: $name, age: $age) {
      id
      name
      age
    }
  }
`;

export const ADD_DIRECTOR = gql`
  mutation AddDirector($name: String!, $age: Int!) {
    addDirector(name: $name, age: $age) {
      id
      name
      age
      movies {
        name
      }
    }
  }
`;

export const DELETE_DIRECTOR = gql`
  mutation DeleteDirector($id: ID) {
    deleteDirector(id: $id) {
      name
      id
    }
  }
`;
