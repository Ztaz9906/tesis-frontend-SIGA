const OnlyLetters = {
	regex: /^[a-zA-Z\s]*$/,
	message: 'Solo se permiten letras en el nombre'
}

const OnlyNumbers = {
	regex: /^[0-9]+(\.[0-9]{1,2})?$/,
	message: 'El precio debe ser un número positivo.'
}

const IPvalidation = {
	regex: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
	message: 'Introduce una IP válida ej:0.0.0.0, no pasar de 255.255.255.255'
}

const CIvalidation = {
	regex: /^\d{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])\d{5}$/,
	message: 'Formato del carnet de identidad no válido'
}

const emailValidation = {
	regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}(\.[a-zA-Z]{2,3})?$/,
	message: 'El correo electrónico no es válido.'
}

export {OnlyLetters, OnlyNumbers, IPvalidation, CIvalidation, emailValidation}