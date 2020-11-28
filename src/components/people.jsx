import React, {useState } from "react";
import { usePaginatedQuery } from "react-query";
import Person from './person';

const fetchPeople = async (key, url) => {
  const response = await fetch(url);
  return response.json();
};

const People = () => {
  const [page, setPage] = useState(1);
  // api endpoint
  const url = `https://swapi.dev/api/people/?page=${page}`;
  const { resolvedData, latestData, status} = usePaginatedQuery(["People", url], fetchPeople);

  const previousPage = () => {
    setPage(oldValue => Math.max(oldValue - 1, 1));
  }

  const nextPage = () => {
    setPage(oldValue => (!latestData || !latestData.next) ? oldValue: oldValue + 1);
  }

  return (
    <div>
      <h1>People</h1>
      { status === 'loading' && (<div>Loading data...</div>)}
      { status === 'error' && (<div>Error fetching data</div>)}
      { status === 'success' && (
        <React.Fragment>
          <button
            onClick={() => previousPage()}
            disabled={page === 1}
          >Previous page</button>
          <span>{page}</span>
          <button
            onClick={() => nextPage()}
            disabled={!latestData || !latestData.next}
          >Next page</button>
          <div>{ resolvedData.results.map(person  => <Person key={person.name} person={person}/>)}</div>
        </React.Fragment>
      )}
    </div>
  );
};

export default People;
