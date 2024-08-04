import React, { useState, useEffect } from "react";
import { createJob, getJobs, getJob } from "./api";

function App() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobs = await getJobs();
        setJobs(jobs);
      } catch (err) {
        setError("Failed to fetch jobs.");
      }
    };
    fetchJobs();
  }, []);

  const handleCreateJob = async () => {
    setLoading(true);
    try {
      const jobId = await createJob();
      const interval = setInterval(async () => {
        try {
          const job = await getJob(jobId);
          if (job.status === "resolved") {
            clearInterval(interval);
            setJobs((prevJobs) => [...prevJobs, job]);
            setLoading(false);
          }
        } catch (err) {
          clearInterval(interval);
          setError("Failed to fetch job status.");
          setLoading(false);
        }
      }, 5000);
    } catch (err) {
      setError("Failed to create job.");
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Jobs</h1>
      <button onClick={handleCreateJob} disabled={loading}>
        {loading ? "Creating Job..." : "Create Job"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {jobs?.map((job) => (
          <li key={job?.id}>
            {job?.status === "resolved" ? (
              <img src={job?.result} alt="Job result" width={200} />
            ) : (
              <span>
                Job {job?.id} is {job?.status}
              </span>
            )}
          </li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default App;
