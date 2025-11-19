'use client';

import { useState, useEffect } from 'react';
import { FileText, ArrowRight, Plus, X, AlertTriangle, CheckCircle2, Minus } from 'lucide-react';
import { obterTodasAnalises, obterAnalisePorId } from '../../utils/storage';
import type { Analise } from '../../utils/storage';
import styles from './page.module.css';

export default function ComparacaoPage() {
  const [analises, setAnalises] = useState<Analise[]>([]);
  const [analise1, setAnalise1] = useState<Analise | null>(null);
  const [analise2, setAnalise2] = useState<Analise | null>(null);
  const [mostrarComparacao, setMostrarComparacao] = useState(false);

  useEffect(() => {
    const todas = obterTodasAnalises();
    setAnalises(todas);
  }, []);

  const handleComparar = () => {
    if (analise1 && analise2) {
      setMostrarComparacao(true);
    }
  };

  const compararRiscos = (): {
    apenas1: Array<{ tipo: 'alto' | 'medio' | 'baixo'; titulo: string; descricao: string; localizacao: string; recomendacao: string; justificativa?: string }>;
    apenas2: Array<{ tipo: 'alto' | 'medio' | 'baixo'; titulo: string; descricao: string; localizacao: string; recomendacao: string; justificativa?: string }>;
    comuns: Array<{ tipo: 'alto' | 'medio' | 'baixo'; titulo: string; descricao: string; localizacao: string; recomendacao: string; justificativa?: string }>;
  } | null => {
    if (!analise1 || !analise2) return null;

    const riscos1 = analise1.riscos.map(r => r.titulo);
    const riscos2 = analise2.riscos.map(r => r.titulo);

    const apenas1 = riscos1.filter(r => !riscos2.includes(r));
    const apenas2 = riscos2.filter(r => !riscos1.includes(r));
    const comuns = riscos1.filter(r => riscos2.includes(r));

    return {
      apenas1: apenas1.map(titulo => analise1!.riscos.find(r => r.titulo === titulo)!).filter(Boolean),
      apenas2: apenas2.map(titulo => analise2!.riscos.find(r => r.titulo === titulo)!).filter(Boolean),
      comuns: comuns.map(titulo => analise1!.riscos.find(r => r.titulo === titulo)!).filter(Boolean)
    };
  };

  const compararValores = () => {
    if (!analise1 || !analise2) return null;

    const valor1 = analise1.valores.find(v => v.descricao.includes('total'))?.valor || 'N/A';
    const valor2 = analise2.valores.find(v => v.descricao.includes('total'))?.valor || 'N/A';

    return { valor1, valor2, diferentes: valor1 !== valor2 };
  };

  const compararPrazos = () => {
    if (!analise1 || !analise2) return null;

    const prazo1 = analise1.prazos.find(p => p.descricao.includes('vigência'))?.valor || 'N/A';
    const prazo2 = analise2.prazos.find(p => p.descricao.includes('vigência'))?.valor || 'N/A';

    return { prazo1, prazo2, diferentes: prazo1 !== prazo2 };
  };

  const diferencas = mostrarComparacao ? compararRiscos() : null;
  const valores = mostrarComparacao ? compararValores() : null;
  const prazos = mostrarComparacao ? compararPrazos() : null;

  return (
    <div className={styles.comparacaoPage}>
      <div className={styles.header}>
        <h1>Comparação de Documentos</h1>
        <p>Compare dois contratos para identificar diferenças e mudanças</p>
      </div>

      {!mostrarComparacao ? (
        <div className={styles.selecaoContainer}>
          <div className={styles.selecaoBox}>
            <h2>Documento 1</h2>
            <select
              className={styles.select}
              value={analise1?.id || ''}
              onChange={(e) => {
                const analise = obterAnalisePorId(e.target.value);
                setAnalise1(analise);
              }}
            >
              <option value="">Selecione um documento</option>
              {analises.map(a => (
                <option key={a.id} value={a.id}>
                  {a.nomeDocumento} - {new Date(a.dataAnalise).toLocaleDateString('pt-BR')}
                </option>
              ))}
            </select>
            {analise1 && (
              <div className={styles.analisePreview}>
                <FileText size={20} />
                <div>
                  <strong>{analise1.nomeDocumento}</strong>
                  <span>{analise1.riscos.length} riscos identificados</span>
                </div>
                <button
                  className={styles.removeButton}
                  onClick={() => setAnalise1(null)}
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          <div className={styles.arrow}>
            <ArrowRight size={32} />
          </div>

          <div className={styles.selecaoBox}>
            <h2>Documento 2</h2>
            <select
              className={styles.select}
              value={analise2?.id || ''}
              onChange={(e) => {
                const analise = obterAnalisePorId(e.target.value);
                setAnalise2(analise);
              }}
            >
              <option value="">Selecione um documento</option>
              {analises.filter(a => a.id !== analise1?.id).map(a => (
                <option key={a.id} value={a.id}>
                  {a.nomeDocumento} - {new Date(a.dataAnalise).toLocaleDateString('pt-BR')}
                </option>
              ))}
            </select>
            {analise2 && (
              <div className={styles.analisePreview}>
                <FileText size={20} />
                <div>
                  <strong>{analise2.nomeDocumento}</strong>
                  <span>{analise2.riscos.length} riscos identificados</span>
                </div>
                <button
                  className={styles.removeButton}
                  onClick={() => setAnalise2(null)}
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.comparacaoContainer}>
          <div className={styles.comparacaoHeader}>
            <div className={styles.docHeader}>
              <h3>{analise1?.nomeDocumento}</h3>
              <span>Documento 1</span>
            </div>
            <div className={styles.docHeader}>
              <h3>{analise2?.nomeDocumento}</h3>
              <span>Documento 2</span>
            </div>
          </div>

          <button
            className={styles.novaComparacao}
            onClick={() => {
              setMostrarComparacao(false);
              setAnalise1(null);
              setAnalise2(null);
            }}
          >
            <Plus size={18} />
            Nova Comparação
          </button>

          {valores && valores.diferentes && (
            <div className={styles.diferencaBox}>
              <h3>Diferenças nos Valores</h3>
              <div className={styles.comparacaoValores}>
                <div className={styles.valorItem}>
                  <span className={styles.label}>Valor Total:</span>
                  <span className={styles.valor}>{valores.valor1}</span>
                </div>
                <ArrowRight size={20} className={styles.arrowIcon} />
                <div className={styles.valorItem}>
                  <span className={styles.label}>Valor Total:</span>
                  <span className={styles.valor}>{valores.valor2}</span>
                </div>
              </div>
            </div>
          )}

          {prazos && prazos.diferentes && (
            <div className={styles.diferencaBox}>
              <h3>Diferenças nos Prazos</h3>
              <div className={styles.comparacaoValores}>
                <div className={styles.valorItem}>
                  <span className={styles.label}>Vigência:</span>
                  <span className={styles.valor}>{prazos.prazo1}</span>
                </div>
                <ArrowRight size={20} className={styles.arrowIcon} />
                <div className={styles.valorItem}>
                  <span className={styles.label}>Vigência:</span>
                  <span className={styles.valor}>{prazos.prazo2}</span>
                </div>
              </div>
            </div>
          )}

          {diferencas && (
            <div className={styles.riscosComparacao}>
              <h3>Comparação de Riscos</h3>

              {diferencas.apenas1 && diferencas.apenas1.length > 0 && (
                <div className={styles.riscosSection}>
                  <h4>
                    <Minus size={18} />
                    Apenas no Documento 1
                  </h4>
                  {diferencas.apenas1.map((risco, index) => (
                    <div key={index} className={styles.riscoItem}>
                      <AlertTriangle size={18} />
                      <div>
                        <strong>{risco.titulo}</strong>
                        <p>{risco.descricao}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {diferencas.comuns && diferencas.comuns.length > 0 && (
                <div className={styles.riscosSection}>
                  <h4>
                    <CheckCircle2 size={18} />
                    Presentes em Ambos
                  </h4>
                  {diferencas.comuns.map((risco, index) => (
                    <div key={index} className={styles.riscoItem}>
                      <AlertTriangle size={18} />
                      <div>
                        <strong>{risco.titulo}</strong>
                        <p>{risco.descricao}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {diferencas.apenas2 && diferencas.apenas2.length > 0 && (
                <div className={styles.riscosSection}>
                  <h4>
                    <Plus size={18} />
                    Apenas no Documento 2
                  </h4>
                  {diferencas.apenas2.map((risco, index) => (
                    <div key={index} className={styles.riscoItem}>
                      <AlertTriangle size={18} />
                      <div>
                        <strong>{risco.titulo}</strong>
                        <p>{risco.descricao}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {analise1 && analise2 && !mostrarComparacao && (
        <button className={styles.compararButton} onClick={handleComparar}>
          Comparar Documentos
          <ArrowRight size={20} />
        </button>
      )}
    </div>
  );
}

