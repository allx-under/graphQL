import { gql } from "@apollo/client";

export const GET_MOVIES = gql`
  query Movies {
    movies {
      id
      name
      genre
      watched
      director {
        name
      }
    }
  }
`;

export const UPDATE_WATCHED_MOVIE = gql`
  mutation UpdateWatched($id: ID, $watched: Boolean) {
    updateMovie(id: $id, watched: $watched) {
      id
      name
      genre
      watched
      director {
        name
      }
    }
  }
`;

export const ADD_MOVIE = gql`
  mutation AddMovie(
    $name: String!
    $genre: String!
    $directorId: ID
    $watched: Boolean
  ) {
    addMovie(
      name: $name
      genre: $genre
      directorId: $directorId
      watched: $watched
    ) {
      id
      name
      genre
      watched
      director {
        name
      }
    }
  }
`;

export const UPDATE_MOVIE = gql`
  mutation UpdateMovie(
    $id: ID
    $name: String
    $genre: String
    $directorId: ID
  ) {
    updateMovie(id: $id, name: $name, genre: $genre, directorId: $directorId) {
      id
      name
      genre
      watched
      director {
        name
      }
    }
  }
`;

export const DELETE_MOVIE = gql`
  mutation DeleteMovie($id: ID) {
    deleteMovie(id: $id) {
      name
      id
    }
  }
`;
