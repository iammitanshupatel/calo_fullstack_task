const { readJobs, writeJobs } = require("../services");
const { v4: uuidv4 } = require("uuid");
const { getRandomFoodImage } = require("../utilities");

const addJob = async (req, res) => {
  try {
    const jobs = readJobs();
    const newJob = {
      id: uuidv4(),
      status: "pending",
      result: null,
    };
    jobs.push(newJob);
    writeJobs(jobs);
    setTimeout(async () => {
      newJob.result = await getRandomFoodImage();
      newJob.status = "resolved";
      writeJobs(jobs);
    }, Math.floor(Math.random() * (300000 - 5000 + 1)) + 5000);

    res.status(201).json({ id: newJob.id });
  } catch (error) {
    res.status(500).json({ error: "Failed to create job" });
  }
};

const fetchJobs = (req, res) => {
  try {
    const jobs = readJobs();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

const fetchJob = (req, res) => {
  try {
    const jobId = req.params.id;
    const jobs = readJobs();
    const job = jobs.find((j) => j.id === jobId);

    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ error: "Job not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch job" });
  }
};

module.exports = { addJob, fetchJobs, fetchJob };
