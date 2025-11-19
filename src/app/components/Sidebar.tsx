'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Upload,
  FileSearch,
  AlertTriangle,
  FileText,
  Eye,
  ChevronLeft,
  ChevronRight,
  Home,
  Menu,
  History,
  GitCompare,
  LogOut
} from 'lucide-react';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Inicializar largura da sidebar
    document.documentElement.style.setProperty('--sidebar-width', isExpanded ? '280px' : '80px');
  }, [isExpanded]);

  const menuItems = [
    {
      icon: Home,
      label: 'Dashboard',
      href: '/dashboard',
      exact: true
    },
    {
      icon: Upload,
      label: 'Upload e Ingestão',
      href: '/dashboard/upload'
    },
    {
      icon: FileSearch,
      label: 'Extração Automática',
      href: '/dashboard/extracao'
    },
    {
      icon: AlertTriangle,
      label: 'Identificação de Riscos',
      href: '/dashboard/riscos'
    },
    {
      icon: FileText,
      label: 'Resumo Automático',
      href: '/dashboard/resumo'
    },
    {
      icon: Eye,
      label: 'Visualização da Análise',
      href: '/dashboard/visualizacao'
    },
    {
      icon: History,
      label: 'Histórico',
      href: '/dashboard/historico'
    },
    {
      icon: GitCompare,
      label: 'Comparação',
      href: '/dashboard/comparacao'
    }
  ];

  const isActive = (href: string, exact?: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  const toggleSidebar = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    const width = newState ? '280px' : '80px';
    document.documentElement.style.setProperty('--sidebar-width', width);
  };

  const handleLogout = () => {
    // Limpar dados de autenticação
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    
    // Redirecionar para a landing page
    router.push('/');
  };

  return (
    <>
      <button 
        className={styles.mobileToggle}
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        <Menu size={24} />
      </button>
      
      <aside 
        className={`${styles.sidebar} ${isExpanded ? styles.expanded : styles.collapsed} ${isMobileOpen ? styles.mobileOpen : ''}`}
        style={{ '--sidebar-width': isExpanded ? '280px' : '80px' } as React.CSSProperties}
      >
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <FileText size={24} />
            {isExpanded && <span>LexSight</span>}
          </div>
          <button
            className={styles.toggleButton}
            onClick={toggleSidebar}
            aria-label={isExpanded ? 'Recolher' : 'Expandir'}
          >
            {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        <nav className={styles.nav}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href, item.exact);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${active ? styles.active : ''}`}
                onClick={() => setIsMobileOpen(false)}
              >
                <Icon size={20} className={styles.navIcon} />
                {isExpanded && <span className={styles.navLabel}>{item.label}</span>}
                {!isExpanded && (
                  <span className={styles.tooltip}>{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <button
            className={styles.logoutButton}
            onClick={handleLogout}
            title="Sair"
          >
            <LogOut size={20} className={styles.navIcon} />
            {isExpanded && <span className={styles.navLabel}>Sair</span>}
            {!isExpanded && (
              <span className={styles.tooltip}>Sair</span>
            )}
          </button>
        </div>
      </aside>
      
      {isMobileOpen && (
        <div 
          className={styles.mobileOverlay}
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}

