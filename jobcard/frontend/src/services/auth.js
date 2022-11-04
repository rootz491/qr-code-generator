import jwt_decode from "jwt-decode";
export function isAuthenticated() {
	const token = localStorage.getItem("token");
	if (token) {
		const decoded = jwt_decode(token);
		const currentTime = Date.now() / 1000;
		if (decoded.exp < currentTime) {
			localStorage.removeItem("token");
			return false;
		}
		return true;
	}
}
