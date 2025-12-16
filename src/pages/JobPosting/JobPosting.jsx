import React, { useEffect, useState } from "react";
import axiosInstance from "../../components/Hooks/axios";
import styles from "./JobPosting.module.scss";
import { useNavigate } from "react-router-dom";

function JobPosting() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axiosInstance.get("/jobfull/all");
        setJobs(response.data.data);
      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // DELETE JOB
  const deleteJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await axiosInstance.delete(`/jobfull/delete/${id}`);

      // Remove from UI
      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (err) {
      console.error("Delete Error:", err);
      alert("Failed to delete job");
    }
  };

  // EDIT JOB
  const editJob = (id) => {
    alert("Redirect to Edit Page: /admin/job/edit/" + id);
    // OR open modal
    // OR navigate using next/router
  };

  if (loading) return <p className={styles.centerText}>Loading jobs...</p>;
  if (error) return <p className={styles.errorText}>{error}</p>;

  return (
    <div className={styles.container}>
      <div className={styles.job}>
        <h1 className={styles.title}>Manage Job Postings</h1>
        <button onClick={() => navigate("/add-job")}>
          Add Jobs
        </button>
      </div>

      {jobs.length === 0 ? (
        <p>No job postings found.</p>
      ) : (
        <div className={styles.jobGrid}>
          {jobs.map((job) => (
            <div key={job._id} className={styles.jobCard}>
              <h2 className={styles.jobTitle}>{job.title}</h2>
              <p className={styles.company}>{job.company}</p>
              <p className={styles.location}>{job.location}</p>

              {/* ✅ FIXED SALARY RENDERING (NO REMOVALS) */}
              <p className={styles.salary}>
                {job.salary?.currency} {job.salary?.amount} / {job.salary?.type}
              </p>

              <div className={styles.actions}>
                <button
                  className={styles.editBtn}
                  onClick={() => editJob(job._id)}
                >
                  Edit
                </button>

                <button
                  className={styles.deleteBtn}
                  onClick={() => deleteJob(job._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JobPosting;
