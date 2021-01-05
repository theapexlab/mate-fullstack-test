import React, { FC, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Header } from "./header";
import { MovieList } from "./movie-list";

const queryClient = new QueryClient();

const App: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Header searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
        <MovieList searchTerm={searchTerm} />
      </div>
    </QueryClientProvider>
  );
};

export default App;
