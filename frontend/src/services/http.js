import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:5000",
	timeout: 10000,
	headers: {
		Authorization: `Bearer ${localStorage.getItem("access_token") ?? "test"}`,
		"Content-Type": "application/json",
	},
});

// setting headers using axios interceptors
instance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("access_token") ?? "";
		if (token !== "test") {
			config.headers = config.headers ?? {};
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		Promise.reject(error);
	}
);

export default instance;
