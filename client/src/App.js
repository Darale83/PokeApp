import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import CreatePokemon from "./components/CreatePokemon/CreatePokemon";
import PokemonDetails from "./components/PokemonDetails/PokemonDetails";
import LandingPage from "./components/LandingPage/LandingPage";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllPokemons, getAllTypes } from "./redux/actions/index";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPokemons());
    dispatch(getAllTypes());
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path="/create" component={CreatePokemon} />
          <Route exact path="/pokemon/:id" component={PokemonDetails} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
