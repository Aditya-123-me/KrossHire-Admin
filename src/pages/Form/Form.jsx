import React, { useEffect, useState } from "react";
import axios from "../../components/Hooks/axios";
import Loading from "../../components/Hooks/Loading";
import "./Form.module.scss"; // or Form.module.scss

function Form() {
  const [loading, setLoading] = useState(true);
  const [quotes, setQuotes] = useState([]);
  const [error, setError] = useState("");

  const fetchQuotes = () => {
    setLoading(true);
    setError("");

    axios
      .get("/quote")
      .then(({ data }) => {
        if (data.status) {
          setQuotes(data.data);
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
    } catch {
      alert("Failed to delete quote");
    }
  };

  if (loading) return <Loading />;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="quotesWrapper">
      <div className="header">
        <h2>Quotes</h2>
        <button className="refreshBtn" onClick={fetchQuotes}>
          Refresh
        </button>
      </div>

      {quotes.length === 0 ? (
        <p>No quotes found</p>
      ) : (
        <div className="quotesGrid">
          {quotes.map((item) => (
            <div className="quoteCard" key={item._id}>
              <div className="cardTop">
                <h4>{item.name}</h4>
                <button
                  className="deleteBtn"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </div>

              <p><b>Email:</b> {item.email}</p>
              <p><b>Phone:</b> {item.phone}</p>
              <p><b>Budget:</b> {item.budget}</p>

              <small>
                {new Date(item.createdAt).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Form;
