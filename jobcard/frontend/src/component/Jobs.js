import React from "react";
import { useState, useEffect } from "react";

function Jobs() {
  const [clientInfos, setClientInfos] = useState([]);

  useEffect(() => {
    const fetchClientInfos = localStorage.getItem("clientInfos") ?? [];
    setClientInfos(JSON.parse(fetchClientInfos));
  }, []);

  return (
    <div
      style={{
        display: "grid",
        placeContent: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      {clientInfos.length > 0 ? (
        clientInfos.map((client, index) => (
          // lists of all jobcards
          <div key={index}>
            <h1>{client.title}</h1>
            <h3>{client.fullname}</h3>
            <p>{client.description}</p>
            <a href={`http://localhost:3000/${client.id}`}>Visit profile</a>
          </div> 
        ))
      ) : (
        <h1>No jobs applicants available</h1>
      )}
    </div>
  );
}

export default Jobs;
