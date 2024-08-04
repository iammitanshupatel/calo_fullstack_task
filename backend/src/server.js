require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { addJob, fetchJobs, fetchJob } = require("./controllers");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/jobs", addJob);

app.get("/jobs", fetchJobs);

app.get("/jobs/:id", fetchJob);

const PORT = 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
