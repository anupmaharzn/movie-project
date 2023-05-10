import { useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchDataFromApi } from "./utils/api";
import { getApiConfiguration, getGenres } from "./store/homeSlice";
import { useDispatch } from "react-redux";
import * as RouteList from "./routes";
import Header from "./layouts/header/Header";
import Footer from "./layouts/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/pageNotFound";
// import Spinner from "./components/spinner/Spinner";
// const Home = lazy(() => import("./pages/home/Home"));
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchGeners();
    fetchApiConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //fetch configuration and save in store
  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    });
  };
  //fetch all tv and movie geners and save in store(getGeners)
  const fetchGeners = async () => {
    let promises = [];
    let endpoints = ["tv", "movie"];
    let allGeners = {};

    endpoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });
    const data = await Promise.all(promises);

    data.map(({ genres }) => {
      return genres.map((item) => (allGeners[item.id] = item));
    });
    dispatch(getGenres(allGeners));
  };

  return (
    <BrowserRouter>
      <Header />
      {/* <Suspense fallback={<Spinner initial={true} />}> */}
      <Routes>
        <Route path={RouteList.HOME_PAGE} element={<Home />} />
        <Route path={RouteList.DETAILS_PAGE} element={<Details />} />
        <Route path={RouteList.SEARCH_RESULT_PAGE} element={<SearchResult />} />
        <Route path={RouteList.EXPLORE_PAGE} element={<Explore />} />
        <Route path={RouteList.PAGE_NOT_FOUND} element={<PageNotFound />} />
      </Routes>
      {/* </Suspense> */}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
