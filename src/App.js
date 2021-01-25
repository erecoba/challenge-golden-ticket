import React from "react";
import PokeCard from "./components/PokeCard";
import "./styles.css";
import { mockPokemonData } from "./mock/pokeData";

export default function App() {
  return (
    <div className="App">
      <h1>Welcome to your second mini challenge!</h1>
      <PokeCard mockPokemonData={mockPokemonData} />
    </div>
  );
}
