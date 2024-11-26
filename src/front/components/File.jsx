import { useEffect, useState } from 'react';
import '../styles/File.css';
import downloadIcon from '../../assets/download.png';

const FileComponent = ({ fileName, downloadable = true }) => {
  const [icon, setIcon] = useState(null);

  const getFileIcon = async (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (true) {
      case extension === 'pdf':
        const { default: pdfIcon } = await import('../../assets/pdf.png');
        setIcon(pdfIcon);
        return;
      case extension === 'txt':
        const { default: txtIcon } = await import('../../assets/txt.png');
        setIcon(txtIcon);
        return;
      case ['png', 'jpg', 'jpeg'].includes(extension):
        const { default: photoIcon } = await import('../../assets/picture.png');
        setIcon(photoIcon);
        return;
      case ['mp4', 'avi', 'mov'].includes(extension):
        const { default: videoIcon } = await import('../../assets/multimedia.png');
        setIcon(videoIcon);
        return;
      case extension === 'gif':
        const { default: gifIcon } = await import('../../assets/gif.png');
        setIcon(gifIcon);
        return;
      case extension === 'docx':
        const { default: docxIcon } = await import('../../assets/docx-file.png');
        setIcon(docxIcon);
        return;
      case extension === 'js':
        const { default: jsLogo } = await import('../../assets/js.png');
        setIcon(jsLogo);
        return;
      default:
        return null;
    }
  };

  const handleDownload = async () => {
    console.log('a')
    try {
      console.log('b')
      const response = await fetch('http://localhost:3000/client/download', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileName })
      });
      console.log(response)
      
      if (response.ok) {
        const data = await response.json()
        console.log('Archivo descargado');
        alert(data.mensaje)
      }
    } catch (error) {
      console.error('Error al descargar el archivo', error.message);
    }
  };

  useEffect(() => {
    getFileIcon(fileName);
  }, [fileName]);

  return (
    <div className="file-item">
      <img src={icon} alt="file icon" className='file-icon' />
      <span className="file-name">{fileName}</span>
      {downloadable && (
        <div onClick={handleDownload}>
          <img src={downloadIcon} alt="download icon" className="download-icon" />
        </div>
      )}
    </div>
  );
};

export default FileComponent;