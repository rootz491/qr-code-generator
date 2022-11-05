import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Portal from "./pages/portal";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./pages/Form";
import JobCard from "./pages/Jobcard";
import AuthForm from "./pages/signin";
import DynamicJob from "./component/dynamicJob";
import Jobs from "./component/Jobs";
import AdminProtected from "./component/AdminProtected";
import UserProtected from "./component/UserProtected";
import { Toaster } from "react-hot-toast";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<Toaster />
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						<UserProtected>
							<Portal />
						</UserProtected>
					}
				/>
				<Route
					path="/:id"
					element={
						<AdminProtected>
							<DynamicJob />
						</AdminProtected>
					}
				/>
				<Route
					path="/admin/list"
					element={
						<AdminProtected>
							{" "}
							<Jobs />{" "}
						</AdminProtected>
					}
				/>
				<Route path="/auth" element={<AuthForm />} />
				{/* TESTING OMLY */}
				<Route path="/form" element={<Form />} />
				<Route path="/jobcard/" element={<JobCard />} />
			</Routes>
		</Router>
	</React.StrictMode>
);
