// import { useState } from "react";
import { message,Upload } from 'antd';
import {InboxOutlined } from "@ant-design/icons"
import axios from 'axios';
const { Dragger } = Upload;

export default function ImageUpload() {
	// Function to check file size before uploading
	const beforeUpload = (file) => {
		const isLt2M = file.size / 1024 / 1024 < 2; // 2MB limit (adjust as needed)
		if (!isLt2M) {
			message.error('File must be smaller than 2MB!');
		}
		return isLt2M;
	}

	// Props for the Upload component
	const props = {
		name: 'image',
		action: 'http://localhost:3000/api/v1/upload',
		listType: "picture",
		showUploadList:{showRemoveIcon:false},
		accept: '.png, .jpeg, .jpg, .gif',
		progress: {
			size:3,
		},
		maxCount: 1,
		beforeUpload,
		onChange(info) {
			// console.log(info);
			const { status } = info.file;
			// console.log(status);
			if (status !== 'uploading') {
			// console.log(info.file, info.fileList);
			}
			if (status === 'done') {
			message.success(`${info.file.name} file uploaded successfully.`);

			} else if (status === 'error') {
			message.error(`${info.file.name} file upload failed, try again later...`);
			}
		},
		onDrop(e) {
			console.log('Dropped files', e.dataTransfer.files);
		},

		// Custom request function to handle the upload
		customRequest: ({ file, onSuccess, onError }) => {
            const formData = new FormData();
            formData.append('image', file);
            axios.post('http://localhost:3000/api/v1/upload', formData)
                .then((response) => {
					onSuccess(response.data, file);
                    console.log("File Data: ",response.data);
					
                })
                .catch((error) => {
                    onError(error);
                });
        },
	};
  return (
	<div className='flex justify-center items-center h-screen'>
		<Dragger {...props}>
			<p className="ant-upload-drag-icon">
				<InboxOutlined />
			</p>
			<p className="ant-upload-text">Click or drag file to this area to upload</p>
		<p className="ant-upload-hint">
				Support for a single or bulk upload. Strictly prohibited from uploading company data or other
				banned files.
		</p>
		</Dragger>
	</div>
  )
}
