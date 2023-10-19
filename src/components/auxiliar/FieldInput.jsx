// FileInput.jsx
import React from 'react';
import {styled} from '@mui/material/styles';
import {Button} from "@mui/material";

const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1,
});

function FileInput({field, form, ...props}) {
	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			form.setFieldValue(field.name, file);
		}
	}

	const {value, ...fieldWithoutValue} = field;
	const hasError = form.touched[field.name] && form.errors[field.name];

	return (
		<div className={`border ${hasError ? 'border-red-500' : 'border-blue-600'} border-dashed`}>
			<Button component="label" className={'w-full flex flex-col justify-center items-center'}>
				<span className={hasError ? 'text-red-500' : 'text-black'}>Click para seleccionar archivo</span>
				<VisuallyHiddenInput
					{...props}
					{...fieldWithoutValue}
					type="file"
					onChange={handleFileChange}
				/>
				{value && <p>{value.name}</p>}
			</Button>
			{hasError && (
				<div className="text-red-500 flex justify-center">
					<p>{form.errors[field.name]}</p>
				</div>
			)}
		</div>
	);
}

export default FileInput;
