// Tipos para as análises
export interface Analise {
  id: string;
  nomeDocumento: string;
  dataUpload: string;
  dataAnalise: string;
  status: 'processando' | 'concluido' | 'erro';
  partes: Array<{ nome: string; tipo: string }>;
  prazos: Array<{ descricao: string; valor: string; data: string }>;
  valores: Array<{ descricao: string; valor: string }>;
  clausulas: Array<{ titulo: string; descricao: string }>;
  riscos: Array<{
    tipo: 'alto' | 'medio' | 'baixo';
    titulo: string;
    descricao: string;
    localizacao: string;
    recomendacao: string;
    justificativa?: string;
  }>;
  resumo: {
    titulo: string;
    resumoCurto: string;
    pontosPrincipais: Array<{ icone?: string; titulo: string; descricao: string }>;
    observacoes: string[];
  };
  documento: {
    titulo: string;
    texto: string;
  };
  trechosDestacados: Array<{
    texto: string;
    tipo: string;
    pagina: number;
    secao: string;
    justificativa?: string;
  }>;
  insights: Array<{
    tipo: 'info' | 'alerta' | 'sucesso';
    titulo: string;
    descricao: string;
    relevancia: string;
  }>;
  anonimizado: boolean;
}

const STORAGE_KEY = 'lexsight_analises';
const CURRENT_ANALISE_KEY = 'lexsight_analise_atual';

// Gerar dados mockados para uma análise
export function gerarAnaliseMockada(nomeDocumento: string): Analise {
  const id = `analise_${Date.now()}`;
  const agora = new Date().toISOString();

  return {
    id,
    nomeDocumento,
    dataUpload: agora,
    dataAnalise: agora,
    status: 'concluido',
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
    ],
    riscos: [
      {
        tipo: 'alto',
        titulo: 'Cláusula de Rescisão Ambígua',
        descricao: 'A cláusula de rescisão não especifica claramente as condições de término do contrato, podendo gerar disputas futuras.',
        localizacao: 'Página 3, Seção 5.2',
        recomendacao: 'Recomenda-se revisar e especificar claramente as condições de rescisão, incluindo prazos e penalidades.',
        justificativa: 'A IA identificou que a cláusula de rescisão possui linguagem vaga que pode levar a interpretações conflitantes. Cláusulas de rescisão ambíguas são uma das principais causas de litígios contratuais.'
      },
      {
        tipo: 'medio',
        titulo: 'Prazo de Pagamento Não Especificado',
        descricao: 'O contrato menciona valores mas não define claramente os prazos de pagamento.',
        localizacao: 'Página 2, Seção 3.1',
        recomendacao: 'Adicionar cláusula específica sobre prazos e formas de pagamento.',
        justificativa: 'A ausência de especificação clara de prazos de pagamento pode causar atrasos e disputas financeiras. É uma prática recomendada definir explicitamente datas e condições de pagamento.'
      },
      {
        tipo: 'baixo',
        titulo: 'Falta de Cláusula de Confidencialidade Detalhada',
        descricao: 'A cláusula de confidencialidade existe mas poderia ser mais específica sobre o escopo das informações protegidas.',
        localizacao: 'Página 4, Seção 6.3',
        recomendacao: 'Expandir a cláusula de confidencialidade com mais detalhes sobre o que constitui informação confidencial.',
        justificativa: 'Cláusulas de confidencialidade genéricas podem não oferecer proteção adequada. Detalhar o escopo aumenta a segurança jurídica.'
      },
      {
        tipo: 'alto',
        titulo: 'Ausência de Cláusula de Foro',
        descricao: 'O contrato não especifica o foro competente para resolução de disputas, o que pode causar problemas jurídicos.',
        localizacao: 'Documento completo',
        recomendacao: 'Adicionar cláusula de foro competente para evitar disputas sobre jurisdição.',
        justificativa: 'A ausência de cláusula de foro pode resultar em disputas sobre qual tribunal tem jurisdição, aumentando custos e tempo de resolução de conflitos.'
      },
      {
        tipo: 'medio',
        titulo: 'Valores Sem Ajuste Inflacionário',
        descricao: 'Os valores contratuais não mencionam ajuste inflacionário, o que pode impactar o valor real ao longo do tempo.',
        localizacao: 'Página 2, Seção 3.2',
        recomendacao: 'Considerar adicionar cláusula de reajuste baseada em índice de inflação.',
        justificativa: 'Contratos de longo prazo sem ajuste inflacionário podem resultar em perda de valor real, especialmente em períodos de alta inflação.'
      }
    ],
    resumo: {
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
    },
    documento: {
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
    },
    trechosDestacados: [
      {
        texto: 'O valor total do contrato é de R$ 500.000,00',
        tipo: 'valor',
        pagina: 2,
        secao: 'CLÁUSULA SEGUNDA',
        justificativa: 'Este trecho foi destacado por conter informação financeira crítica que requer atenção especial durante a revisão.'
      },
      {
        texto: 'O presente contrato terá vigência de 24 (vinte e quatro) meses',
        tipo: 'prazo',
        pagina: 3,
        secao: 'CLÁUSULA TERCEIRA',
        justificativa: 'Prazos contratuais são elementos essenciais que impactam diretamente no planejamento e execução do acordo.'
      },
      {
        texto: 'mediante aviso prévio de 30 (trinta) dias',
        tipo: 'risco',
        pagina: 5,
        secao: 'CLÁUSULA QUINTA',
        justificativa: 'Este prazo de rescisão pode ser considerado curto e merece análise cuidadosa para evitar surpresas desagradáveis.'
      }
    ],
    insights: [
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
    ],
    anonimizado: false
  };
}

