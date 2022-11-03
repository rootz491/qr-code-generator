import React from "react";
import { useState, useEffect } from "react";
import { Typography } from '@mui/material';

function Jobs() {
  const [clientInfos, setClientInfos] = useState([]);

  useEffect(() => {
    const fetchClientInfos = localStorage.getItem("clientInfos") ?? [];
    setClientInfos(JSON.parse(fetchClientInfos));
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        gap: "50px",
        // alignItems: "center",
      }}
    >
      <div
        style={{
          border: "1px solid red",
          height: "100%",
          width: "15%",
          display: "flex",
          gap: "10px",
          alignItems: "flex-start",
        }}
      ></div>
      {clientInfos.length > 0 ? (
        clientInfos.map((client, index) => (
          // lists of all jobcards
          <div
            key={index}
            style={{
              margin: "5px 0px",
              border: "2px dotted #a1b0cc",
              padding: "10px",
              height: "max-content",
              width: "15%",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              // alignItems: "center",
            }}
          >
            <Typography variant="h4" fontWeight={600}>
              {client.jobtitle}
            </Typography>
            <Typography variant="h5" fontWeight={500}>
              {client.fullname}
            </Typography>
            <span>{client.experience}</span>
            <a href={`http://localhost:3001/${client.id}`}>Visit profile</a>
          </div>
        ))
      ) : (
        <h1>No jobs applicants available</h1>
      )}
    </div>
  );
}

export default Jobs;
