export const dateFormat = (date) => {
	const time = date.split("T")[1].split(".")[0];
	date = date.split("T")[0];
    return date;
};
