import React, { useEffect, useState } from "react";

import { useRaidJobs } from "../contexts/raidJobsContext.tsx";
import jobCard from "../components/jobCard";
import { CardContainer } from "../components/containers";

//TODO Update/Delete for Jobs
const Jobs = () => {
  const { jobs } = useRaidJobs();
  // const [loading, setLoading] = useState(true);
  // const [showHistory, setShowHistory] = useState(false);
  // const [editing, setEditing] = useState(false);
  // const [updating, setUpdating] = useState(0);
  const [jobData, setJobData] = useState([]);

  useEffect(() => {
    if (jobs !== undefined) {
      const getJobs = async () => {
        const localJobs = [];
        const jobCount = await jobs.methods.jobCount().call();

        for (var i = 0; i < jobCount; i++) {
          const singleJob = await jobs.methods.jobs(i).call();
          localJobs.push(singleJob);
        }

        return localJobs;
      };

      getJobs().then((localJobData) => {
        setJobData(localJobData);
      });
    }
  }, [jobs]);

  const headers = [
    "ID",
    "Timestamp",
    "Owner",
    "Title",
    "Description",
    "Active workers",
    "Edit",
  ];

  const renderTableData = () => {
    return jobData.map((eachJob, index) => {
      return jobCard(eachJob);
    });
  };

  const editJob = (id) => {
    console.log(`Edit for job ${id}`);
  };

  const renderTableHeader = () => {
    return headers.map((label, index) => {
      return <th key={label}>{label.toUpperCase()}</th>;
    });
  };

  return (
    <div>
      <header className="App-header">
        <h1 id="title">Jobs overview</h1>
        <CardContainer>{renderTableData()}</CardContainer>

        <div className="paddedDiv" />
      </header>
    </div>
  );
};

export default Jobs;
