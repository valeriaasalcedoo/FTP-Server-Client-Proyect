import React, { useRef, useState } from "react";
import "../styles/radio.css";

const Radio = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const fileInputRef = useRef(null);
  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click(); 
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      console.log("Archivo seleccionado:", files[0].name);
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
            {/* Botón que abre el navegador de archivos */}
            <button className="cliente-button" onClick={handleFileButtonClick}>
            </button>

            {/* Input oculto para seleccionar archivos */}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
        )}
        {selectedOption === "Servidor" && (
          <div className="option-content">
            <button className="servidor-button">Conectar a un servidor FTP</button>
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
      </div>
    </div>
  );
};

export default Radio;
