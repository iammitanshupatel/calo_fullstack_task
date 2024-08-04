const JOBS_FILE = "./src/jobs.json";
const fs = require("fs");

const readJobs = () => {
  const data = fs.readFileSync(JOBS_FILE);
  return JSON.parse(data);
};

const writeJobs = (jobs) => {
  fs.writeFileSync(JOBS_FILE, JSON.stringify(jobs, null, 2));
};

module.exports = { readJobs, writeJobs };
