export interface Movie {
  id: number;
  original_title: string;
  external_ids: ExternalIds;
}

export interface ExternalIds {
  imdb_id: string;
}

export interface SearchMovies {
  results: SearchMovie[];
}

export interface SearchMovie {
  id: number;
  title: string;
  overview: string;
  original_title: string;
  vote_average?: number;
}


