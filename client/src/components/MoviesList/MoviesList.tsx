import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Typography,
  Modal,
  Box,
  IconButton,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useMutation, useQuery } from "@apollo/client";
import {
  DELETE_MOVIE,
  GET_MOVIES,
  UPDATE_WATCHED_MOVIE,
} from "../../apollo/movies";
import Spinner from "../Spinner/Spinner";
import { useEffect, useState } from "react";
import EditForm from "../MovieForm/MovieForm";

export interface MovieType {
  name: string;
  director: {
    id: string;
    name: string;
    age: number;
  };
  genre: string;
  id: string;
  watched: boolean;
}

export default function MoviesList() {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState<MovieType | null>(null);

  const { data, error, loading, refetch } = useQuery(GET_MOVIES);
  const [updateMovie, { error: updateError }] =
    useMutation(UPDATE_WATCHED_MOVIE);
  const [deleteMovie, { error: deleteError }] = useMutation(DELETE_MOVIE, {
    update(cache, { data: { deleteMovie } }) {
      cache.modify({
        fields: {
          movies(currentMovies = []) {
            return currentMovies.filter(
              (movie: { __ref: string }) =>
                movie.__ref !== `Movie:${deleteMovie.id}`
            );
          },
        },
      });
    },
  });

  const handleOpen = (data: MovieType) => {
    setModalData(data);
    setOpen(true);
  };

  const handleClose = () => {
    setModalData(null);
    setOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteMovie({
      variables: { id },
    });
  };

  const handleToggle = (id: string, watched: boolean) => () => {
    updateMovie({
      variables: {
        id,
        watched: !watched,
      },
    });
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) {
    return <Spinner />;
  }

  if (error || updateError || deleteError) {
    return <h2>There is an error during downloading...</h2>;
  }

  return (
    <TableContainer
      sx={{
        backgroundColor: "rgba(255,255,255,0.8)",
        borderRadius: "10px",
        mt: "20px",
        maxHeight: "600px",
      }}
    >
      <Table
        sx={{ minWidth: 700, position: "relative" }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow
            sx={{
              position: "sticky",
              top: 0,
              backgroundColor: "#f1f1f1",
              width: "100%",
              zIndex: "10",
            }}
          >
            <TableCell>
              <Typography variant="h6" component="p">
                Movie
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6" component="p">
                Genre
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6" component="p">
                Director
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6" component="p">
                Watched
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6" component="p">
                Actions
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.movies.map((item: MovieType) => (
            <TableRow key={item.id} sx={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="right">{item.genre}</TableCell>
              <TableCell align="right">{item.director?.name}</TableCell>
              <TableCell align="right">
                <Checkbox
                  edge="start"
                  checked={item.watched}
                  tabIndex={-1}
                  onClick={handleToggle(item.id, item.watched)}
                />
              </TableCell>
              <TableCell align="right">
                <IconButton
                  aria-label="add movie"
                  size="medium"
                  sx={{
                    color: "white",
                  }}
                  onClick={() => handleOpen(item)}
                >
                  <EditIcon fontSize="inherit" />
                </IconButton>
                <IconButton
                  aria-label="add movie"
                  size="medium"
                  color="error"
                  onClick={() => handleDelete(item.id)}
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "rgba(255,255,255,0.9)",
            boxShadow: 24,
            borderRadius: "10px",
            p: 5,
          }}
        >
          {modalData !== null ? (
            <EditForm movie={modalData} close={handleClose} />
          ) : (
            <EditForm close={handleClose} />
          )}
        </Box>
      </Modal>
      <IconButton
        aria-label="add movie"
        sx={{
          position: "absolute",
          bottom: "30px",
          right: "30px",
          color: "white",
        }}
        onClick={() => setOpen(true)}
      >
        <AddCircleIcon sx={{ fontSize: 40 }} />
      </IconButton>
    </TableContainer>
  );
}
