'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AlertTriangle, AlertCircle, Info, XCircle } from 'lucide-react';
import { obterAnaliseAtual, obterAnalisePorId } from '../../utils/storage';
import type { Analise } from '../../utils/storage';
import ExplanationPopup from '../../components/ExplanationPopup';
import styles from './page.module.css';

export default function RiscosPage() {
  const searchParams = useSearchParams();
  const [analise, setAnalise] = useState<Analise | null>(null);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      const analiseEncontrada = obterAnalisePorId(id);
      if (analiseEncontrada) {
        setAnalise(analiseEncontrada);
      }
    } else {
      const analiseAtual = obterAnaliseAtual();
      if (analiseAtual) {
        setAnalise(analiseAtual);
      }
    }
  }, [searchParams]);

  const riscos = analise?.riscos || [
    {
      tipo: 'alto',
      titulo: 'Cláusula de Rescisão Ambígua',
      descricao: 'A cláusula de rescisão não especifica claramente as condições de término do contrato, podendo gerar disputas futuras.',
      localizacao: 'Página 3, Seção 5.2',
      recomendacao: 'Recomenda-se revisar e especificar claramente as condições de rescisão, incluindo prazos e penalidades.'
    },
    {
      tipo: 'medio',
      titulo: 'Prazo de Pagamento Não Especificado',
      descricao: 'O contrato menciona valores mas não define claramente os prazos de pagamento.',
      localizacao: 'Página 2, Seção 3.1',
      recomendacao: 'Adicionar cláusula específica sobre prazos e formas de pagamento.'
    },
    {
      tipo: 'baixo',
      titulo: 'Falta de Cláusula de Confidencialidade Detalhada',
      descricao: 'A cláusula de confidencialidade existe mas poderia ser mais específica sobre o escopo das informações protegidas.',
      localizacao: 'Página 4, Seção 6.3',
      recomendacao: 'Expandir a cláusula de confidencialidade com mais detalhes sobre o que constitui informação confidencial.'
    },
    {
      tipo: 'alto',
      titulo: 'Ausência de Cláusula de Foro',
      descricao: 'O contrato não especifica o foro competente para resolução de disputas, o que pode causar problemas jurídicos.',
      localizacao: 'Documento completo',
      recomendacao: 'Adicionar cláusula de foro competente para evitar disputas sobre jurisdição.'
    },
    {
      tipo: 'medio',
      titulo: 'Valores Sem Ajuste Inflacionário',
      descricao: 'Os valores contratuais não mencionam ajuste inflacionário, o que pode impactar o valor real ao longo do tempo.',
      localizacao: 'Página 2, Seção 3.2',
      recomendacao: 'Considerar adicionar cláusula de reajuste baseada em índice de inflação.'
    }
  ];

  const getRiscoConfig = (tipo: string) => {
    switch (tipo) {
      case 'alto':
        return {
          icon: XCircle,
          color: '#ef4444',
          bgColor: 'rgba(239, 68, 68, 0.1)',
          borderColor: 'rgba(239, 68, 68, 0.3)',
          label: 'Alto Risco'
        };
      case 'medio':
        return {
          icon: AlertTriangle,
          color: '#f59e0b',
          bgColor: 'rgba(245, 158, 11, 0.1)',
          borderColor: 'rgba(245, 158, 11, 0.3)',
          label: 'Médio Risco'
        };
      default:
        return {
          icon: Info,
          color: '#3b82f6',
          bgColor: 'rgba(59, 130, 246, 0.1)',
          borderColor: 'rgba(59, 130, 246, 0.3)',
          label: 'Baixo Risco'
        };
    }
  };

  return (
    <div className={styles.riscosPage}>
      <div className={styles.header}>
        <h1>Identificação de Riscos e Inconsistências</h1>
        <p>Pontos sensíveis identificados pela IA que merecem atenção especial</p>
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
            <XCircle size={24} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statNumber}>2</span>
            <span className={styles.statLabel}>Riscos Altos</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
            <AlertTriangle size={24} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statNumber}>2</span>
            <span className={styles.statLabel}>Riscos Médios</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
            <Info size={24} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statNumber}>1</span>
            <span className={styles.statLabel}>Riscos Baixos</span>
          </div>
        </div>
      </div>

      <div className={styles.riscosList}>
        {riscos.map((risco, index) => {
          const config = getRiscoConfig(risco.tipo);
          const Icon = config.icon;
          
          return (
            <div
              key={index}
              className={styles.riscoCard}
              style={{
                borderColor: config.borderColor,
                background: config.bgColor
              }}
            >
              <div className={styles.riscoHeader}>
                <div className={styles.riscoIcon}>
                  <Icon size={24} style={{ color: config.color }} />
                </div>
                <div className={styles.riscoTitleSection}>
                  <div className={styles.riscoBadge} style={{ background: config.bgColor, color: config.color, borderColor: config.borderColor }}>
                    {config.label}
                  </div>
                  <h2>{risco.titulo}</h2>
                </div>
              </div>
              
              <div className={styles.riscoContent}>
                <p className={styles.riscoDescricao}>{risco.descricao}</p>
                
                <div className={styles.riscoInfo}>
                  <div className={styles.infoItem}>
                    <AlertCircle size={16} />
                    <span><strong>Localização:</strong> {risco.localizacao}</span>
                  </div>
                </div>
                
                <div className={styles.recomendacao}>
                  <h3>Recomendação</h3>
                  <p>{risco.recomendacao}</p>
                  {risco.justificativa && (
                    <div className={styles.justificativa}>
                      <ExplanationPopup justificativa={risco.justificativa}>
                        <span>Ver justificativa da IA</span>
                      </ExplanationPopup>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

