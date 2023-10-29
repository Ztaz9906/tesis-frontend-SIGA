import * as Yup from "yup";
import checkout from "./form";
import {IPvalidation} from "@/components/auxiliar/RegexValidations.js";

const {
	formField: {ip_puerta}
} = checkout;

const validations = [
	Yup.object().shape({
		[ip_puerta.name]: Yup.string()
			.matches(
				IPvalidation.regex,
				IPvalidation.message
			)
			.required(ip_puerta.errorMsg),
	}),
];
export default validations;
