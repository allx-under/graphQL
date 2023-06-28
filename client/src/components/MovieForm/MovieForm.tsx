import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { MovieType } from "../MoviesList/MoviesList";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_DIRECTORS_NAME } from "../../apollo/directors";
import { ADD_MOVIE, GET_MOVIES, UPDATE_MOVIE } from "../../apollo/movies";

interface EditFormProps {
  movie?: MovieType;
  close: () => void;
}

export default function EditForm({ movie, close }: EditFormProps) {
  const [movieName, setMovieName] = useState("");
  const [genre, setGenre] = useState("");
  const [director, setDirector] = useState("");

  const { data } = useQuery(GET_DIRECTORS_NAME);
  const [updateMovie] = useMutation(UPDATE_MOVIE);
  const [addMovie] = useMutation(ADD_MOVIE, {
    update(cache, { data: { addMovie } }) {
      const { movies } = cache.readQuery<{ movies: MovieType[] | [] }>({
        query: GET_MOVIES,
      }) ?? { movies: [] };

      cache.writeQuery({
        query: GET_MOVIES,
        data: { movies: [...movies, addMovie] },
      });
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (movie) {
      updateMovie({
        variables: {
          id: movie?.id,
          name: movieName,
          genre,
          directorId:
            data.directors[
              data.directors.findIndex(
                (item: { id: string; name: string }) => item.name === director
              )
            ].id,
        },
      });
    } else {
      addMovie({
        variables: {
          name: movieName,
          genre,
          watched: false,
          directorId:
            data.directors[
              data.directors.findIndex(
                (item: { id: string; name: string }) => item.name === director
              )
            ].id,
        },
      });
    }

    close();
    // Clear form fields
    setMovieName("");
    setGenre("");
    setDirector("");
  };

  useEffect(() => {
    if (movie) {
      setMovieName(movie.name);
      setGenre(movie.genre);
      if (movie.director?.name) {
        setDirector(movie.director.name);
      } else setDirector("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" component="h2" mb="10px" textAlign="center">
        {movie ? "Edit movie data" : "Add movie"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Movie"
              variant="outlined"
              fullWidth
              required
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Genre"
              variant="outlined"
              fullWidth
              required
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel id="director-label">Director</InputLabel>
            <Select
              labelId="director-label"
              id="director-select"
              fullWidth
              required
              value={director}
              onChange={(e) => setDirector(e.target.value as string)}
            >
              {data?.directors?.map(
                (director: { id: string; name: string }) => (
                  <MenuItem key={director.id} value={director.name}>
                    {director.name}
                  </MenuItem>
                )
              )}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth type="submit" variant="contained" color="primary">
              {movie ? "Update movie" : "Add movie"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
