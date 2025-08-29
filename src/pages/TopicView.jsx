import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Eye, Clock, Pin, Heart, Send, Loader, AlertCircle, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getForumTopic, getForumReplies, createForumReply, likeForumReply } from '../services/forumService';

const TopicView = () => {
  const { topicId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [topic, setTopic] = useState(null);
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyLoading, setReplyLoading] = useState(false);
  const [error, setError] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [replyError, setReplyError] = useState('');

  useEffect(() => {
    loadTopicData();
  }, [topicId]);

  const loadTopicData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [topicData, repliesData] = await Promise.all([
        getForumTopic(topicId),
        getForumReplies(topicId)
      ]);

      setTopic(topicData);
      setReplies(repliesData);
    } catch (err) {
      console.error('Erro ao carregar tópico:', err);
      setError('Erro ao carregar tópico. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Você precisa estar logado para responder.');
      return;
    }

    if (!replyContent.trim()) {
      setReplyError('Conteúdo da resposta é obrigatório');
      return;
    }

    if (replyContent.length < 10) {
      setReplyError('Resposta deve ter pelo menos 10 caracteres');
      return;
    }

    setReplyLoading(true);
    setReplyError('');

    try {
      const newReply = await createForumReply({
        topic_id: topicId,
        user_id: user.id,
        content: replyContent.trim()
      });

      setReplies(prev => [...prev, newReply]);
      setReplyContent('');
      
      // Atualizar contador de respostas do tópico
      setTopic(prev => ({
        ...prev,
        replies_count: prev.replies_count + 1
      }));
    } catch (err) {
      console.error('Erro ao criar resposta:', err);
      setReplyError('Erro ao enviar resposta. Tente novamente.');
    } finally {
      setReplyLoading(false);
    }
  };

  const handleLikeReply = async (replyId) => {
    if (!user) {
      alert('Você precisa estar logado para curtir.');
      return;
    }

    try {
      const isLiked = await likeForumReply(replyId, user.id);
      
      setReplies(prev => prev.map(reply => 
        reply.id === replyId 
          ? { 
              ...reply, 
              likes_count: isLiked ? reply.likes_count + 1 : reply.likes_count - 1,
              user_liked: isLiked
            }
          : reply
      ));
    } catch (err) {
      console.error('Erro ao curtir resposta:', err);
    }
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Agora mesmo';
    if (diffInHours < 24) return `${diffInHours}h atrás`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d atrás`;
    
    return date.toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(to bottom, #f8fafc, #ffffff)',
        paddingTop: '6rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ textAlign: 'center', color: '#6b7280' }}>
          <Loader style={{ width: '32px', height: '32px', animation: 'spin 1s linear infinite', margin: '0 auto 1rem' }} />
          <p>Carregando tópico...</p>
        </div>
      </div>
    );
  }

  if (error || !topic) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(to bottom, #f8fafc, #ffffff)',
        paddingTop: '6rem'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', textAlign: 'center' }}>
          <AlertCircle style={{ width: '48px', height: '48px', color: '#ef4444', margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
            Tópico não encontrado
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
            {error || 'O tópico que você está procurando não existe ou foi removido.'}
          </p>
          <Link
            to="/forum"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.75rem 1.5rem',
              background: '#3b82f6',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '0.5rem',
              fontWeight: '600'
            }}
          >
            <ArrowLeft style={{ width: '16px', height: '16px', marginRight: '0.5rem' }} />
            Voltar ao Fórum
          </Link>
        </div>
      </div>
    );
  }

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
        </div>

        {/* Topic */}
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb',
          marginBottom: '2rem'
        }}>
          {/* Topic Header */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              {topic.is_pinned && (
                <Pin style={{ width: '16px', height: '16px', color: '#f59e0b' }} />
              )}
              <span style={{
                background: topic.forum_categories?.color + '20',
                color: topic.forum_categories?.color,
                padding: '0.25rem 0.75rem',
                borderRadius: '1rem',
                fontSize: '0.75rem',
                fontWeight: '600'
              }}>
                {topic.forum_categories?.icon} {topic.forum_categories?.name}
              </span>
            </div>

            <h1 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '1rem',
              lineHeight: '1.3'
            }}>
              {topic.title}
            </h1>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              fontSize: '0.875rem',
              color: '#6b7280'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: '#3b82f6',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '0.875rem'
                }}>
                  {topic.profiles?.avatar_url ? (
                    <img 
                      src={topic.profiles.avatar_url} 
                      alt="Avatar"
                      style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                    />
                  ) : (
                    <User style={{ width: '16px', height: '16px' }} />
                  )}
                </div>
                <span>{topic.profiles?.full_name || 'Usuário'}</span>
              </div>
              <span>•</span>
              <span>{formatTimeAgo(topic.created_at)}</span>
              <span>•</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Eye style={{ width: '16px', height: '16px' }} />
                <span>{topic.views} visualizações</span>
              </div>
              <span>•</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <MessageSquare style={{ width: '16px', height: '16px' }} />
                <span>{topic.replies_count} respostas</span>
              </div>
            </div>
          </div>

          {/* Topic Content */}
          <div style={{
            fontSize: '1rem',
            lineHeight: '1.6',
            color: '#374151',
            whiteSpace: 'pre-wrap'
          }}>
            {topic.content}
          </div>
        </div>

        {/* Replies */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '1rem'
          }}>
            💬 Respostas ({replies.length})
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {replies.map((reply, index) => (
              <div
                key={reply.id}
                style={{
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e5e7eb'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: '#3b82f6',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '0.875rem'
                    }}>
                      {reply.profiles?.avatar_url ? (
                        <img 
                          src={reply.profiles.avatar_url} 
                          alt="Avatar"
                          style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                        />
                      ) : (
                        <User style={{ width: '20px', height: '20px' }} />
                      )}
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', color: '#1f2937' }}>
                        {reply.profiles?.full_name || 'Usuário'}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        {formatTimeAgo(reply.created_at)}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{
                      background: '#f3f4f6',
                      color: '#6b7280',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.75rem'
                    }}>
                      #{index + 1}
                    </span>
                  </div>
                </div>

                <div style={{
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  color: '#374151',
                  marginBottom: '1rem',
                  whiteSpace: 'pre-wrap'
                }}>
                  {reply.content}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <button
                    onClick={() => handleLikeReply(reply.id)}
                    disabled={!user}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      background: 'transparent',
                      border: 'none',
                      color: reply.user_liked ? '#ef4444' : '#6b7280',
                      cursor: user ? 'pointer' : 'not-allowed',
                      fontSize: '0.875rem',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.5rem',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (user) e.target.style.background = '#f3f4f6';
                    }}
                    onMouseLeave={(e) => {
                      if (user) e.target.style.background = 'transparent';
                    }}
                  >
                    <Heart 
                      style={{ 
                        width: '16px', 
                        height: '16px',
                        fill: reply.user_liked ? '#ef4444' : 'none'
                      }} 
                    />
                    <span>{reply.likes_count}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {replies.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              color: '#6b7280'
            }}>
              <MessageSquare style={{ width: '48px', height: '48px', margin: '0 auto 1rem', opacity: 0.5 }} />
              <p>Nenhuma resposta ainda. Seja o primeiro a responder!</p>
            </div>
          )}
        </div>

        {/* Reply Form */}
        {user ? (
          <div style={{
            background: 'white',
            borderRadius: '1rem',
            padding: '2rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              ✍️ Sua Resposta
            </h3>

            <form onSubmit={handleReplySubmit}>
              <textarea
                value={replyContent}
                onChange={(e) => {
                  setReplyContent(e.target.value);
                  if (replyError) setReplyError('');
                }}
                placeholder="Escreva sua resposta..."
                rows={4}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `2px solid ${replyError ? '#ef4444' : '#e5e7eb'}`,
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  outline: 'none',
                  resize: 'vertical',
                  minHeight: '100px',
                  marginBottom: '1rem',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => {
                  if (!replyError) e.target.style.borderColor = '#3b82f6';
                }}
                onBlur={(e) => {
                  if (!replyError) e.target.style.borderColor = '#e5e7eb';
                }}
              />

              {replyError && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#ef4444',
                  fontSize: '0.875rem',
                  marginBottom: '1rem'
                }}>
                  <AlertCircle style={{ width: '16px', height: '16px', marginRight: '0.25rem' }} />
                  {replyError}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="submit"
                  disabled={replyLoading || !replyContent.trim()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    background: replyLoading || !replyContent.trim() ? '#9ca3af' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontWeight: '600',
                    cursor: replyLoading || !replyContent.trim() ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!replyLoading && replyContent.trim()) {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!replyLoading && replyContent.trim()) {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }
                  }}
                >
                  {replyLoading ? (
                    <Loader style={{ width: '16px', height: '16px', animation: 'spin 1s linear infinite' }} />
                  ) : (
                    <Send style={{ width: '16px', height: '16px' }} />
                  )}
                  {replyLoading ? 'Enviando...' : 'Responder'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div style={{
            background: '#f8fafc',
            border: '2px dashed #d1d5db',
            borderRadius: '1rem',
            padding: '2rem',
            textAlign: 'center',
            color: '#6b7280'
          }}>
            <User style={{ width: '48px', height: '48px', margin: '0 auto 1rem', opacity: 0.5 }} />
            <p style={{ marginBottom: '1rem' }}>Você precisa estar logado para responder a este tópico.</p>
            <Link
              to="/login"
              style={{
                display: 'inline-block',
                padding: '0.75rem 1.5rem',
                background: '#3b82f6',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '0.5rem',
                fontWeight: '600'
              }}
            >
              Fazer Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicView;