// Funções de armazenamento
export function salvarAnalise(analise: Analise): void {
  const analises = obterTodasAnalises();
  analises.unshift(analise); // Adiciona no início
  localStorage.setItem(STORAGE_KEY, JSON.stringify(analises));
  localStorage.setItem(CURRENT_ANALISE_KEY, analise.id);
}

export function obterTodasAnalises(): Analise[] {
  if (typeof window === 'undefined') return [];
  const dados = localStorage.getItem(STORAGE_KEY);
  return dados ? JSON.parse(dados) : [];
}

export function obterAnalisePorId(id: string): Analise | null {
  const analises = obterTodasAnalises();
  return analises.find(a => a.id === id) || null;
}

export function obterAnaliseAtual(): Analise | null {
  if (typeof window === 'undefined') return null;
  const idAtual = localStorage.getItem(CURRENT_ANALISE_KEY);
  if (!idAtual) return null;
  return obterAnalisePorId(idAtual);
}

export function definirAnaliseAtual(id: string): void {
  localStorage.setItem(CURRENT_ANALISE_KEY, id);
}

export function deletarAnalise(id: string): void {
  const analises = obterTodasAnalises();
  const filtradas = analises.filter(a => a.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtradas));
  
  const idAtual = localStorage.getItem(CURRENT_ANALISE_KEY);
  if (idAtual === id) {
    localStorage.removeItem(CURRENT_ANALISE_KEY);
  }
}

export function anonimizarAnalise(id: string): Analise | null {
  const analise = obterAnalisePorId(id);
  if (!analise) return null;

  const analiseAnonimizada: Analise = {
    ...analise,
    anonimizado: true,
    partes: analise.partes.map(p => ({
      ...p,
      nome: p.nome.replace(/[A-Za-z0-9]/g, '*').substring(0, 10) + ' [ANONIMIZADO]'
    })),
    documento: {
      ...analise.documento,
      texto: analise.documento.texto
        .replace(/\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/g, '**.***.***/****-**') // CNPJ
        .replace(/R\$ [\d.,]+/g, 'R$ ***.***') // Valores
        .replace(/\d{2}\/\d{2}\/\d{4}/g, '**/**/****') // Datas
    }
  };

  const analises = obterTodasAnalises();
  const index = analises.findIndex(a => a.id === id);
  if (index !== -1) {
    analises[index] = analiseAnonimizada;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(analises));
  }

  return analiseAnonimizada;
}

export function obterEstatisticas() {
  const analises = obterTodasAnalises();
  const concluidas = analises.filter(a => a.status === 'concluido');
  const totalRiscos = concluidas.reduce((acc, a) => acc + a.riscos.length, 0);
  const riscosAltos = concluidas.reduce((acc, a) => acc + a.riscos.filter(r => r.tipo === 'alto').length, 0);

  return {
    totalAnalises: analises.length,
    analisesConcluidas: concluidas.length,
    totalRiscos,
    riscosAltos
  };
}

