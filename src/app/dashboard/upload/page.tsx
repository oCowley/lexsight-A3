'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, FileText, CheckCircle2, X, AlertCircle, Loader2 } from 'lucide-react';
import { salvarAnalise, gerarAnaliseMockada } from '../../utils/storage';
import styles from './page.module.css';

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateFile = (file: File): string[] => {
    const errors: string[] = [];
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['application/pdf'];

    if (!allowedTypes.includes(file.type)) {
      errors.push('Apenas arquivos PDF são permitidos');
    }

    if (file.size > maxSize) {
      errors.push('O arquivo deve ter no máximo 10MB');
    }

    return errors;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      const errors = validateFile(droppedFile);
      if (errors.length === 0) {
        setFile(droppedFile);
        setValidationErrors([]);
      } else {
        setValidationErrors(errors);
        setFile(null);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const errors = validateFile(selectedFile);
      if (errors.length === 0) {
        setFile(selectedFile);
        setValidationErrors([]);
      } else {
        setValidationErrors(errors);
        setFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploadStatus('uploading');
    
    // Simulação de upload e análise
    setTimeout(() => {
      // Gerar análise mockada
      const analise = gerarAnaliseMockada(file.name);
      analise.status = 'concluido';
      
      // Salvar no localStorage
      salvarAnalise(analise);
      
      setUploadStatus('success');
      setTimeout(() => {
        // Redirecionar para o dashboard após sucesso
        router.push('/dashboard');
      }, 1500);
    }, 2000);
  };

  const handleRemove = () => {
    setFile(null);
    setValidationErrors([]);
    setUploadStatus('idle');
  };

  return (
    <div className={styles.uploadPage}>
      <div className={styles.header}>
        <h1>Upload e Ingestão</h1>
        <p>Envie seu contrato em PDF para análise automática</p>
      </div>

      <div className={styles.uploadSection}>
        <div
          className={`${styles.dropZone} ${isDragging ? styles.dragging : ''} ${file ? styles.hasFile : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {!file ? (
            <>
              <Upload size={64} className={styles.uploadIcon} />
              <h3>Arraste e solte seu arquivo aqui</h3>
              <p>ou</p>
              <label className={styles.fileInputLabel}>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className={styles.fileInput}
                />
                Selecionar Arquivo
              </label>
              <p className={styles.fileInfo}>Formatos aceitos: PDF (máx. 10MB)</p>
            </>
          ) : (
            <div className={styles.filePreview}>
              <div className={styles.fileIcon}>
                <FileText size={48} />
              </div>
              <div className={styles.fileDetails}>
                <h3>{file.name}</h3>
                <p>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <button className={styles.removeButton} onClick={handleRemove}>
                <X size={20} />
              </button>
            </div>
          )}
        </div>

        {validationErrors.length > 0 && (
          <div className={styles.errorBox}>
            <AlertCircle size={20} />
            <div>
              <strong>Erros de validação:</strong>
              <ul>
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {file && uploadStatus === 'idle' && (
          <div className={styles.validationBox}>
            <CheckCircle2 size={20} />
            <div>
              <strong>Arquivo válido</strong>
              <p>O documento está pronto para análise</p>
            </div>
          </div>
        )}

        {file && (
          <button
            className={styles.uploadButton}
            onClick={handleUpload}
            disabled={uploadStatus === 'uploading'}
          >
            {uploadStatus === 'uploading' ? (
              <>
                <Loader2 size={20} className={styles.spinner} />
                Processando...
              </>
            ) : uploadStatus === 'success' ? (
              <>
                <CheckCircle2 size={20} />
                Upload Concluído!
              </>
            ) : (
              <>
                <Upload size={20} />
                Iniciar Análise
              </>
            )}
          </button>
        )}
      </div>

      <div className={styles.infoSection}>
        <h2>Requisitos do Documento</h2>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <FileText size={24} />
            <h3>Formato</h3>
            <p>Apenas arquivos PDF são aceitos</p>
          </div>
          <div className={styles.infoCard}>
            <AlertCircle size={24} />
            <h3>Tamanho</h3>
            <p>Máximo de 10MB por arquivo</p>
          </div>
          <div className={styles.infoCard}>
            <CheckCircle2 size={24} />
            <h3>Qualidade</h3>
            <p>Documentos legíveis e completos</p>
          </div>
        </div>
      </div>
    </div>
  );
}

