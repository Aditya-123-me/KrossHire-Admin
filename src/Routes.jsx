import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardWrapper from "./components/DashboardWrapper/DashboardWrapper";
import ScrollToTop from "./components/Hooks/ScrollToTop";
import { clearCacheData } from "./components/Hooks/clearCacheData";
import LoadingIndicator from "./components/LoadingIndicator/LoadingIndicator";
import AddBlog from "./pages/Blogs/AddBlog";
import Blogs from "./pages/Blogs/Blogs";
import Dashboard from "./pages/DashboardIndex/DashboardComp";
import Developers from "./pages/Developers/Developers";
import Login from "./pages/Login/Login";
import Page404 from "./pages/Page404/Page404";
import Support from "./pages/Support/Support";
import Testimonial from "./pages/Testimonial/Testimonial";

function App() {
	clearCacheData();

	return (
		<BrowserRouter>
			<ScrollToTop />

			<ToastContainer
				position="top-right"
				autoClose={3000}
				limit={4}
				hideProgressBar={false}
				newestOnTop={false}
				rtl={false}
				pauseOnFocusLoss={false}
				draggable={false}
				pauseOnHover
			/>

			<Suspense fallback={<LoadingIndicator />}>
				<Routes>
					<Route path="*" element={<Page404 />} />
					<Route exact path="/" element={<Login />} />

					<Route element={<DashboardWrapper />}>
						<Route exact path="/dashboard" element={<Dashboard />} />
						<Route exact path="/developers" element={<Developers />} />
						<Route exact path="/testimonial" element={<Testimonial />} />
						<Route exact path="/support" element={<Support />} />
						<Route exact path="/blogs" element={<Blogs />} />
						<Route exact path="/add-blog" element={<AddBlog />} />
					</Route>
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}

export default App;
