import toast from "react-hot-toast";

export const errorToast = (message, duration, position) => {
	toast.error(message, {
		position: position ?? "top-center",
		duration: duration ?? 3000,
		style: {
			background: "red",
			color: "#fff",
		},
	});
};

export const successToast = (message, duration, position) => {
	toast.success(message, {
		position: position ?? "top-center",
		duration: duration ?? 3000,
		style: {
			background: "green",
			color: "#fff",
		},
	});
};

export const warningToast = (message, duration, position) => {
	toast(message, {
		position: position ?? "top-center",
		duration: duration ?? 3000,
		style: {
			background: "yellow",
			color: "#000",
		},
	});
};

export const infoToast = (message, duration, position) => {
	toast(message, {
		position: position ?? "top-center",
		duration: duration ?? 3000,
		style: {
			background: "blue",
			color: "#fff",
		},
	});
};
