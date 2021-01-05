import axios from "axios";
import { WikiPage, WikiQuery } from "interfaces/Wiki";
import { useQuery } from "react-query";

const wikiApi = axios.create({
  baseURL: "https://en.wikipedia.org",
  params: {
    origin: "*",
    action: "query",
    formatversion: 2,
    format: "json",
    prop: "extracts",
    explaintext: true,
    exintro: true,
  },
});

const useMovieWiki = (titles: string) => {
  return useQuery(
    ["movies", { titles, wiki: true }],
    () => {
      return wikiApi
        .get<{ query: WikiQuery }>("/w/api.php", { params: { titles } })
        .then<WikiPage | null>(({ data }) => {
          const [page] = data.query.pages;
          if (!page || page.missing) {
            return null;
          }
          return page;
        });
    },
    { retry: false }
  );
};

export default useMovieWiki;
