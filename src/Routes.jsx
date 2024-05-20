import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardWrapper from "./components/DashboardWrapper/DashboardWrapper";
import ScrollToTop from "./components/Hooks/ScrollToTop";
import { clearCacheData } from "./components/Hooks/clearCacheData";
import LoadingIndicator from "./components/LoadingIndicator/LoadingIndicator";
import Login from "./pages/Login/Login";
import Page404 from "./pages/Page404/Page404";
import Dashboard from "./pages/DashboardIndex/DashboardComp";

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
					</Route>
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}

export default App;
