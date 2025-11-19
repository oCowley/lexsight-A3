'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  Sparkles, 
  AlertTriangle, 
  Zap, 
  Shield, 
  TrendingUp,
  ArrowRight,
  Menu,
  X,
  CheckCircle2,
  Upload,
  FileSearch,
  Eye,
  History,
  GitCompare,
  Brain,
  Lock,
  BarChart3,
  Target,
  Clock,
  Users,
  DollarSign
} from 'lucide-react';
import styles from './page.module.css';
import AuthModal from './components/AuthModal';

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainFeatures = [
    {
      icon: Upload,
      title: 'Upload Inteligente',
      description: 'Envie contratos em PDF com validação automática. Suporte para múltiplos formatos com processamento instantâneo.',
      color: 'var(--blue-primary)'
    },
    {
      icon: FileSearch,
      title: 'Extração Automática',
      description: 'IA identifica automaticamente partes envolvidas, prazos, valores e cláusulas principais do contrato.',
      color: 'var(--blue-accent)'
    },
    {
      icon: AlertTriangle,
      title: 'Identificação de Riscos',
      description: 'Sistema destaca cláusulas de risco com classificação por nível (alto, médio, baixo) e recomendações.',
      color: '#f59e0b'
    },
    {
      icon: Brain,
      title: 'Resumo Automático (TL;DR)',
      description: 'Gere resumos executivos instantâneos com os principais pontos do contrato em linguagem simples.',
      color: '#8b5cf6'
    },
    {
      icon: Eye,
      title: 'Visualização Interativa',
      description: 'Visualize o documento com trechos destacados, insights e explicações da IA em tempo real.',
      color: '#10b981'
    },
    {
      icon: Sparkles,
      title: 'Justificativas da IA',
      description: 'Pop-ups explicativos mostram por que cada cláusula foi classificada, aumentando sua confiança na análise.',
      color: '#ec4899'
    }
  ];

  const advancedFeatures = [
    {
      icon: BarChart3,
      title: 'Dashboard Completo',
      description: 'Painel com estatísticas, análises recentes e visão geral de todos os seus contratos.',
      color: 'var(--blue-primary)'
    },
    {
      icon: Lock,
      title: 'Armazenamento Seguro',
      description: 'Seus documentos são protegidos com criptografia de ponta e armazenamento seguro.',
      color: '#10b981'
    },
    {
      icon: Shield,
      title: 'Anonimização de Dados',
      description: 'Proteja informações sensíveis com anonimização automática de CNPJs, valores e dados pessoais.',
      color: '#f59e0b'
    },
    {
      icon: History,
      title: 'Histórico Completo',
      description: 'Acesse todas as análises anteriores, compare versões e mantenha um histórico organizado.',
      color: '#8b5cf6'
    },
    {
      icon: GitCompare,
      title: 'Comparação de Documentos',
      description: 'Compare dois contratos lado a lado e identifique diferenças, mudanças e novos riscos.',
      color: '#ec4899'
    },
    {
      icon: Target,
      title: 'Destaque de Mudanças',
      description: 'Veja exatamente o que foi adicionado, removido ou alterado entre versões de contratos.',
      color: '#06b6d4'
    }
  ];

  const stats = [
    { number: '99.9%', label: 'Precisão', icon: Target },
    { number: '10s', label: 'Tempo Médio', icon: Clock },
    { number: '1000+', label: 'Contratos Analisados', icon: FileText },
    { number: '24/7', label: 'Disponibilidade', icon: Zap }
  ];

  const steps = [
    {
      number: '01',
      title: 'Upload do Documento',
      description: 'Faça upload do seu contrato em PDF. O sistema valida formato, tamanho e disponibilidade automaticamente.',
      icon: Upload
    },
    {
      number: '02',
      title: 'Análise Automática',
      description: 'Nossa IA processa o documento, extrai informações essenciais e identifica pontos críticos em segundos.',
      icon: Brain
    },
    {
      number: '03',
      title: 'Resultados Detalhados',
      description: 'Receba análise completa com marcações, insights, resumo executivo e recomendações personalizadas.',
      icon: Sparkles
    }
  ];

  return (
    <div className={styles.page}>
      {/* Navigation */}
      <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
        <div className={styles.navContainer}>
          <div className={styles.logo}>
            <FileText className={styles.logoIcon} />
            <span>LexSight</span>
          </div>
          <div className={styles.navLinks}>
            <a href="#features">Recursos</a>
            <a href="#como-funciona">Como Funciona</a>
            <a href="#recursos-avancados">Recursos Avançados</a>
            <button 
              className={styles.navButton}
              onClick={() => setIsAuthModalOpen(true)}
            >
              Entrar
            </button>
          </div>
          <button 
            className={styles.mobileMenuButton}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isMobileMenuOpen && (
          <div className={styles.mobileMenu}>
            <a href="#features" onClick={() => setIsMobileMenuOpen(false)}>Recursos</a>
            <a href="#como-funciona" onClick={() => setIsMobileMenuOpen(false)}>Como Funciona</a>
            <a href="#recursos-avancados" onClick={() => setIsMobileMenuOpen(false)}>Recursos Avançados</a>
            <button onClick={() => {
              setIsAuthModalOpen(true);
              setIsMobileMenuOpen(false);
            }}>
              Entrar
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.gradientOrb1}></div>
          <div className={styles.gradientOrb2}></div>
          <div className={styles.gridPattern}></div>
        </div>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <Sparkles size={16} />
            <span>Powered by IA Avançada</span>
          </div>
          <h1 className={styles.heroTitle}>
            Análise Inteligente de
            <span className={styles.heroTitleAccent}> Contratos</span>
            <br />
            <span className={styles.heroTitleSub}>Revolucione sua revisão jurídica</span>
          </h1>
          <p className={styles.heroDescription}>
            O LexSight utiliza inteligência artificial de última geração para extrair informações importantes, 
            identificar riscos, gerar resumos executivos e fornecer insights valiosos em segundos. 
            Tudo que você precisa para análise profissional de contratos em uma única plataforma.
          </p>
          <div className={styles.heroButtons}>
            <button 
              className={styles.primaryButton}
              onClick={() => setIsAuthModalOpen(true)}
            >
              Começar Agora
              <ArrowRight size={20} />
            </button>
            <button className={styles.secondaryButton}>
              Ver Demonstração
            </button>
          </div>
          <div className={styles.heroStats}>
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className={styles.stat} style={{ animationDelay: `${index * 0.1}s` }}>
                  <Icon size={24} className={styles.statIcon} />
                  <span className={styles.statNumber}>{stat.number}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.floatingCard}>
            <div className={styles.cardGlow}></div>
            <FileText className={styles.floatingIcon} />
            <div className={styles.cardParticles}>
              {[...Array(6)].map((_, i) => (
                <div key={i} className={styles.particle} style={{ '--delay': `${i * 0.5}s` } as React.CSSProperties}></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section id="features" className={styles.features}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Recursos Principais</span>
            <h2 className={styles.sectionTitle}>
              Tudo que você precisa para
              <span className={styles.titleAccent}> análise profissional</span>
            </h2>
            <p className={styles.sectionDescription}>
              Ferramentas poderosas alimentadas por IA para transformar sua forma de trabalhar com contratos
            </p>
          </div>
          <div className={styles.featuresGrid}>
            {mainFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className={styles.featureCard}
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    '--feature-color': feature.color
                  } as React.CSSProperties}
                >
                  <div className={styles.featureIconWrapper}>
                    <div className={styles.featureIconGlow}></div>
                    <Icon size={32} className={styles.featureIcon} />
                  </div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>{feature.description}</p>
                  <div className={styles.featureHoverEffect}></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="como-funciona" className={styles.howItWorks}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Processo Simples</span>
            <h2 className={styles.sectionTitle}>Como Funciona</h2>
            <p className={styles.sectionDescription}>
              Três passos simples para análise completa do seu contrato
            </p>
          </div>
          <div className={styles.steps}>
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div 
                  key={index} 
                  className={styles.step}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className={styles.stepNumber}>{step.number}</div>
                  <div className={styles.stepContent}>
                    <div className={styles.stepIcon}>
                      <Icon size={32} />
                    </div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={styles.stepConnector}>
                      <ArrowRight size={24} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section id="recursos-avancados" className={styles.advancedFeatures}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Recursos Avançados</span>
            <h2 className={styles.sectionTitle}>
              Funcionalidades <span className={styles.titleAccent}>profissionais</span>
            </h2>
            <p className={styles.sectionDescription}>
              Recursos adicionais para profissionais que precisam de mais controle e funcionalidades
            </p>
          </div>
          <div className={styles.featuresGrid}>
            {advancedFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className={styles.featureCard}
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    '--feature-color': feature.color
                  } as React.CSSProperties}
                >
                  <div className={styles.featureIconWrapper}>
                    <div className={styles.featureIconGlow}></div>
                    <Icon size={32} className={styles.featureIcon} />
                  </div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>{feature.description}</p>
                  <div className={styles.featureHoverEffect}></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaBackground}>
          <div className={styles.ctaGradient}></div>
        </div>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <Sparkles size={48} className={styles.ctaIcon} />
            <h2 className={styles.ctaTitle}>Pronto para revolucionar sua análise de contratos?</h2>
            <p className={styles.ctaDescription}>
              Junte-se a milhares de profissionais que já confiam no LexSight para análise inteligente de contratos
            </p>
            <div className={styles.ctaButtons}>
              <button 
                className={styles.primaryButton}
                onClick={() => setIsAuthModalOpen(true)}
              >
                Criar Conta Gratuita
                <ArrowRight size={20} />
              </button>
              <button className={styles.secondaryButton}>
                Agendar Demonstração
              </button>
            </div>
            <div className={styles.ctaFeatures}>
              <div className={styles.ctaFeature}>
                <CheckCircle2 size={20} />
                <span>Sem cartão de crédito</span>
              </div>
              <div className={styles.ctaFeature}>
                <CheckCircle2 size={20} />
                <span>Teste gratuito</span>
              </div>
              <div className={styles.ctaFeature}>
                <CheckCircle2 size={20} />
                <span>Suporte 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div className={styles.footerBrand}>
              <div className={styles.logo}>
                <FileText className={styles.logoIcon} />
                <span>LexSight</span>
              </div>
              <p>Análise inteligente de contratos com IA de última geração</p>
              <div className={styles.socialLinks}>
                <a href="#" aria-label="LinkedIn">LinkedIn</a>
                <a href="#" aria-label="Twitter">Twitter</a>
                <a href="#" aria-label="GitHub">GitHub</a>
              </div>
            </div>
            <div className={styles.footerLinks}>
              <div>
                <h4>Produto</h4>
                <a href="#features">Recursos</a>
                <a href="#como-funciona">Como Funciona</a>
                <a href="#recursos-avancados">Recursos Avançados</a>
                <a href="#">Preços</a>
              </div>
              <div>
                <h4>Empresa</h4>
                <a href="#">Sobre</a>
                <a href="#">Blog</a>
                <a href="#">Carreiras</a>
                <a href="#">Contato</a>
              </div>
              <div>
                <h4>Suporte</h4>
                <a href="#">Documentação</a>
                <a href="#">FAQ</a>
                <a href="#">Status</a>
                <a href="#">Segurança</a>
              </div>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>&copy; 2024 LexSight. Todos os direitos reservados.</p>
            <div className={styles.footerLegal}>
              <a href="#">Privacidade</a>
              <a href="#">Termos</a>
              <a href="#">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
}
