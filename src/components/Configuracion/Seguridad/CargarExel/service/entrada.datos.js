import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "@/services/config/customFetchBase.jsx";

export const uploadExelApi = createApi({
	reducerPath: "uploadExelApi",
	baseQuery: customFetchBase,
	tagTypes: ["uploadExel"],
	endpoints: (builder) => ({
		createUploadExcel: builder.mutation({
			query: (data) => {
				let formData = new FormData();
				formData.append('file', data.file);
				formData.append('institucion', data.institucion);
				return {
					url: "/cargar_excel/",
					method: "POST",
					body: formData,
				};
			},
			invalidatesTags: [{type: "uploadExel", id: "LIST"}],
		}),
	}),
});

export const {
	useCreateUploadExcelMutation,
} = uploadExelApi;