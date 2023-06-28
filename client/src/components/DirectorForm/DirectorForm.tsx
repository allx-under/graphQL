import { TextField, Button, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import {
  ADD_DIRECTOR,
  GET_DIRECTORS,
  UPDATE_DIRECTOR,
} from "../../apollo/directors";
import { DirectorType } from "../DirectorsList/DirectorsList";

interface EditFormProps {
  director?: DirectorType;
  close: () => void;
}

export default function DirectorForm({ director, close }: EditFormProps) {
  const [directorName, setDirectorName] = useState("");
  const [age, setAge] = useState("");

  const [updateDirector] = useMutation(UPDATE_DIRECTOR);
  const [createDirector] = useMutation(ADD_DIRECTOR, {
    update(cache, { data: { addDirector } }) {
      const { directors } = cache.readQuery<{ directors: DirectorType[] | [] }>(
        {
          query: GET_DIRECTORS,
        }
      ) ?? { directors: [] };

      cache.writeQuery({
        query: GET_DIRECTORS,
        data: { directors: [...directors, addDirector] },
      });
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (director) {
      updateDirector({
        variables: {
          id: director?.id,
          name: directorName,
          age: Number(age),
        },
      });
    } else {
      createDirector({
        variables: {
          name: directorName,
          age: Number(age),
        },
      });
    }
    close();
    setDirectorName("");
    setAge("");
  };

  useEffect(() => {
    if (director) {
      setDirectorName(director.name);
      setAge(director.age);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" component="h2" mb="10px" textAlign="center">
        {director ? "Edit director data" : "Add director"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Director"
              variant="outlined"
              fullWidth
              required
              value={directorName}
              onChange={(e) => setDirectorName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Age"
              variant="outlined"
              fullWidth
              required
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <Button fullWidth type="submit" variant="contained" color="primary">
              {director ? "Update director data" : "Add director"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
