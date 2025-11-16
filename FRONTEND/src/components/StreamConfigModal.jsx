import React, { useState } from "react";
import "./StreamConfigModal.css";

const StreamConfigModal = ({ isOpen, onClose, onSave, startStreamAfterSave = false }) => {
  const [config, setConfig] = useState({
    title: "",
    description: "",
    category: "",
    quality: "720p",
    bitrate: "3000",
    audioBitrate: "128",
    chatEnabled: true,
    donationsEnabled: true,
    moderationEnabled: true,
    overlayEnabled: true
  });

  const categories = [
    "Gaming", "Charla", "Música", "Arte", "Programación", 
    "Cocina", "Deportes", "Educación", "Entretenimiento", "Otro"
  ];

  const qualityOptions = [
    { value: "1080p", label: "1080p (Full HD)" },
    { value: "720p", label: "720p (HD)" },
    { value: "480p", label: "480p (SD)" }
  ];

  const bitrateOptions = [
    { value: "6000", label: "6000 kbps (Alta calidad)" },
    { value: "3000", label: "3000 kbps (Calidad media)" },
    { value: "1500", label: "1500 kbps (Calidad básica)" }
  ];

  const handleSave = () => {
    onSave(config, startStreamAfterSave);
    onClose();
  };

  const handleInputChange = (field, value) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="stream-config-modal">
        <div className="modal-header">
          <h2>⚙️ Configurar Stream</h2>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        <div className="modal-content">
          {/* Información Básica */}
          <div className="config-section">
            <h3>📝 Información Básica</h3>
            <div className="input-group">
              <label htmlFor="title">Título del Stream *</label>
              <input
                id="title"
                type="text"
                value={config.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Ej: ¡Jugando mi juego favorito!"
                maxLength={100}
                required
              />
              <small>{config.title.length}/100 caracteres</small>
            </div>

            <div className="input-group">
              <label htmlFor="description">Descripción</label>
              <textarea
                id="description"
                value={config.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe de qué va tu stream..."
                maxLength={500}
                rows={3}
              />
              <small>{config.description.length}/500 caracteres</small>
            </div>

            <div className="input-group">
              <label htmlFor="category">Categoría *</label>
              <select
                id="category"
                value={config.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                required
              >
                <option value="">Selecciona una categoría</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Configuración Técnica */}
          <div className="config-section">
            <h3>🎥 Configuración Técnica</h3>
            <div className="input-row">
              <div className="input-group">
                <label htmlFor="quality">Calidad de Video</label>
                <select
                  id="quality"
                  value={config.quality}
                  onChange={(e) => handleInputChange("quality", e.target.value)}
                >
                  {qualityOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <label htmlFor="bitrate">Bitrate de Video</label>
                <select
                  id="bitrate"
                  value={config.bitrate}
                  onChange={(e) => handleInputChange("bitrate", e.target.value)}
                >
                  {bitrateOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="audioBitrate">Bitrate de Audio (kbps)</label>
              <select
                id="audioBitrate"
                value={config.audioBitrate}
                onChange={(e) => handleInputChange("audioBitrate", e.target.value)}
              >
                <option value="128">128 kbps (Estándar)</option>
                <option value="160">160 kbps (Alta calidad)</option>
                <option value="192">192 kbps (Muy alta calidad)</option>
              </select>
            </div>
          </div>


          {/* Información Técnica */}
          <div className="config-section">
            <h3>🔑 Información de Conexión</h3>
            <div className="connection-info">
              <div className="info-item">
                <strong>Stream URL:</strong>
                <code>rtmp://vv-stream.com/live/</code>
              </div>
              <div className="info-item">
                <strong>Stream Key:</strong>
                <code>sk_live_****-****-****-1234</code>
                <button className="copy-button" title="Copiar">📋</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="cancel-button" onClick={onClose}>
            Cancelar
          </button>
          <button 
            className="save-button" 
            onClick={handleSave}
            disabled={!config.title.trim() || !config.category}
          >
            {startStreamAfterSave ? '🎥 Guardar e Iniciar Stream' : '💾 Guardar Configuración'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StreamConfigModal;