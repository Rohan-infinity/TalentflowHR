import React, { useState } from 'react';
import './QuestionTypes.css';

const FileUpload = ({ 
  question, 
  value, 
  onChange, 
  disabled = false,
  isBuilder = false,
  onUpdateQuestion
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleFileSelect = (files) => {
    if (disabled) return;
    
    const file = files[0];
    if (!file) return;

    // Validate file
    const errors = validateFile(file);
    if (errors.length > 0) {
      setUploadError(errors[0]);
      return;
    }

    setUploadError('');
    onChange(file);
  };

  const validateFile = (file) => {
    const errors = [];
    const maxSizeBytes = (question.maxSize || 5) * 1024 * 1024;
    const acceptedTypes = question.acceptedTypes || ['.pdf', '.doc', '.docx'];

    if (file.size > maxSizeBytes) {
      errors.push(`File size must be ${question.maxSize || 5}MB or less`);
    }

    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    if (!acceptedTypes.includes(fileExtension)) {
      errors.push(`File type must be one of: ${acceptedTypes.join(', ')}`);
    }

    return errors;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) {
      setDragOver(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (!disabled) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e) => {
    handleFileSelect(e.target.files);
  };

  const removeFile = () => {
    if (!disabled) {
      onChange(null);
      setUploadError('');
    }
  };

  const handleAcceptedTypesUpdate = (newTypes) => {
    if (!isBuilder || !onUpdateQuestion) return;
    const types = newTypes.split(',').map(type => type.trim()).filter(type => type);
    onUpdateQuestion({ ...question, acceptedTypes: types });
  };

  const handleMaxSizeUpdate = (newSize) => {
    if (!isBuilder || !onUpdateQuestion) return;
    const maxSize = parseInt(newSize) || 5;
    onUpdateQuestion({ ...question, maxSize });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="question-type file-upload">
      {isBuilder && (
        <div className="builder-controls">
          <div className="control-group">
            <label>Accepted File Types (comma-separated):</label>
            <input
              type="text"
              value={(question.acceptedTypes || []).join(', ')}
              onChange={(e) => handleAcceptedTypesUpdate(e.target.value)}
              className="control-input"
              placeholder=".pdf, .doc, .docx, .zip"
            />
          </div>
          <div className="control-group">
            <label>Max File Size (MB):</label>
            <input
              type="number"
              value={question.maxSize || 5}
              onChange={(e) => handleMaxSizeUpdate(e.target.value)}
              className="control-input"
              min="1"
              max="100"
            />
          </div>
        </div>
      )}
      
      <div className="file-upload-container">
        {!value ? (
          <div
            className={`file-drop-zone ${dragOver ? 'drag-over' : ''} ${disabled ? 'disabled' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              onChange={handleFileInputChange}
              disabled={disabled}
              accept={(question.acceptedTypes || []).join(',')}
              className="file-input"
              id={`file-${question.id}`}
            />
            <label htmlFor={`file-${question.id}`} className="file-input-label">
              <div className="upload-icon">📁</div>
              <div className="upload-text">
                <p>Drop your file here or <span className="browse-link">browse</span></p>
                <p className="upload-info">
                  Accepted: {(question.acceptedTypes || []).join(', ')} 
                  (Max: {question.maxSize || 5}MB)
                </p>
              </div>
            </label>
          </div>
        ) : (
          <div className="uploaded-file">
            <div className="file-info">
              <div className="file-icon">📄</div>
              <div className="file-details">
                <div className="file-name">{value.name}</div>
                <div className="file-size">{formatFileSize(value.size)}</div>
              </div>
            </div>
            {!disabled && (
              <button
                type="button"
                onClick={removeFile}
                className="remove-file-btn"
                title="Remove file"
              >
                ×
              </button>
            )}
          </div>
        )}
        
        {uploadError && (
          <div className="error-message">
            {uploadError}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
