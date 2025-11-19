'use client';

import { useEffect, useState } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, History } from 'lucide-react';
import Link from 'next/link';
import { obterEstatisticas, obterTodasAnalises } from '../utils/storage';
import styles from './page.module.css';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalAnalises: 0,
    analisesConcluidas: 0,
    totalRiscos: 0,
    riscosAltos: 0
  });
  const [analisesRecentes, setAnalisesRecentes] = useState<any[]>([]);

  useEffect(() => {
    const estatisticas = obterEstatisticas();
    setStats(estatisticas);
    
    const todasAnalises = obterTodasAnalises();
    setAnalisesRecentes(todasAnalises.slice(0, 3));
  }, []);

  return (
    <div className={styles.dashboardPage}>
      <div className={styles.header}>
        <h1>Dashboard</h1>
        <p>Bem-vindo ao LexSight</p>
      </div>

      <div className={styles.quickActions}>
        <Link href="/dashboard/upload" className={styles.actionCard}>
          <Upload size={32} />
          <h3>Enviar Contrato</h3>
          <p>Faça upload de um novo documento para análise</p>
        </Link>
        <Link href="/dashboard/visualizacao" className={styles.actionCard}>
          <FileText size={32} />
          <h3>Ver Análises</h3>
          <p>Visualize análises anteriores</p>
        </Link>
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FileText size={24} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statNumber}>{stats.totalAnalises}</span>
            <span className={styles.statLabel}>Contratos Analisados</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <CheckCircle2 size={24} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statNumber}>{stats.analisesConcluidas}</span>
            <span className={styles.statLabel}>Análises Concluídas</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <AlertCircle size={24} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statNumber}>{stats.totalRiscos}</span>
            <span className={styles.statLabel}>Riscos Identificados</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
            <AlertCircle size={24} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statNumber}>{stats.riscosAltos}</span>
            <span className={styles.statLabel}>Riscos Altos</span>
          </div>
        </div>
      </div>

      {analisesRecentes.length > 0 && (
        <div className={styles.recentAnalises}>
          <div className={styles.sectionHeader}>
            <History size={24} />
            <h2>Análises Recentes</h2>
            <Link href="/dashboard/historico" className={styles.verTodas}>
              Ver todas
            </Link>
          </div>
          <div className={styles.analisesList}>
            {analisesRecentes.map((analise) => (
              <Link
                key={analise.id}
                href={`/dashboard/visualizacao?id=${analise.id}`}
                className={styles.analiseCard}
              >
                <div className={styles.analiseHeader}>
                  <FileText size={20} />
                  <h3>{analise.nomeDocumento}</h3>
                  {analise.anonimizado && (
                    <span className={styles.anonimizadoBadge}>Anonimizado</span>
                  )}
                </div>
                <div className={styles.analiseInfo}>
                  <span>{new Date(analise.dataAnalise).toLocaleDateString('pt-BR')}</span>
                  <span>{analise.riscos.length} riscos identificados</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

