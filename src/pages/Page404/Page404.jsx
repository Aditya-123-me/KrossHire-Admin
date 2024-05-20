import React from "react";
import { Helmet } from "react-helmet";
import styles from "./Page404.module.scss";

const Page404 = () => {
	return (
		<>
			<Helmet>
				<title>404 - Page Not Found</title>
				<meta name="errorpage" content="true" />
				<meta name="errortype" content="404 - Not Found" />
				<meta name="prerender-status-code" content="404" />
				<meta name="status-code" content="404" />
				{/* <meta name="description" content="This is a description of my page." /> */}
			</Helmet>

			<div className={styles.Page404}>
				<h1>404</h1>

				<p>Oops! Page not found.</p>

				<p>
					It seems like you're lost. Let's get you <a href="/">back home</a>.
				</p>
			</div>
		</>
	);
};

export default Page404;
