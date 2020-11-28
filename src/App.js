import React, { useState } from "react";
import Navbar from "./components/navbar";
import Planets from "./components/planets";
import People from "./components/people";
import { ReactQueryDevtools, reactQueryDevTools } from "react-query-devtools";

function App() {
  const [page, setPage] = useState("planets");
  return (
    <React.Fragment>
      <div className="App">
        <h1>Star wars info</h1>
        <Navbar setPage={setPage}></Navbar>
        <div className="content">
          {page === "planets" ? <Planets /> : <People />}
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </React.Fragment>
  );
}

export default App;
