import React from "react";
import { useState, useEffect } from "react";
import JobCard from "./JobCardComponent";

function Jobs() {
  const [clientInfos, setClientInfos] = useState([]);

  useEffect(() => {
    const fetchClientInfos = localStorage.getItem("clientInfos") ?? [];
    setClientInfos(JSON.parse(fetchClientInfos));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        minHeight: "auto",
        gap: "176px",
        flexWrap: "wrap",
        padding: "120px 0",
        marginLeft: "90px",
      }}
    >
      {clientInfos.length > 0 ? (
        clientInfos.map((client, index) => (
          // lists of all jobcards
          <div key={index} style={{ minHeight: "60vh" }}>
            <JobCard formState={client} />
          </div>
        ))
      ) : (
        <h1>No jobs applicants available</h1>
      )}
    </div>
  );
}

export default Jobs;
