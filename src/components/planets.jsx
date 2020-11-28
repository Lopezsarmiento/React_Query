import React, {useState} from "react";
import { useQuery } from "react-query";
import Planet from "./planet";

const fetchPlanets = async (key, url) => {
  const response = await fetch(url);
  return response.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);
  // api endpoint
  const url = `https://swapi.dev/api/planets/?page=${page}`;
  const queryOps = { 
    staleTime: 5000,
    cacheTime: 10, 
    onSuccess: () => console.log('data fetched successfully')
  }
  // useQuery([key, ..args], function, ops);
  const { data, status } = useQuery(["planets", url], fetchPlanets, queryOps);

  return (
    <div>
      <h1>Planets</h1>
      <button onClick={() => setPage(1)}>PAGE 1</button>
      <button onClick={() => setPage(2)}>PAGE 2</button>
      <button onClick={() => setPage(3)}>PAGE 3</button>
      { status === 'loading' && (<div>Loading data...</div>)}
      { status === 'error' && (<div>Error fetching data</div>)}
      { status === 'success' && (
        <div>{ data.results.map(planet  => <Planet key={planet.name} planet={planet}/>)}</div>
      )}
    </div>
  );
};

export default Planets;
