import { SearchMovie } from "interfaces/Movie";
import React, { FC, useCallback, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Header } from "./header";
import { MovieList, RecommendedMoveList } from "./movie-list";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<SearchMovie | null>(null);

  const handleSearchTermChange = useCallback<(v: string) => void>((value) => {
    console.log('change')
    setSelectedMovie(null);
    setSearchTerm(value);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Header
          searchTerm={searchTerm}
          selectedMovie={selectedMovie}
          onSearchTermChange={handleSearchTermChange}
        />
        {selectedMovie ? (
          <RecommendedMoveList id={selectedMovie.id} onSelect={setSelectedMovie} />
        ) : (
          <MovieList searchTerm={searchTerm} onSelect={setSelectedMovie} />
        )}
      </div>
    </QueryClientProvider>
  );
};

export default App;
