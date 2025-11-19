'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText, Trash2, Eye, Shield, Calendar, AlertTriangle } from 'lucide-react';
import { obterTodasAnalises, deletarAnalise, anonimizarAnalise, obterAnalisePorId, definirAnaliseAtual } from '../../utils/storage';
import type { Analise } from '../../utils/storage';
import styles from './page.module.css';

export default function HistoricoPage() {
  const [analises, setAnalises] = useState<Analise[]>([]);
  const [filtro, setFiltro] = useState<'todas' | 'anonimizadas'>('todas');

  useEffect(() => {
    carregarAnalises();
  }, [filtro]);

  const carregarAnalises = () => {
    const todas = obterTodasAnalises();
    if (filtro === 'anonimizadas') {
      setAnalises(todas.filter(a => a.anonimizado));
    } else {
      setAnalises(todas);
    }
  };

  const handleDeletar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Tem certeza que deseja excluir esta análise?')) {
      deletarAnalise(id);
      carregarAnalises();
    }
  };

  const handleAnonimizar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Deseja anonimizar esta análise? Esta ação não pode ser desfeita.')) {
      anonimizarAnalise(id);
      carregarAnalises();
    }
  };

  const handleVisualizar = (id: string) => {
    definirAnaliseAtual(id);
  };

  return (
    <div className={styles.historicoPage}>
      <div className={styles.header}>
        <h1>Histórico de Análises</h1>
        <p>Gerencie e visualize todas as suas análises anteriores</p>
      </div>

      <div className={styles.filtros}>
        <button
          className={`${styles.filtroButton} ${filtro === 'todas' ? styles.active : ''}`}
          onClick={() => setFiltro('todas')}
        >
          Todas as Análises
        </button>
        <button
          className={`${styles.filtroButton} ${filtro === 'anonimizadas' ? styles.active : ''}`}
          onClick={() => setFiltro('anonimizadas')}
        >
          Anonimizadas
        </button>
      </div>

      {analises.length === 0 ? (
        <div className={styles.emptyState}>
          <FileText size={64} />
          <h2>Nenhuma análise encontrada</h2>
          <p>Faça upload de um documento para começar</p>
          <Link href="/dashboard/upload" className={styles.uploadButton}>
            Fazer Upload
          </Link>
        </div>
      ) : (
        <div className={styles.analisesGrid}>
          {analises.map((analise) => (
            <div key={analise.id} className={styles.analiseCard}>
              <div className={styles.analiseHeader}>
                <div className={styles.analiseIcon}>
                  <FileText size={24} />
                </div>
                <div className={styles.analiseInfo}>
                  <h3>{analise.nomeDocumento}</h3>
                  <div className={styles.analiseMeta}>
                    <span>
                      <Calendar size={14} />
                      {new Date(analise.dataAnalise).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
                {analise.anonimizado && (
                  <span className={styles.anonimizadoBadge}>
                    <Shield size={14} />
                    Anonimizado
                  </span>
                )}
              </div>

              <div className={styles.analiseStats}>
                <div className={styles.stat}>
                  <span className={styles.statValue}>{analise.riscos.length}</span>
                  <span className={styles.statLabel}>Riscos</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statValue}>
                    {analise.riscos.filter(r => r.tipo === 'alto').length}
                  </span>
                  <span className={styles.statLabel}>Altos</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statValue}>{analise.partes.length}</span>
                  <span className={styles.statLabel}>Partes</span>
                </div>
              </div>

              <div className={styles.analiseActions}>
                <Link
                  href={`/dashboard/visualizacao?id=${analise.id}`}
                  className={styles.actionButton}
                  onClick={() => handleVisualizar(analise.id)}
                >
                  <Eye size={18} />
                  Visualizar
                </Link>
                {!analise.anonimizado && (
                  <button
                    className={styles.actionButton}
                    onClick={(e) => handleAnonimizar(analise.id, e)}
                    title="Anonimizar análise"
                  >
                    <Shield size={18} />
                    Anonimizar
                  </button>
                )}
                <button
                  className={styles.deleteButton}
                  onClick={(e) => handleDeletar(analise.id, e)}
                  title="Excluir análise"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

