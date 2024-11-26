import React, { useEffect, useRef, useState } from "react";
import "../styles/radio.css";
import FileComponent from './File';

const Radio = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState("");
  const [clientConnected, setClientConnected] = useState(false);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleClientConnect = async () => {
    try {
      const response = await fetch("http://localhost:3000/client/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Conectado al servidor');
        setClientConnected(true);
        await getFiles();
      } else {
        setError(data.error || 'Error al conectar como cliente FTP');
      }
    } catch (error) {
      setError("Error al conectar como cliente FTP: " + error.message);
    }
  };

  const handleClientDisconnect = async () => {
    try {
      const response = await fetch("http://localhost:3000/client/disconnect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Desconectado del servidor');
        setFiles([]);
        setClientConnected(false);
      } else {
        setError(data.error || 'Error al desconectar como cliente FTP');
      }
    } catch (error) {
      setError("Error al desconectar como cliente FTP: " + error.message);
    }
  };

  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
    setError(''); // Clear error message when changing option
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    setFile(files[0].name);
    if (files.length > 0) {
      console.log("Archivo seleccionado:", files[0].name);
    }
  };

  const getFiles = async () => {
    try {
      const response = await fetch("http://localhost:3000/server/files");
      const data = await response.json();
      if (response.ok) {
        setFiles(data.data);
        console.log("Archivos en el servidor:", data.data);
      } else {
        setError(data.error || 'Error al obtener los archivos del servidor');
      }
    } catch (error) {
      setError("Error al obtener los archivos del servidor: " + error.message);
    }
  };

  const handleServerConnect = async () => {
    try {
      console.log("Conectando al servidor...");
      const response = await fetch("http://localhost:3000/server/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        console.log('servidor conectado');
        setConnected(true);
        console.log("Archivos en el servidor:", files);
      } else {
        setError(data.error || 'Error al conectar al servidor FTP');
      }
    } catch (error) {
      setError("Error al conectar al servidor FTP: " + error.message);
    }
  };

  const handleUploadFile = async () => {
    // Implementaci��n de la función para subir archivos
  };

  const handleServerDisconnect = async () => {
    try {
      const response = await fetch('http://localhost:3000/server/stop', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setConnected(false);
        setClientConnected(false);
        setFiles([]);
      } else {
        const data = await response.json();
        setError(data.error || 'Error al desconectar del servidor FTP');
      }
    } catch (error) {
      setError("Error al desconectar del servidor FTP: " + error.message);
    }
  };

  return (
    <div>
      <div className="radio-input">
        <label className="label">
          <div className="back-side"></div>
          <input
            type="radio"
            id="value-1"
            name="value-radio"
            value="Cliente"
            onChange={handleRadioChange}
          />
          <span className="text">Cliente</span>
          <span className="bottom-line"></span>
        </label>

        <label className="label">
          <div className="back-side"></div>
          <input
            type="radio"
            id="value-2"
            name="value-radio"
            value="Servidor"
            onChange={handleRadioChange}
          />
          <span className="text">Servidor</span>
          <span className="bottom-line"></span>
        </label>

        <label className="label">
          <div className="back-side"></div>
          <input
            type="radio"
            id="value-3"
            name="value-radio"
            value="FTP"
            onChange={handleRadioChange}
          />
          <span className="text">FTP</span>
          <span className="bottom-line"></span>
        </label>
      </div>

      <div className={"content-display"}>
        
        {selectedOption === "Cliente" && (
          <div className="option-content">
            {!clientConnected ? (
              <button onClick={handleClientConnect}>Conectarse como cliente FTP</button>
            ) : (
              <>
                <div className="client-actions">
                  <button onClick={handleClientDisconnect}>Desconectarse como cliente FTP</button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <button className="cliente-button" onClick={handleFileButtonClick}></button>
                </div>
                {file !== "" && (
                  <>
                    <FileComponent fileName={file} downloadable={false} />
                    <button onClick={handleUploadFile}>Subir archivo al servidor FTP</button>
                  </>
                )}
              </>
            )}
          </div>
        )}
        {selectedOption === "Servidor" && (
          <div className="option-content">
            <button className="servidor-button" onClick={connected ? handleServerDisconnect : handleServerConnect}>
              {connected ? "Desconectar del servidor FTP" : "Conectar a un servidor FTP"}
            </button>
            {connected && (
              files.map((file, index) => {
                return <FileComponent key={index} fileName={file.name} />;
              })
            )}
          </div>
        )}
        {selectedOption === "FTP" && (
          <div className="option-content ftp-info">
            <h3>File Transfer Protocol</h3>
            <p>
              Es un protocolo estándar de red utilizado para transferir archivos
              entre un cliente y un servidor a través de una conexión TCP/IP.
              Permite subir, descargar y gestionar archivos en un servidor remoto
              mediante comandos específicos. Funciona a través de dos canales:
              uno para el control y otro para la transferencia de datos,
              operando en modos activo o pasivo. Aunque es útil para compartir
              datos y gestionar archivos en redes locales o remotas, su falta de
              cifrado lo hace vulnerable, por lo que se recomienda usar
              alternativas más seguras como SFTP o FTPS cuando se manejen datos
              sensibles.
            </p>
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Radio;