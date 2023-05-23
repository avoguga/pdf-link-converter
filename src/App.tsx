import { useState } from 'react'
import './App.css'

function App() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);
    if (file) {
      setFileUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="container">
      <h1>Upload and view PDF</h1>
      <div>
        <input type="file" id="fileInput" onChange={handleFileChange} accept=".pdf" />
        <label htmlFor="fileInput">Choose a PDF</label>
      </div>
      {fileUrl && 
        <div>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            View PDF
          </a>
        </div>
      }
    </div>
  )
}

export default App
