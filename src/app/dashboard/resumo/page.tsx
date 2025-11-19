'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { FileText, Sparkles, Clock, Users, DollarSign } from 'lucide-react';
import { obterAnaliseAtual, obterAnalisePorId } from '../../utils/storage';
import type { Analise } from '../../utils/storage';
import styles from './page.module.css';

export default function ResumoPage() {
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

  // Mapear strings de ícones para componentes
  const iconMap: Record<string, React.ComponentType<any>> = {
    Users,
    DollarSign,
    Clock,
    FileText
  };

  const resumoDefault = {
    titulo: 'Resumo Executivo do Contrato',
    resumoCurto: 'Este contrato estabelece a prestação de serviços de consultoria em tecnologia entre a Empresa ABC Ltda (contratante) e a Empresa XYZ S.A. (contratada), com duração de 24 meses e valor total de R$ 500.000,00.',
    pontosPrincipais: [
      {
        icone: 'Users',
        titulo: 'Partes Envolvidas',
        descricao: 'Contrato entre Empresa ABC Ltda (contratante) e Empresa XYZ S.A. (contratada) para prestação de serviços de consultoria em tecnologia.'
      },
      {
        icone: 'DollarSign',
        titulo: 'Valor e Pagamento',
        descricao: 'Valor total de R$ 500.000,00, dividido em 24 parcelas mensais de R$ 20.833,33, pagas via transferência bancária até o dia 10 de cada mês.'
      },
      {
        icone: 'Clock',
        titulo: 'Prazo e Vigência',
        descricao: 'Contrato com vigência de 24 meses, iniciando em 01/01/2024 e terminando em 31/12/2025. Prazo de entrega dos serviços: 30 dias a partir da assinatura.'
      },
      {
        icone: 'FileText',
        titulo: 'Objeto e Escopo',
        descricao: 'Prestação de serviços de consultoria em tecnologia, incluindo análise de sistemas, desenvolvimento de soluções e suporte técnico especializado.'
      }
    ],
    observacoes: [
      'O contrato inclui cláusula de confidencialidade para proteção de informações sensíveis.',
      'Ambas as partes têm direito de rescisão com aviso prévio de 30 dias.',
      'Não há cláusula específica sobre ajuste inflacionário nos valores.',
      'O foro competente para resolução de disputas não está especificado no documento.'
    ]
  };

  const resumo = analise?.resumo || resumoDefault;

  return (
    <div className={styles.resumoPage}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerIcon}>
            <Sparkles size={32} />
          </div>
          <div>
            <h1>Resumo Automático do Documento</h1>
            <p>TL;DR - Resumo executivo gerado automaticamente pela IA</p>
          </div>
        </div>
      </div>

      <div className={styles.resumoBox}>
        <div className={styles.resumoHeader}>
          <FileText size={24} />
          <h2>{resumo.titulo}</h2>
        </div>
        <p className={styles.resumoTexto}>{resumo.resumoCurto}</p>
      </div>

      <div className={styles.pontosSection}>
        <h2 className={styles.sectionTitle}>Principais Pontos</h2>
        <div className={styles.pontosGrid}>
          {resumo.pontosPrincipais.map((ponto, index) => {
            const iconName = typeof ponto.icone === 'string' ? ponto.icone : (ponto.icone?.name || 'FileText');
            const Icon = iconMap[iconName] || FileText;
            return (
              <div key={index} className={styles.pontoCard}>
                <div className={styles.pontoIcon}>
                  <Icon size={24} />
                </div>
                <h3>{ponto.titulo}</h3>
                <p>{ponto.descricao}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.observacoesSection}>
        <h2 className={styles.sectionTitle}>Observações Importantes</h2>
        <div className={styles.observacoesList}>
          {resumo.observacoes.map((observacao, index) => (
            <div key={index} className={styles.observacaoItem}>
              <div className={styles.observacaoBullet}></div>
              <p>{observacao}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.footerNote}>
        <Sparkles size={20} />
        <p>Este resumo foi gerado automaticamente por IA e deve ser revisado por um profissional qualificado.</p>
      </div>
    </div>
  );
}

