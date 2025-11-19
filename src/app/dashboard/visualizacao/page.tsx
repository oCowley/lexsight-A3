'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Eye, FileText, AlertTriangle, Sparkles, FileSearch, Highlighter, ChevronRight, DollarSign } from 'lucide-react';
import { obterAnaliseAtual, obterAnalisePorId, definirAnaliseAtual } from '../../utils/storage';
import type { Analise } from '../../utils/storage';
import ExplanationPopup from '../../components/ExplanationPopup';
import styles from './page.module.css';

export default function VisualizacaoPage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'documento' | 'destaques' | 'insights'>('documento');
  const [analise, setAnalise] = useState<Analise | null>(null);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      const analiseEncontrada = obterAnalisePorId(id);
      if (analiseEncontrada) {
        setAnalise(analiseEncontrada);
        definirAnaliseAtual(id);
      }
    } else {
      const analiseAtual = obterAnaliseAtual();
      if (analiseAtual) {
        setAnalise(analiseAtual);
      }
    }
  }, [searchParams]);

  const documento = analise?.documento || {
    titulo: 'Contrato de Prestação de Serviços',
    texto: `CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE CONSULTORIA EM TECNOLOGIA

Este contrato é celebrado entre:

CONTRATANTE: Empresa ABC Ltda, inscrita no CNPJ sob o nº 12.345.678/0001-90, com sede na Rua Exemplo, 123, São Paulo/SP.

CONTRATADA: Empresa XYZ S.A., inscrita no CNPJ sob o nº 98.765.432/0001-10, com sede na Av. Teste, 456, Rio de Janeiro/RJ.

CLÁUSULA PRIMEIRA - DO OBJETO

O presente contrato tem por objeto a prestação de serviços de consultoria em tecnologia, incluindo análise de sistemas, desenvolvimento de soluções e suporte técnico especializado.

CLÁUSULA SEGUNDA - DO VALOR E FORMA DE PAGAMENTO

2.1. O valor total do contrato é de R$ 500.000,00 (quinhentos mil reais), dividido em 24 (vinte e quatro) parcelas mensais de R$ 20.833,33 (vinte mil, oitocentos e trinta e três reais e trinta e três centavos).

2.2. O pagamento será efetuado mediante transferência bancária até o dia 10 (dez) de cada mês.

CLÁUSULA TERCEIRA - DO PRAZO E VIGÊNCIA

3.1. O presente contrato terá vigência de 24 (vinte e quatro) meses, iniciando-se em 01/01/2024 e terminando em 31/12/2025.

3.2. O prazo para entrega dos serviços é de 30 (trinta) dias a partir da assinatura do presente contrato.

CLÁUSULA QUARTA - DAS OBRIGAÇÕES DAS PARTES

4.1. São obrigações da CONTRATANTE:
a) Efetuar o pagamento nos prazos estipulados;
b) Fornecer informações necessárias para a execução dos serviços.

4.2. São obrigações da CONTRATADA:
a) Executar os serviços com qualidade e dentro dos prazos estabelecidos;
b) Manter sigilo sobre informações confidenciais.

CLÁUSULA QUINTA - DA RESCISÃO

5.1. O presente contrato poderá ser rescindido por qualquer das partes mediante aviso prévio de 30 (trinta) dias.

CLÁUSULA SEXTA - DA CONFIDENCIALIDADE

6.1. As partes comprometem-se a manter sigilo sobre informações confidenciais obtidas durante a execução do contrato.`
  };

  const trechosDestacados = analise?.trechosDestacados || [
    {
      texto: 'O valor total do contrato é de R$ 500.000,00',
      tipo: 'valor',
      pagina: 2,
      secao: 'CLÁUSULA SEGUNDA'
    },
    {
      texto: 'O presente contrato terá vigência de 24 (vinte e quatro) meses',
      tipo: 'prazo',
      pagina: 3,
      secao: 'CLÁUSULA TERCEIRA'
    },
    {
      texto: 'mediante aviso prévio de 30 (trinta) dias',
      tipo: 'risco',
      pagina: 5,
      secao: 'CLÁUSULA QUINTA'
    }
  ];

  const insights = analise?.insights || [
    {
      tipo: 'info',
      titulo: 'Valor Total Identificado',
      descricao: 'O contrato possui valor total de R$ 500.000,00, dividido em 24 parcelas mensais.',
      relevancia: 'alta'
    },
    {
      tipo: 'alerta',
      titulo: 'Prazo de Rescisão',
      descricao: 'A cláusula de rescisão permite término com apenas 30 dias de aviso prévio, o que pode ser considerado curto.',
      relevancia: 'alta'
    },
    {
      tipo: 'sucesso',
      titulo: 'Cláusula de Confidencialidade',
      descricao: 'O contrato inclui cláusula de confidencialidade adequada para proteção de informações sensíveis.',
      relevancia: 'media'
    }
  ];

  return (
    <div className={styles.visualizacaoPage}>
      <div className={styles.header}>
        <h1>Visualização da Análise</h1>
        <p>Visualize o documento, trechos destacados e insights gerados pela IA</p>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'documento' ? styles.active : ''}`}
          onClick={() => setActiveTab('documento')}
        >
          <FileText size={20} />
          Documento
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'destaques' ? styles.active : ''}`}
          onClick={() => setActiveTab('destaques')}
        >
          <Highlighter size={20} />
          Trechos Destacados
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'insights' ? styles.active : ''}`}
          onClick={() => setActiveTab('insights')}
        >
          <Sparkles size={20} />
          Insights
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'documento' && (
          <div className={styles.documentoView}>
            <div className={styles.documentoHeader}>
              <FileText size={24} />
              <h2>{documento.titulo}</h2>
            </div>
            <div className={styles.documentoTexto}>
              {documento.texto.split('\n').map((paragrafo, index) => (
                <p key={index}>{paragrafo || '\u00A0'}</p>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'destaques' && (
          <div className={styles.destaquesView}>
            <div className={styles.destaquesHeader}>
              <Highlighter size={24} />
              <h2>Trechos que Merecem Atenção</h2>
            </div>
            <div className={styles.destaquesList}>
              {trechosDestacados.map((trecho, index) => (
                <div key={index} className={styles.destaqueCard}>
                  <div className={styles.destaqueHeader}>
                    <div className={styles.destaqueBadge}>
                      {trecho.tipo === 'valor' && <DollarSign size={16} />}
                      {trecho.tipo === 'prazo' && <FileSearch size={16} />}
                      {trecho.tipo === 'risco' && <AlertTriangle size={16} />}
                      <span>{trecho.secao}</span>
                    </div>
                    <span className={styles.destaquePagina}>Página {trecho.pagina}</span>
                  </div>
                  <p className={styles.destaqueTexto}>{trecho.texto}</p>
                  <div className={styles.destaqueLink}>
                    <span>Ver no documento</span>
                    <ChevronRight size={16} />
                  </div>
                  {trecho.justificativa && (
                    <div className={styles.justificativa}>
                      <ExplanationPopup justificativa={trecho.justificativa}>
                        <span>Ver justificativa da IA</span>
                      </ExplanationPopup>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div className={styles.insightsView}>
            <div className={styles.insightsHeader}>
              <Sparkles size={24} />
              <h2>Insights e Explicações</h2>
            </div>
            <div className={styles.insightsList}>
              {insights.map((insight, index) => (
                <div
                  key={index}
                  className={`${styles.insightCard} ${styles[insight.tipo]}`}
                >
                  <div className={styles.insightHeader}>
                    {insight.tipo === 'info' && <FileSearch size={24} />}
                    {insight.tipo === 'alerta' && <AlertTriangle size={24} />}
                    {insight.tipo === 'sucesso' && <Eye size={24} />}
                    <div>
                      <h3>{insight.titulo}</h3>
                      <span className={styles.insightRelevancia}>
                        Relevância: {insight.relevancia}
                      </span>
                    </div>
                  </div>
                  <p>{insight.descricao}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

