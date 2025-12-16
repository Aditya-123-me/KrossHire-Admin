import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./JobAdd.module.scss";
import axios from "../../components/Hooks/axios";

function JobAdd() {
  const [form, setForm] = useState({
    title: "",
    salary: {
      amount: "",
      currency: "INR",
      type: "monthly"
    },
    company: "",
    location: "",
    description: "",
    skills: "",
    language: "English",
  });

  const [expect, setExpect] = useState([]);
  const [doList, setDoList] = useState([]);
  const [bring, setBring] = useState([]);
  const [compensation, setCompensation] = useState([]);
  const [apply, setApply] = useState([]);
  const [locationQuery, setLocationQuery] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState([]);

  const expectRef = useRef(null);
  const doRef = useRef(null);
  const bringRef = useRef(null);
  const compensationRef = useRef(null);
  const applyRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "amount") {
      setForm({ ...form, salary: { ...form.salary, amount: value } });
    } else if (name === "currency") {
      setForm({ ...form, salary: { ...form.salary, currency: value } });
    } else if (name === "type") {
      setForm({ ...form, salary: { ...form.salary, type: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };


  
  const addQuillItem = (list, setList, ref) => {
    const content = ref.current.getEditor().root.innerHTML;
    if (content.trim() && content !== "<p><br></p>") {
      setList([...list, content]);
      ref.current.getEditor().setText("");
    }
  };

  const removeItem = (list, setList, index) => {
    setList(list.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      salary: {
        amount: Number(form.salary.amount),
        currency: form.salary.currency,
        type: form.salary.type
      },
      skills: form.skills.split(",").map((s) => s.trim()).filter(s => s),
      expect,
      do: doList,
      bring,
      compensation,
      apply,
    };

    try {
      const res = await axios.post("/jobfull/create", payload);
      console.log("Job Created:", res.data);

      setForm({
        title: "",
        salary: {
          amount: "",
          currency: "INR",
          type: "monthly"
        },
        company: "",
        location: "",
        description: "",
        skills: "",
        language: "English",
      });

      setExpect([]);
      setDoList([]);
      setBring([]);
      setCompensation([]);
      setApply([]);

      alert("Job added successfully!");
    } catch (error) {
      console.error(error);
      alert("Error adding job!");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h2>Add New Job</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.title}>
            <input name="title" placeholder="Job Title" value={form.title} onChange={handleChange} />

           
            <input name="company" placeholder="Company Name" value={form.company} onChange={handleChange} />
            <div className={styles.title2}>
              <select name="currency" value={form.salary.currency} onChange={handleChange} className={styles.selectBox}>
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>

              <select name="type" value={form.salary.type} onChange={handleChange} className={styles.selectBox}>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>

               <input
              type="number"
              name="amount"
              placeholder="Salary Amount"
              value={form.salary.amount}
              onChange={handleChange}
              className={styles.input}
            />

              <select name="location" value={form.location} onChange={handleChange} className={styles.selectBox}>
                <option value="">Select Location</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Pune">Pune</option>
                <option value="Chennai">Chennai</option>
                <option value="Gurgaon">Gurgaon</option>
                <option value="Noida">Noida</option>
                <option value="Ahmedabad">Ahmedabad</option>
                <option value="Remote">Remote</option>
              </select>

              <select name="language" value={form.language} onChange={handleChange}>
                <option value="English">English</option>
                <option value="German">German</option>
                <option value="French">French</option>
              </select>
            </div>
          </div>

          <div>
            <textarea
              name="description"
              placeholder="Job Description"
              value={form.description}
              onChange={handleChange}
              className={styles.description}
            />

            <input
              name="skills"
              placeholder="Skills (comma separated: React, Node, MongoDB)"
              value={form.skills}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Expectations</label>
            <ReactQuill ref={expectRef} theme="snow" placeholder="Enter expectation..." />
            <button type="button" onClick={() => addQuillItem(expect, setExpect, expectRef)}>Add Expectation</button>
            {expect.map((item, i) => (
              <div key={i}>
                <div dangerouslySetInnerHTML={{ __html: item }} />
                <button type="button" onClick={() => removeItem(expect, setExpect, i)}>Remove</button>
              </div>
            ))}
          </div>

          <div>
            <label>Responsibilities</label>
            <ReactQuill ref={doRef} theme="snow" placeholder="Enter responsibility..." />
            <button type="button" onClick={() => addQuillItem(doList, setDoList, doRef)}>Add Responsibility</button>
            {doList.map((item, i) => (
              <div key={i}>
                <div dangerouslySetInnerHTML={{ __html: item }} />
                <button type="button" onClick={() => removeItem(doList, setDoList, i)}>Remove</button>
              </div>
            ))}
          </div>

          <div>
            <label>What to Bring</label>
            <ReactQuill ref={bringRef} theme="snow" placeholder="Enter requirement..." />
            <button type="button" onClick={() => addQuillItem(bring, setBring, bringRef)}>Add Requirement</button>
            {bring.map((item, i) => (
              <div key={i}>
                <div dangerouslySetInnerHTML={{ __html: item }} />
                <button type="button" onClick={() => removeItem(bring, setBring, i)}>Remove</button>
              </div>
            ))}
          </div>

          <div>
            <label>Compensation</label>
            <ReactQuill ref={compensationRef} theme="snow" placeholder="Enter compensation detail..." />
            <button type="button" onClick={() => addQuillItem(compensation, setCompensation, compensationRef)}>Add Compensation</button>
            {compensation.map((item, i) => (
              <div key={i}>
                <div dangerouslySetInnerHTML={{ __html: item }} />
                <button type="button" onClick={() => removeItem(compensation, setCompensation, i)}>Remove</button>
              </div>
            ))}
          </div>

          <div>
            <label>How to Apply</label>
            <ReactQuill ref={applyRef} theme="snow" placeholder="Enter application instruction..." />
            <button type="button" onClick={() => addQuillItem(apply, setApply, applyRef)}>Add Instruction</button>
            {apply.map((item, i) => (
              <div key={i}>
                <div dangerouslySetInnerHTML={{ __html: item }} />
                <button type="button" onClick={() => removeItem(apply, setApply, i)}>Remove</button>
              </div>
            ))}
          </div>

          <button type="submit">Add Job</button>
        </form>
      </div>
    </div>
  );
}

export default JobAdd;