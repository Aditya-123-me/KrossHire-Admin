import React, { useEffect, useState } from "react";
import axios from "../../components/Hooks/axios";
import Loading from "../../components/Hooks/Loading";
import styles from "./Form.module.scss";

function Form() {
  const [loading, setLoading] = useState(true);
  const [quotes, setQuotes] = useState([]);
  const [error, setError] = useState("");
  const [selectedQuote, setSelectedQuote] = useState(null);

  const fetchQuotes = () => {
    setLoading(true);
    setError("");

    axios
      .get("/quote")
      .then(({ data }) => {
        if (data.status) {
          setQuotes(data.data);
          console.log(data.data)
        } else {
          setError("Failed to fetch quotes");
        }
      })
      .catch(() => setError("Something went wrong"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this quote?")) return;

    try {
      await axios.delete(`/quote/${id}`);
      setQuotes((prev) => prev.filter((q) => q._id !== id));
      setSelectedQuote(null);
    } catch {
      alert("Failed to delete quote");
    }
  };

  const openModal = (quote) => {
    setSelectedQuote(quote);
  };

  const closeModal = () => {
    setSelectedQuote(null);
  };

  // Format phone number with country code
  const formatPhone = (quote) => {
    if (!quote) return 'N/A';
    const countryCode = quote.countryCode || '';
    const phone = quote.phone || '';
    return countryCode && phone ? `${countryCode} ${phone}` : phone || 'N/A';
  };

  if (loading) return <Loading />;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.quotesWrapper}>
      <div className={styles.header}>
        <h2>Quotes ({quotes.length})</h2>
        <button className={styles.refreshBtn} onClick={fetchQuotes}>
          Refresh
        </button>
      </div>

      {quotes.length === 0 ? (
        <p>No quotes found</p>
      ) : (
        <div className={styles.quotesGrid}>
          {quotes.map((item) => (
            <div 
              className={styles.quoteCard} 
              key={item._id}
            >
              <div className={styles.cardTop}>
                <h4>{item.name}</h4>
              </div>

              <p><b>Email:</b> {item.email}</p>
              <p><b>Budget:</b> {item.budget || 'Not specified'}</p>
              
              <small>
                {new Date(item.createdAt).toLocaleString()}
              </small>

              <div onClick={() => openModal(item)} className={styles.view}>
                View More 
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Popup */}
      {selectedQuote && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>{selectedQuote.name}</h3>
              <button className={styles.closeBtn} onClick={closeModal}>
                ×
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.infoRow}>
                <span className={styles.label}>Email:</span>
                <span>{selectedQuote.email}</span>
              </div>

              <div className={styles.infoRow}>
                <span className={styles.label}>Phone:</span>
                <span>{formatPhone(selectedQuote)}</span>
              </div>

              {selectedQuote.country && (
                <div className={styles.infoRow}>
                  <span className={styles.label}>Country:</span>
                  <span>{selectedQuote.country}</span>
                </div>
              )}

              <div className={styles.infoRow}>
                <span className={styles.label}>Budget:</span>
                <span>{selectedQuote.budget || 'Not specified'}</span>
              </div>

              {selectedQuote.achieve && (
                <div className={styles.section}>
                  <h4>What are you trying to achieve?</h4>
                  <p>{selectedQuote.achieve}</p>
                </div>
              )}

              {selectedQuote.description && (
                <div className={styles.section}>
                  <h4>What are you looking for?</h4>
                  <p>{selectedQuote.description}</p>
                </div>
              )}

              <div className={styles.timestamp}>
                <small>Submitted on: {new Date(selectedQuote.createdAt).toLocaleString()}</small>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button 
                className={styles.deleteModalBtn}
                onClick={() => handleDelete(selectedQuote._id)}
              >
                Delete Quote
              </button>
              <button className={styles.cancelBtn} onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Form;