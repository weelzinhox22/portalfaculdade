import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Send, Loader, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getForumCategories, createForumTopic } from '../services/forumService';

const NewTopic = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category_id: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    loadCategories();
  }, [user, navigate]);

  const loadCategories = async () => {
    try {
      console.log('🔍 Carregando categorias...');
      
      // Limpar erros anteriores
      setErrors(prev => ({ ...prev, category_id: '' }));

      // Buscar categorias (com fallback automático)
      const data = await getForumCategories();
      console.log('📂 Categorias carregadas:', data);

      // Garantir que data é um array
      const categories = Array.isArray(data) ? data : [];
      setCategories(categories);
      
      if (categories.length > 0) {
        setFormData(prev => ({ ...prev, category_id: categories[0].id }));
        console.log('✅ Primeira categoria selecionada:', categories[0]);
      } else {
        console.warn('⚠️ Nenhuma categoria encontrada');
        setErrors(prev => ({ 
          ...prev, 
          category_id: 'Nenhuma categoria disponível no momento.' 
        }));
      }
    } catch (error) {
      console.error('❌ Erro ao carregar categorias:', error);
      setCategories([]);
      setErrors(prev => ({ 
        ...prev, 
        category_id: `Erro ao carregar categorias: ${error.message || 'Erro desconhecido'}` 
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Título é obrigatório';
    } else if (formData.title.length < 10) {
      newErrors.title = 'Título deve ter pelo menos 10 caracteres';
    } else if (formData.title.length > 200) {
      newErrors.title = 'Título deve ter no máximo 200 caracteres';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Conteúdo é obrigatório';
    } else if (formData.content.length < 20) {
      newErrors.content = 'Conteúdo deve ter pelo menos 20 caracteres';
    }

    if (!formData.category_id) {
      newErrors.category_id = 'Categoria é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      const newTopic = await createForumTopic({
        ...formData,
        user_id: user.id
      });

      console.log('✅ Tópico criado:', newTopic);
      
      // Redireciona para o tópico criado
      navigate(`/forum/topic/${newTopic.id}`);
    } catch (error) {
      console.error('❌ Erro ao criar tópico:', error);
      setErrors({ submit: 'Erro ao criar tópico. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(to bottom, #f8fafc, #ffffff)',
      paddingTop: '6rem'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <Link 
            to="/forum"
            style={{
              display: 'flex',
              alignItems: 'center',
              color: '#3b82f6',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '1rem'
            }}
          >
            <ArrowLeft style={{ width: '16px', height: '16px', marginRight: '0.5rem' }} />
            Voltar ao Fórum
          </Link>

          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            color: '#1f2937',
            marginBottom: '0.5rem'
          }}>
            ✍️ Criar Novo Tópico
          </h1>
          <p style={{
            color: '#6b7280',
            fontSize: '1.125rem'
          }}>
            Compartilhe suas dúvidas, experiências ou conhecimentos com a comunidade
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{
          background: 'white',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          {/* Category */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151'
              }}>
                📂 Categoria *
              </label>

              <button
                type="button"
                onClick={loadCategories}
                style={{
                  padding: '0.25rem 0.5rem',
                  background: '#f3f4f6',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.25rem',
                  fontSize: '0.75rem',
                  color: '#6b7280',
                  cursor: 'pointer'
                }}
              >
                🔄 Recarregar
              </button>
            </div>
            <select
              value={formData.category_id}
              onChange={(e) => handleChange('category_id', e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: `2px solid ${errors.category_id ? '#ef4444' : '#e5e7eb'}`,
                borderRadius: '0.5rem',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => {
                if (!errors.category_id) e.target.style.borderColor = '#3b82f6';
              }}
              onBlur={(e) => {
                if (!errors.category_id) e.target.style.borderColor = '#e5e7eb';
              }}
            >
              <option value="">
                {categories.length === 0 ? 'Carregando categorias...' : 'Selecione uma categoria'}
              </option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>

            {/* Debug info */}
            {process.env.NODE_ENV === 'development' && (
              <div style={{
                marginTop: '0.5rem',
                padding: '0.5rem',
                background: '#f3f4f6',
                borderRadius: '0.25rem',
                fontSize: '0.75rem',
                color: '#6b7280'
              }}>
                Debug: {categories.length} categorias carregadas
                {categories.length > 0 && (
                  <div>Primeira: {categories[0]?.name}</div>
                )}
              </div>
            )}
            {errors.category_id && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                color: '#ef4444',
                fontSize: '0.875rem',
                marginTop: '0.5rem'
              }}>
                <AlertCircle style={{ width: '16px', height: '16px', marginRight: '0.25rem' }} />
                {errors.category_id}
              </div>
            )}
          </div>

          {/* Title */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              📝 Título do Tópico *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Ex: Dúvida sobre protocolo de reabilitação pós-AVC"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: `2px solid ${errors.title ? '#ef4444' : '#e5e7eb'}`,
                borderRadius: '0.5rem',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => {
                if (!errors.title) e.target.style.borderColor = '#3b82f6';
              }}
              onBlur={(e) => {
                if (!errors.title) e.target.style.borderColor = '#e5e7eb';
              }}
            />
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '0.5rem'
            }}>
              {errors.title ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#ef4444',
                  fontSize: '0.875rem'
                }}>
                  <AlertCircle style={{ width: '16px', height: '16px', marginRight: '0.25rem' }} />
                  {errors.title}
                </div>
              ) : (
                <div></div>
              )}
              <span style={{
                fontSize: '0.75rem',
                color: formData.title.length > 200 ? '#ef4444' : '#6b7280'
              }}>
                {formData.title.length}/200
              </span>
            </div>
          </div>

          {/* Content */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              💬 Conteúdo *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => handleChange('content', e.target.value)}
              placeholder="Descreva sua dúvida, experiência ou conhecimento de forma detalhada..."
              rows={8}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: `2px solid ${errors.content ? '#ef4444' : '#e5e7eb'}`,
                borderRadius: '0.5rem',
                fontSize: '1rem',
                outline: 'none',
                resize: 'vertical',
                minHeight: '150px',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => {
                if (!errors.content) e.target.style.borderColor = '#3b82f6';
              }}
              onBlur={(e) => {
                if (!errors.content) e.target.style.borderColor = '#e5e7eb';
              }}
            />
            {errors.content && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                color: '#ef4444',
                fontSize: '0.875rem',
                marginTop: '0.5rem'
              }}>
                <AlertCircle style={{ width: '16px', height: '16px', marginRight: '0.25rem' }} />
                {errors.content}
              </div>
            )}
          </div>

          {/* Submit Message */}
          {errors.submit && (
            <div style={{
              background: errors.submit.includes('sucesso') ? '#dcfce7' : '#fef2f2',
              border: `1px solid ${errors.submit.includes('sucesso') ? '#bbf7d0' : '#fecaca'}`,
              borderRadius: '0.5rem',
              padding: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                color: errors.submit.includes('sucesso') ? '#16a34a' : '#dc2626'
              }}>
                <AlertCircle style={{ width: '20px', height: '20px', marginRight: '0.5rem' }} />
                {errors.submit}
              </div>
            </div>
          )}

          {/* Actions */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end'
          }}>
            <Link
              to="/forum"
              style={{
                padding: '0.75rem 1.5rem',
                border: '2px solid #e5e7eb',
                borderRadius: '0.5rem',
                color: '#6b7280',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.background = '#f9fafb';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.background = 'transparent';
              }}
            >
              Cancelar
            </Link>
            
            <button
              type="submit"
              disabled={loading}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                background: loading ? '#9ca3af' : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }
              }}
            >
              {loading ? (
                <Loader style={{ width: '16px', height: '16px', animation: 'spin 1s linear infinite' }} />
              ) : (
                <Send style={{ width: '16px', height: '16px' }} />
              )}
              {loading ? 'Criando...' : 'Criar Tópico'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTopic;