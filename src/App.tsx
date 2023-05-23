import { useState } from "react";
import "./App.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "./firebase";

function App() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0); // New state for upload progress
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);
    if (file) {
      const storage = getStorage(app);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress); // Update the progress state
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Upload failed:", error);
        },
        async () => {
          const fileUrl = await getDownloadURL(uploadTask.snapshot.ref);
          setFileUrl(fileUrl);
          setFileName(file.name);
          setUploadComplete(true);
        }
      );
    }
  };

  return (
    <div className="container">
      <h1>Upload and view PDF</h1>
      <div>
        <input
          type="file"
          id="fileInput"
          onChange={handleFileChange}
          accept=".pdf"
        />
        <label htmlFor="fileInput">Choose a PDF</label>
      </div>
      {progress > 0 &&
        progress < 100 && ( // Show progress bar when upload is in progress
          <div className="progress-container">
            <progress value={progress} max="100" />
          </div>
        )}
      {fileUrl && (
        <div className="loaded">
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            View PDF
          </a>
          <p className="file-name">{fileName}</p>
        </div>
      )}
    </div>
  );
}

export default App;
