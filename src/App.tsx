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
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // Reset the upload state
    setUploadProgress(null);
    setUploadComplete(false);
    setFileUrl(null);
    setFileName(null);

    const file = e.target.files?.item(0);
    if (file) {
      const storage = getStorage(app);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setUploadProgress(progress);
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
      {!uploadComplete && uploadProgress !== null && uploadProgress > 0 && (
        <div className="progress-container">
          <progress value={uploadProgress} max="100" />
        </div>
      )}
      {uploadComplete && fileUrl && (
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
