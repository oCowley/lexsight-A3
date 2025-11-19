'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Mail, Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react';
import styles from './AuthModal.module.css';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (isLogin) {
      // Validação de login mockado
      if (formData.email === 'joao@gmail.com' && formData.password === '123456') {
        // Salvar estado de autenticação
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData.email);
        
        // Redirecionar para o dashboard
        onClose();
        router.push('/dashboard');
      } else {
        setError('Email ou senha incorretos. Use: joao@gmail.com / 123456');
        setIsLoading(false);
      }
    } else {
      // Cadastro - permite qualquer preenchimento
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', formData.email);
      onClose();
      router.push('/dashboard');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleClose = () => {
    setError('');
    setFormData({ name: '', email: '', password: '' });
    setIsLoading(false);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={handleClose}>
          <X size={24} />
        </button>
        
        <div className={styles.modalHeader}>
          <h2>{isLogin ? 'Entrar' : 'Criar Conta'}</h2>
          <p>
            {isLogin 
              ? 'Bem-vindo de volta ao LexSight' 
              : 'Comece sua jornada com análise inteligente'}
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {!isLogin && (
            <div className={styles.inputGroup}>
              <label htmlFor="name">
                <User size={18} />
                Nome Completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Seu nome completo"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="email">
              <Mail size={18} />
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">
              <Lock size={18} />
              Senha
            </label>
            <div className={styles.passwordInput}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <div className={styles.errorMessage}>
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          {isLogin && (
            <div className={styles.forgotPassword}>
              <a href="#">Esqueceu a senha?</a>
            </div>
          )}

          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Processando...' : (isLogin ? 'Entrar' : 'Criar Conta')}
          </button>
        </form>

        <div className={styles.modalFooter}>
          <p>
            {isLogin ? 'Não tem uma conta? ' : 'Já tem uma conta? '}
            <button
              type="button"
              className={styles.switchButton}
              onClick={() => {
                setIsLogin(!isLogin);
                setFormData({ name: '', email: '', password: '' });
                setError('');
              }}
            >
              {isLogin ? 'Criar conta' : 'Entrar'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

