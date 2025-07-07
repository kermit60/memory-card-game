import { useState, useEffect } from 'react'

import './App.css'
import ScoreBoard from './ScoreBoard';
import Card from './Card';

interface PokemonData {
  name: string;
  url: string;
}

function App() {

  const [scoreboard, setScore] = useState(0);
  const [pokemons, setData] = useState<PokemonData[] |[]>([]);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=8&offset=${Math.random() * 250}`)
    .then(response => response.json())
    .then(data => {
      getPokemonData(data.results)
      return data.results
    });
  }, [])

  // shuffles order of pokemons displayed
  const shuffle = (array: PokemonData[]): PokemonData[] => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

      // swap elements array[i] and array[j]
      // we use "destructuring assignment" syntax to achieve that
      // same can be written as:
      // let t = array[i]; array[i] = array[j]; array[j] = t
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // shuffles the pokemon order and increment score
  const clickEvent = () => {
    setData(shuffle([...pokemons]));
    setScore(scoreboard + 1);
  }

  const getPokemonData = async ( pokemonsList: PokemonData[] ) => {
    const newArr: PokemonData[] = [];
    for (const {name, url} of pokemonsList) {
      const response = await fetch(`${url}`);
      const json = await response.json();

      // getting only the useful data
      const sprite = json["sprites"]["front_default"];
      newArr.push({name, url: sprite});
    }
    console.log(newArr);
    setData(newArr);
  }

  return (
    <>
      <h1>Memory Card game</h1>
      <ScoreBoard score={scoreboard}/>
      <div className='layout'>
        {
          pokemons.map((pokemon) => {
            return <Card 
              onClick={clickEvent} 
              key={pokemon.url} 
              name={pokemon.name}
              url={pokemon.url}
            />
          })
        }
      </div>
      
    </> 
  )
}

export default App
