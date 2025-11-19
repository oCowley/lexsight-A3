'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { FileSearch, Calendar, DollarSign, Users, FileText, CheckCircle2 } from 'lucide-react';
import { obterAnaliseAtual, obterAnalisePorId } from '../../utils/storage';
import type { Analise } from '../../utils/storage';
import styles from './page.module.css';

function ExtracaoContent() {
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

  const extractedData = analise ? {
    partes: analise.partes,
    prazos: analise.prazos,
    valores: analise.valores,
    clausulas: analise.clausulas
  } : {
    partes: [
      { nome: 'Empresa ABC Ltda', tipo: 'Contratante' },
      { nome: 'Empresa XYZ S.A.', tipo: 'Contratada' }
    ],
    prazos: [
      { descricao: 'Prazo de vigência', valor: '24 meses', data: '01/01/2024 - 31/12/2025' },
      { descricao: 'Prazo de entrega', valor: '30 dias', data: 'A partir da assinatura' }
    ],
    valores: [
      { descricao: 'Valor total do contrato', valor: 'R$ 500.000,00' },
      { descricao: 'Valor mensal', valor: 'R$ 20.833,33' },
      { descricao: 'Forma de pagamento', valor: 'Transferência bancária' }
    ],
    clausulas: [
      { titulo: 'Objeto do Contrato', descricao: 'Prestação de serviços de consultoria em tecnologia' },
      { titulo: 'Obrigações das Partes', descricao: 'Contratante: pagamento em dia. Contratada: entrega dos serviços conforme especificado.' },
      { titulo: 'Confidencialidade', descricao: 'Ambas as partes se comprometem a manter sigilo sobre informações confidenciais.' },
      { titulo: 'Rescisão', descricao: 'Contrato pode ser rescindido com aviso prévio de 30 dias.' }
    ]
  };

  return (
    <div className={styles.extracaoPage}>
      <div className={styles.header}>
        <h1>Extração Automática de Informações</h1>
        <p>Informações essenciais identificadas pela IA no documento</p>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <Users size={24} />
            <h2>Partes Envolvidas</h2>
          </div>
          <div className={styles.cardsGrid}>
            {extractedData.partes.map((parte, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.cardHeader}>
                  <Users size={20} />
                  <span className={styles.badge}>{parte.tipo}</span>
                </div>
                <h3>{parte.nome}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <Calendar size={24} />
            <h2>Prazos e Datas</h2>
          </div>
          <div className={styles.cardsGrid}>
            {extractedData.prazos.map((prazo, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.cardHeader}>
                  <Calendar size={20} />
                </div>
                <h3>{prazo.descricao}</h3>
                <p className={styles.cardValue}>{prazo.valor}</p>
                <p className={styles.cardDate}>{prazo.data}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <DollarSign size={24} />
            <h2>Valores e Pagamentos</h2>
          </div>
          <div className={styles.cardsGrid}>
            {extractedData.valores.map((valor, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.cardHeader}>
                  <DollarSign size={20} />
                </div>
                <h3>{valor.descricao}</h3>
                <p className={styles.cardValue}>{valor.valor}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <FileText size={24} />
            <h2>Cláusulas Principais</h2>
          </div>
          <div className={styles.clausulasList}>
            {extractedData.clausulas.map((clausula, index) => (
              <div key={index} className={styles.clausulaCard}>
                <div className={styles.clausulaHeader}>
                  <CheckCircle2 size={20} className={styles.checkIcon} />
                  <h3>{clausula.titulo}</h3>
                </div>
                <p>{clausula.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExtracaoPage() {
  return (
    <Suspense fallback={
      <div className={styles.extracaoPage}>
        <div className={styles.header}>
          <h1>Extração Automática de Informações</h1>
          <p>Carregando...</p>
        </div>
      </div>
    }>
      <ExtracaoContent />
    </Suspense>
  );
}

