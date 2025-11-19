'use client';

import { useState } from 'react';
import { Info, X } from 'lucide-react';
import styles from './ExplanationPopup.module.css';

interface ExplanationPopupProps {
  justificativa: string;
  children: React.ReactNode;
}

export default function ExplanationPopup({ justificativa, children }: ExplanationPopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div
        className={styles.trigger}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}
      >
        {children}
        <Info size={16} className={styles.infoIcon} />
      </div>
      {isOpen && (
        <div className={styles.popup}>
          <div className={styles.popupHeader}>
            <h4>Justificativa da IA</h4>
            <button
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
            >
              <X size={16} />
            </button>
          </div>
          <p>{justificativa}</p>
        </div>
      )}
    </div>
  );
}

