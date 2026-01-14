import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import leftArrow from "../../assets/svg/leftArrow.svg";
import rightArrow from "../../assets/svg/rightArrow.svg";
import { dateFormat } from "../../components/Functions/Date";
import Loading from "../../components/Hooks/Loading";
import axios from "../../components/Hooks/axios";
import { useDeleteAlert } from "../../components/Hooks/useDeleteAlert";
import styles from "./InquiriesManager.module.scss";

function InquiriesManager() {
  const [selectedCategory, setSelectedCategory] = useState("contact");
  const [inquiries, setInquiries] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState({ totalCount: 0, totalPages: 1 });
  const [reload, setReload] = useState(0);
  const [loading, setLoading] = useState(true);
  const [viewModal, setViewModal] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`contact_hire/allContact_hire?type=${selectedCategory}`)
      .then(({ data }) => {
        setInquiries(data.data);
        setTotal({ totalCount: data.totalCount, totalPages: data.totalPages });
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, [page, reload, selectedCategory]);

  const handleDelete = async (id) => {
    const confirmed = await useDeleteAlert();
    if (!confirmed) return;

    axios
      .delete(`/contact_hire/delete/${id}`)
      .then(({ data }) => {
        toast.success("Successfully Deleted!");
        setReload(Math.random());
      })
      .catch((e) => console.log(e));
  };

  const filteredInquiries = inquiries.filter(
    (item) =>
      item.skills &&
      item.skills !== "notavailable" &&
      item.skills !== "ScheduleCall" &&
      item.skills !== "letsconnect"
  );

  return (
    <div className={styles.container}>

      <div className={styles.contentWrapper}>
        <div className={styles.tabs}>
          <button
            className={selectedCategory === "contact" ? styles.active : ""}
            onClick={() => {
              setSelectedCategory("contact");
              setPage(1);
            }}
          >
            Contact Forms
          </button>
          <button
            className={selectedCategory === "hire developer" ? styles.active : ""}
            onClick={() => {
              setSelectedCategory("hire developer");
              setPage(1);
            }}
          >
            Hire Developer
          </button>
          <button className={styles.refresh} onClick={() => setReload(Math.random())}>
            Refresh
          </button>
        </div>


        {loading ? (
          <div className={styles.loadingWrap}>
            <Loading height="8rem" width="8rem" />
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className={styles.empty}>No inquiries found</div>
        ) : (
          <div className={styles.grid}>
            {filteredInquiries.map((item, index) => (
              <div className={styles.card} key={item._id}>
                <div className={styles.cardTop}>
                  <span>#{index + 1}</span>
                  <span>{dateFormat(item?.createdAt)}</span>
                </div>
                <div className={styles.cardBody}>
                  <p><strong>Name:</strong> {item?.name || "N/A"}</p>
                  <p><strong>Email:</strong> {item?.email || "N/A"}</p>
                  <p><strong>Phone:</strong> {item?.phone || "N/A"}</p>
                  {item?.company && <p><strong>Company:</strong> {item.company}</p>}
                  {item?.skills && <p><strong>Requirement:</strong> {item.skills}</p>}
                </div>
                <div className={styles.cardActions}>
                  <button onClick={() => setViewModal(item)}>
                    <FaEye /> View
                  </button>
                  <button onClick={() => handleDelete(item._id)}>
                    <FaTrashAlt /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredInquiries.length > 0 && (
          
          <div className={styles.pagination}>
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              {page > 1 && "<"} 
            </button>
            <span>Page {page} of {total.totalPages}</span>
            <button disabled={page === total.totalPages} onClick={() => setPage(page + 1)}>
              {page < total.totalPages && ">"}
            </button>
            
        <div className={styles.stats}>
          <span>Total: {total.totalCount}</span>
          <span>Page {page} of {total.totalPages}</span>
        </div>
          </div>
        )}
      </div>

      {viewModal && (
        <div className={styles.modalOverlay} onClick={() => setViewModal(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Inquiry Details</h2>
              <button onClick={() => setViewModal(null)}>×</button>
            </div>
            <div className={styles.modalBody}>
              <p><strong>Name:</strong> {viewModal.name}</p>
              <p><strong>Email:</strong> {viewModal.email}</p>
              <p><strong>Phone:</strong> {viewModal.phone}</p>
              {viewModal.company && <p><strong>Company:</strong> {viewModal.company}</p>}
              {viewModal.skills && <p><strong>Requirement:</strong> {viewModal.skills}</p>}
              {viewModal.writeSomething && (
                <div className={styles.message}>
                  <strong>Message:</strong>
                  <p>{viewModal.writeSomething}</p>
                </div>
              )}
              <p><strong>Submitted:</strong> {dateFormat(viewModal.createdAt)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InquiriesManager;