import React, { useState } from "react";
import MainContainer from "./components/MainContainer/MainContainer";
import Header from "./components/Header/Header";
import MoviesList from "./components/MoviesList/MoviesList";
import DirectorsList from "./components/DirectorsList/DirectorsList";

function App() {
  const [showMovies, setShowMovies] = useState(true);
  return (
    <MainContainer>
      <Header showMovies={setShowMovies} />
      {showMovies ? <MoviesList /> : <DirectorsList />}
    </MainContainer>
  );
}

export default App;
