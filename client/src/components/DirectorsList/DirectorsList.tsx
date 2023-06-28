import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Modal,
  Box,
  IconButton,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useMutation, useQuery } from "@apollo/client";

import Spinner from "../Spinner/Spinner";
import { useEffect, useState } from "react";
import { MovieType } from "../MoviesList/MoviesList";
import { DELETE_DIRECTOR, GET_DIRECTORS } from "../../apollo/directors";
import DirectorForm from "../DirectorForm/DirectorForm";

export interface DirectorType {
  id: string;
  name: string;
  age: string;
  movies: MovieType[] | [];
}

export default function DirectorsList() {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState<DirectorType | null>(null);

  const { data, loading, error, refetch } = useQuery(GET_DIRECTORS);
  const [deleteDirector] = useMutation(DELETE_DIRECTOR, {
    update(cache, { data: { deleteDirector } }) {
      cache.modify({
        fields: {
          directors(currDirectors = []) {
            return currDirectors.filter(
              (director: { __ref: string }) =>
                director.__ref !== `Director:${deleteDirector.id}`
            );
          },
        },
      });
    },
  });

  const handleOpen = (data: DirectorType) => {
    setModalData(data);
    setOpen(true);
  };

  const handleClose = () => {
    setModalData(null);
    setOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteDirector({
      variables: {
        id,
      },
    });
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
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
                Name
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6" component="p">
                Age
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6" component="p">
                Movies
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
          {data.directors.map((item: DirectorType) => (
            <TableRow key={item.id} sx={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="right">{item.age}</TableCell>
              <TableCell align="right">
                {item.movies.length
                  ? item.movies.map((movie) => movie.name).join(", ")
                  : "There is no added movies"}
              </TableCell>
              <TableCell align="right">
                <IconButton
                  aria-label="add director"
                  size="medium"
                  sx={{
                    color: "white",
                  }}
                  onClick={() => handleOpen(item)}
                >
                  <EditIcon fontSize="inherit" />
                </IconButton>
                <IconButton
                  aria-label="delete director"
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
            <DirectorForm director={modalData} close={handleClose} />
          ) : (
            <DirectorForm close={handleClose} />
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
