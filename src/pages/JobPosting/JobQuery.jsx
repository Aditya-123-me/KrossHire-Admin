import { useEffect, useState } from "react";
import axios from "../../components/Hooks/axios";
import styles from "./JobQuery.module.scss";

export default function JobQuery() {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const res = await axios.get("/applicant/all");
      setApplicants(res.data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteApplicant = async (id) => {
    if (!window.confirm("Delete this applicant?")) return;

    try {
      await axios.delete(`/applicant/delete/${id}`);
      setApplicants((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.AdmissionForms}>
      <h1>Job Applications</h1>
      <h4>All applicants list</h4>

      <div className={styles.paymentHistory}>
        {/* HEADER */}
        <div className={styles.subHeading}>
          <div className={styles.userId}>ID</div>
          <div className={styles.Title}>Name</div>
          <div className={styles.Description}>Email</div>
          <div className={styles.Skills}>Skills</div>
          {/* <div className={styles.Actions}>Actions</div> */}
          <div className={styles.Actions}>Resume</div>
          <div className={styles.Actions}>Delete</div>
        </div>

        {/* CARDS */}
        <div className={styles.supportCards}>
          {applicants.length === 0 ? (
            <p>No applicants found</p>
          ) : (
            applicants.map((a, index) => (
              <div key={a._id} className={styles.ApplicationCard}>
                <div className={styles.userId}>
                  <p>{index + 1}</p>
                </div>

                <div className={styles.Title}>
                  <p>{a.name}</p>
                </div>

                <div className={styles.Description}>
                  <p>{a.email}</p>
                </div>

                <div className={styles.Skills}>
                  <p>{a.skills}</p>
                </div>

                <div className={styles.Actions}>
                  {a.resumeUrl && (
                    <>
                      {/* <p>
                        <a
                          href={a.resumeUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View
                        </a>
                      </p> */}
                      <p>
                        <a
                          href={a.resumeUrl}
                          download={`${a.name}_Resume.pdf`}
                        >
                          Download
                        </a>
                      </p>
                    </>
                  )}
                  <p onClick={() => deleteApplicant(a._id)} className={styles.delete}>Delete</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
