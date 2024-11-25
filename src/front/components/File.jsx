import { useEffect, useState } from 'react';
import '../styles/File.css';
import downloadIcon from '../../assets/download.png';

const FileComponent = ({ fileName }) => {
  const [icon, setIcon] = useState(null);

  const getFileIcon = async (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (true) {
      case extension === 'pdf':
        console.log(extension);
        const { default: pdfIcon } = await import('../../assets/pdf.png');
        setIcon(pdfIcon);
        return;
      case extension === 'txt':
        console.log(extension);
        const { default: txtIcon } = await import('../../assets/txt.png');
        setIcon(txtIcon);
        return;
      case ['png', 'jpg', 'jpeg'].includes(extension):
        console.log(extension);
        const { default: photoIcon } = await import('../../assets/picture.png');
        setIcon(photoIcon);
        return;
      case ['mp4', 'avi', 'mov'].includes(extension):
        console.log(extension);
        const { default: videoIcon } = await import('../../assets/multimedia.png');
        setIcon(videoIcon);
        return;
      case extension === 'gif':
        console.log(extension);
        const { default: gifIcon } = await import('../../assets/gif.png');
        setIcon(gifIcon);
        return;
        case extension === 'docx':
            console.log(extension);
            const { default: docxIcon } = await import('../../assets/docx-file.png');
            setIcon(docxIcon);
        case extension === 'js':
            console.log(extension);
            const { default: jsLogo } = await import('../../assets/js.png');
            setIcon(jsLogo);
            return;
      default:
        return null;
    }
  };

  useEffect(() => {
    getFileIcon(fileName);
  }, [fileName]);

  return (
    <div className="file-item">
      <img src={icon} alt="file icon" className='file-icon'/>
      <span className="file-name">{fileName}</span>
      <img src={downloadIcon} alt="download icon" className="download-icon" />
    </div>
  );
};

export default FileComponent;