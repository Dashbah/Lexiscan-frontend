import React, { useState } from 'react';

const ImageUpload = ({ chatUId }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadResult, setUploadResult] = useState(null);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('token');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setUploadResult(null);
        setError(null);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Please select a file first');
            return;
        }

        setUploading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('file', selectedFile, selectedFile.name);

            const response = await fetch(`http://89.169.154.190:8080/api/model/upload?chatUId=${chatUId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'accept': '*/*',
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Upload failed with status ${response.status}`);
            }

            const result = await response.json();
            setUploadResult(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className='image-upload'>
            <h2>Upload Image</h2>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
            {uploadResult && (
                <div>
                    <h3>Upload successful!</h3>
                    <p>confidence: {uploadResult.confidence}</p>
                    <p>prediction type: {uploadResult.prediction}</p>
                </div>
            )}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        </div>
    );
};

export default ImageUpload;
