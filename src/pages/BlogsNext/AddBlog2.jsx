import React, { useEffect, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { VscOpenPreview } from "react-icons/vsc";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FooterBG from "../../assets/images/FooterBG.webp";
import Loading from "../../components/Hooks/Loading";
import axios from "../../components/Hooks/axios";
import styles from "../Blogs/AddBlog.module.scss";
import ImageBox from "../Blogs/ImageBox";
import PreviewBlog from "../Blogs/PreviewBlog";
import TagSelector from "../Blogs/TagSelector";
import TextBox from "../Blogs/TextBox";

const AddBlog = () => {
  const navigate = useNavigate();
  const [bg, setBg] = useState("#ff621f");
  const [color, setColor] = useState("#ffffff");
  const inputRef = useRef();
  const [title, setTitle] = useState("");
  const [blogData, setBlogData] = useState([]);
  const [smallText, setSmallText] = useState("");
  const [activeAuthId, setActiveAuthId] = useState("");
  const [contentText, setContentText] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useSelector((state) => state.auth);
  const [selected, setSelected] = useState([]);
  const [openPreview, setOpenPreview] = useState(false);

  const [authData, setAuthData] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [titleIds, setTitleIds] = useState([]);

  const generateId = () => "_" + Math.random().toString(36).substr(2, 9);

  // Author Fetch
  useEffect(() => {
    axios
      .get(`/blog/allAuth`)
      .then(({ data }) => {
        setAuthData(data.data);
      })
      .catch(({ response }) => {
        console.log("Error => ", response);
      });
  }, []);

  const updateBoxData = (id, data) => {
    setBlogData((prev) => {
      const updated = [...prev];
      const index = updated.findIndex((d) => d.id === id);
      if (index > -1) {
        updated[index].data = data;
      } else {
        updated.push({ id, data });
      }
      return updated;
    });
  };

  // const removeBox = (id) => {

  //   setContentText((prev) => prev.filter((item) => item.id !== id));
  //   setBlogData((prev) => prev.filter((item) => item.id !== id));
  // };

  const removeBox = (id) => {
  setContentText((prev) => prev.filter((item) => item.id !== id));
  setBlogData((prev) => prev.filter((item) => item.id !== id));
  // Also remove from titleIds
  setTitleIds((prev) => prev.filter((item) => item.addedId !== id));
};

const handelAddTextBox = () => {
  const id = generateId();
  setContentText((prev) => [
    ...prev,
    {
      id,
      comp: (
        <TextBox
          key={id}
          id={id}
          updateBoxData={updateBoxData}
          removeBox={removeBox}
          type={"add"}
          handleUpdateTitleId={handleUpdateTitleId}  // Add this
        />
      ),
    },
  ]);
};

  const handelAddImageBox = () => {
    const id = generateId();
    setContentText((prev) => [
      ...prev,
      {
        id,
        comp: (
          <ImageBox
            key={id}
            id={id}
            updateBoxData={updateBoxData}
            removeBox={removeBox}
          />
        ),
      },
    ]);
  };

  const handleUpdateTitleId = (newTitle, newId) => {
  setTitleIds((prevTitleIds) => {
    const existingIndex = prevTitleIds.findIndex((item) => item.addedId === newId);
    
    if (existingIndex !== -1) {
      const updatedTitleIds = [...prevTitleIds];
      updatedTitleIds[existingIndex].title = newTitle;
      return updatedTitleIds;
    } else {
      return [...prevTitleIds, { title: newTitle, addedId: newId }];
    }
  });
};

  const handlePreview = () => {
    if (!title) return toast.error("Please add Title...");
    if (!smallText) return toast.error("Please add Small Text...");
    if (blogData.length === 0) return toast.warn("Add at least one content box");

    for (const item of blogData) {
      if (!item.data) return toast.warn("Unfilled content box detected!");
    }

    setOpenPreview(true);
  };

  const handelSubmit = () => {
    if (!title) return toast.error("Title is required");
    if (!smallText) return toast.error("Small Text is required");
    if (!activeAuthId) return toast.error("Select an author");
    if (blogData.length === 0) return toast.warn("Add at least one content box");

    for (const item of blogData) {
      if (!item.data) return toast.warn("Unfilled content box detected!");
    }

    const sanitizedTitle = title.replace(/(\r\n|\n|\r)/gm, " ").trim();
    const contentCombined = blogData.map((item) => item.data).join("\n\n");

    if (!contentCombined || contentCombined.trim() === "") {
      return toast.error("Content cannot be empty");
    }

    let scheduleTime = null;
    if (date && time) {
      scheduleTime = new Date(`${date}T${time}`);
      if (scheduleTime < Date.now()) {
        return toast.error("Scheduled time cannot be in the past");
      }
    }

    setIsLoading(true);

    console.log("📌 Title:", sanitizedTitle);
    console.log("📌 Small Text:", smallText);
    console.log("📌 Content:", contentCombined);
    console.log("📌 ImageFile state:", imageFile);
    console.log("📌 Selected tags:", selected);
    console.log("📌 AuthorId:", activeAuthId);
    console.log("📌 ScheduleTime:", scheduleTime);

    const hasFile = imageFile !== null;

    if (hasFile) {
      const formData = new FormData();
      formData.append("title", sanitizedTitle);
      formData.append("content", contentCombined);
      formData.append("smallText", smallText);
      formData.append("bgColor", bg);
      formData.append("textColor", color);
      formData.append(
        "tags",
        JSON.stringify(selected?.length ? selected : ["General"])
      );
      formData.append("language", language || "English");
      formData.append("authorId", activeAuthId);
      formData.append("isActive", "true");
      formData.append("image", imageFile);
      formData.append("titleIds", JSON.stringify(titleIds));
      if (scheduleTime) {
        formData.append("scheduleTime", scheduleTime.toISOString());
      }

      console.log("📤 Sending FormData with file:");
      for (let pair of formData.entries()) {
        console.log(pair[0] + ":", pair[1]);
      }

      axios
        .post(`/blog2/create`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          toast.success("Blog uploaded successfully!");
          navigate("/BlogNext");
        })
        .catch((err) => {
          console.log("❌ Submit Error:", err?.response?.data || err);
          toast.error(err?.response?.data?.msg || "Upload failed!");
        })
        .finally(() => setIsLoading(false));
    } else {
      const payload = {
        title: sanitizedTitle,
        content: contentCombined,
        smallText,
        bgColor: bg,
        textColor: color,
        tags: JSON.stringify(selected?.length ? selected : ["General"]),
        language: language || "English",
        authorId: activeAuthId,
        isActive: true,
        image: "",
        titleIds: titleIds,
      };

      if (scheduleTime) {
        payload.scheduleTime = scheduleTime.toISOString();
      }

      console.log("📤 Sending JSON payload:", payload);

      axios
        .post(`/blog2/create`, payload, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          toast.success("Blog uploaded successfully!");
          navigate("/blogs");
        })
        .catch((err) => {
          console.log("❌ Submit Error:", err?.response?.data || err);
          toast.error(err?.response?.data?.msg || "Upload failed!");
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <>
      {openPreview && (
        <PreviewBlog
          {...{
            setOpenPreview,
            title,
            smallText,
            selected,
            blogData,
            color,
            bg,
            imageFile,
          }}
        />
      )}

      <div className={styles.AddBlog}>
        <div className={styles.Top}>
          <h1>Add Blog</h1>
          <p onClick={handlePreview}>
            Preview <VscOpenPreview />
          </p>
        </div>

        <div
          className={styles.WrapperContainer}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.ImageWrapper} style={{ background: bg }}>
            <div className={styles.Left}>
              <textarea
                className={styles.MainTitle}
                placeholder="Add your title"
                style={{ color: color }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></textarea>

              <textarea
                placeholder="Add Small text"
                style={{ color: color }}
                value={smallText}
                className={styles.smallText}
                onChange={(e) => setSmallText(e.target.value)}
              ></textarea>

              <div className={styles.Section}>
                <div>
                  <label>Background Color:</label>
                  <input
                    type="color"
                    value={bg}
                    onChange={(e) => setBg(e.target.value)}
                  />
                </div>
                <div>
                  <label>Text Color:</label>
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className={styles.Right}>
              <img
                src={imageFile ? URL.createObjectURL(imageFile) : FooterBG}
                alt=""
              />
              <input
                type="file"
                ref={inputRef}
                onChange={(e) => {
                  const file = e.target.files[0];
                  console.log("📁 Selected file:", file);
                  setImageFile(file);
                }}
              />
              <button onClick={() => inputRef.current.click()}>
                <FaCamera />
              </button>
            </div>
          </div>

          <div className={styles.TagAuthor}>
            <div className={styles.TagWrapper}>
              <TagSelector
                onTagsChange={setSelected}
                existingTags={selected}
              />
            </div>

            <div className={styles.AuthSectionRight}>
              <h3>Select Author</h3>
              <select
                value={activeAuthId}
                onChange={(e) => setActiveAuthId(e.target.value)}
              >
                <option value="" disabled>
                  Select one author
                </option>
                {authData?.map((data, index) => (
                  <option value={data._id} key={index}>
                    {data?.authorName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.DateTime}>
            <h3>Schedule Blog (Optional)</h3>
            <div>
              <label htmlFor="date">Select Date:</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <label htmlFor="time" className={styles.Label1}>
                Select Time:
              </label>
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.ContentWrapper}>
            <div className={styles.HeaderSection}>
              <div className={styles.Buttons}>
                <button onClick={handelAddTextBox}>Add Text Box</button>
                <button onClick={handelAddImageBox}>Add Image Box</button>
              </div>
            </div>

            <div className={styles.BodySection}>
              <div className={styles.LeftBoxes}>
                {contentText.map((data) => data.comp)}
              </div>

               <div className={styles.RightIdCon}>
    <h3>Scroll title and id's</h3>
    <div className={styles.TitleIds}>
      {titleIds?.map((data, index) => (
        <div className={styles.TitleIdCard} key={index}>
          <p>Title: {data?.title}</p>
          <p>ID: {data?.addedId}</p>
        </div>
      ))}
    </div>
  </div>
            </div>
          </div>

          <div className={styles.Submit}>
            <button onClick={handelSubmit} disabled={isLoading}>
              {isLoading ? <Loading color="#fff" /> : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
