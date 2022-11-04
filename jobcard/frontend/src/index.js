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
import { Toaster } from "react-hot-toast";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Toaster />
		<Router>
			<Routes>
				<Route path="/" element={<Portal />} />
				<Route path="/:id" element={<DynamicJob />} />
				<Route path="/admin/list" element={<Jobs />} />
				{/* UNDER DEVELOPMENT */}
				<Route path="/auth" element={<AuthForm />} />
				{/* TESTING OMLY */}
				<Route path="/form" element={<Form />} />
				<Route path="/jobcard/" element={<JobCard />} />
			</Routes>
		</Router>
	</React.StrictMode>
);
