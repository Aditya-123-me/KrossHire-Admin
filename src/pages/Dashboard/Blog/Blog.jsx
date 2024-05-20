// import React, { useState } from "react";
// import styles from "./Blog.module.scss";

// function Blog() {
// 	const [blogData, setBlogData] = useState({
// 		name: "",
// 		email: "",
// 		phone_number: "",
// 		blog_title: "",
// 		description: "",
// 	});

// 	const handleChange = (e) => {
// 		const { id, value } = e.target;
// 		setBlogData((prevBlogData) => ({
// 			...prevBlogData,
// 			[id]: value,
// 		}));
// 	};

// 	const handleSubmit = () => {
// 		console.log(blogData);

// 	};

// 	return (
// 		<div className={styles.blogContainer}>
// 			<h1>Blogs Hansraj Ventures</h1>
// 			<div className={styles.BlogForm}>
// 				<div className={styles.InputWrapper}>
// 					<label htmlFor="name">Your Name</label>
// 					<input type="text" id="name" onChange={handleChange} />
// 				</div>
// 				<div className={styles.InputWrapper}>
// 					<label htmlFor="email">Email</label>
// 					<input type="email" id="email" onChange={handleChange} />
// 				</div>
// 				<div className={styles.InputWrapper}>
// 					<label htmlFor="phone">Phone Number</label>
// 					<input type="tel" id="phone_number" onChange={handleChange} />
// 				</div>
// 				<div className={styles.InputWrapper}>
// 					<label htmlFor="title">Title Of Your Blog</label>
// 					<input type="text" id="blog_title" onChange={handleChange} />
// 				</div>
// 				<div className={styles.InputWrapper}>
// 					<label htmlFor="desc">Description Of Your Blog</label>
// 					<textarea id="description" onChange={handleChange} />
// 				</div>

// 				<button onClick={handleSubmit}>Upload</button>
// 			</div>
// 		</div>
// 	);
// }

// export default Blog;

import React from "react";

const Blog = () => {
	return <div>Blog</div>;
};

export default Blog;
