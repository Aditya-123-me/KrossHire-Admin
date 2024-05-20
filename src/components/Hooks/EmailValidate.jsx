export const EmailValidate = (email) => {
	const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return !regex.test(email);
};

export const emailValidate = (email) => {
	if (email === "") return { status: true, message: "Please add a email address !" };
	const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	if (!regex.test(email))return { status: true, message: "Please add valid email address !" };
};
export const numberValidate = (number) => {
	if (number === "") return { status: true, message: "Please add a number !" };
	if (!Number.isInteger(parseFloat(number))) return { status: true, message: "Please add only numbers !" };
	if (number.length > 10 || number.length < 10) return { status: true, message: "Please add 10 digit number !" };
};

export const pinCodeCheck = (pin) => {
	if (pin === "") return { status: true, message: "Please add a pin code !" };
	if (!Number.isInteger(parseFloat(pin))) return { status: true, message: "Please add only pin code !" };
	if (pin.length > 6 || pin.length < 6) return { status: true, message: "Please add 10 digit pin code !" };
};

export const stringLengthCheck = (string) => {
	if (string === "") return { status: true, message: "Please add something !" };
	if (string.length < 3) return { status: true, message: "Please add at least 3 characters!" };
};

export const stringMoreLengthCheck = (string) => {
	if (string === "") return { status: true, message: "Please add something !" };
	if (string.length < 20) return { status: true, message: "Please add at least 20 characters!" };
};
