import React, { useState, useEffect } from 'react';
import { Copy, Share2, DollarSign, Users, TrendingUp, Link as LinkIcon, CheckCircle } from 'lucide-react';

const AffiliateProgram = ({ userName = 'Usuário' }) => {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [affiliateStats, setAffiliateStats] = useState({
    referrals: 0,
    pendingCommission: 0,
    totalEarned: 0,
    clickCount: 0,
    conversionRate: 0
  });
  const [affiliateLink, setAffiliateLink] = useState('');
  const [showEnrollForm, setShowEnrollForm] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({
    name: '',
    email: '',
    paymentMethod: 'pix',
    pixKey: '',
    bankAccount: {
      bank: '',
      agency: '',
      account: '',
      accountType: 'corrente'
    }
  });
  const [linkCopied, setLinkCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulating API call to get affiliate data
    const fetchAffiliateData = () => {
      setTimeout(() => {
        // For demo purposes, check localStorage
        const enrolled = localStorage.getItem('isAffiliateEnrolled') === 'true';
        
        if (enrolled) {
          setIsEnrolled(true);
          setAffiliateLink(`https://fisiowel.com.br/ref/${btoa(userName.toLowerCase().replace(' ', '-'))}`);
          
          // Mock stats
          setAffiliateStats({
            referrals: Math.floor(Math.random() * 10),
            pendingCommission: parseFloat((Math.random() * 200).toFixed(2)),
            totalEarned: parseFloat((Math.random() * 500).toFixed(2)),
            clickCount: Math.floor(Math.random() * 100),
            conversionRate: parseFloat((Math.random() * 10).toFixed(1))
          });
          
          // Mock payment info
          setPaymentInfo({
            name: userName,
            email: `${userName.toLowerCase().replace(' ', '.')}@example.com`,
            paymentMethod: 'pix',
            pixKey: '12345678900',
            bankAccount: {
              bank: '',
              agency: '',
              account: '',
              accountType: 'corrente'
            }
          });
        }
        
        setIsLoading(false);
      }, 1000); // Simulate network delay
    };
    
    fetchAffiliateData();
  }, [userName]);
  
  const handleEnroll = (e) => {
    e.preventDefault();
    // This would typically call an API to enroll in affiliate program
    localStorage.setItem('isAffiliateEnrolled', 'true');
    setIsEnrolled(true);
    setAffiliateLink(`https://fisiowel.com.br/ref/${btoa(userName.toLowerCase().replace(' ', '-'))}`);
    setShowEnrollForm(false);
    
    // Initialize stats
    setAffiliateStats({
      referrals: 0,
      pendingCommission: 0,
      totalEarned: 0,
      clickCount: 0,
      conversionRate: 0
    });
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(affiliateLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 3000);
  };
  
  const handleShareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'FisioWel - Portal de Fisioterapia',
        text: 'Confira este incrível portal de conteúdo para fisioterapeutas!',
        url: affiliateLink,
      });
    } else {
      handleCopyLink();
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setPaymentInfo(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setPaymentInfo(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleUpdatePaymentInfo = (e) => {
    e.preventDefault();
    // This would typically call an API to update payment info
    alert('Informações de pagamento atualizadas com sucesso!');
  };
  
  if (isLoading) {
    return (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center',
        color: '#64748b'
      }}>
        <div style={{ 
          display: 'inline-block',
          width: '40px',
          height: '40px',
          border: '3px solid rgba(13, 148, 136, 0.3)',
          borderRadius: '50%',
          borderTopColor: '#0d9488',
          animation: 'spin 1s linear infinite'
        }} />
        <p>Carregando informações do programa de afiliados...</p>
        
        <style jsx>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }
  
  return (
    <div style={{ 
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem 1rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ 
        fontSize: '1.75rem', 
        fontWeight: '700',
        marginBottom: '1.5rem'
      }}>
        Programa de Afiliados
      </h1>
      
      {!isEnrolled ? (
        <div style={{ 
          background: 'white',
          borderRadius: '1rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '50%', 
              background: '#0d9488',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <DollarSign size={24} color="white" />
            </div>
            <div>
              <h2 style={{ 
                margin: '0 0 0.25rem', 
                fontSize: '1.25rem', 
                fontWeight: '600' 
              }}>
                Torne-se um Afiliado
              </h2>
              <p style={{ margin: 0, color: '#64748b' }}>
                Ganhe comissões indicando novos assinantes para o FisioWel
              </p>
            </div>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ 
              fontSize: '1.1rem', 
              fontWeight: '600',
              marginBottom: '1rem'
            }}>
              Como funciona:
            </h3>
            <ul style={{ 
              padding: '0 0 0 1.25rem', 
              margin: '0 0 1.5rem',
              color: '#334155'
            }}>
              <li style={{ marginBottom: '0.75rem' }}>
                <span style={{ fontWeight: '500' }}>Compartilhe seu link único</span> com colegas fisioterapeutas
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <span style={{ fontWeight: '500' }}>Ganhe 20% de comissão</span> em cada nova assinatura realizada através do seu link
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <span style={{ fontWeight: '500' }}>Receba pagamentos mensais</span> diretamente na sua conta
              </li>
              <li>
                <span style={{ fontWeight: '500' }}>Acompanhe seus ganhos</span> através do painel de afiliados
              </li>
            </ul>
          </div>
          
          {showEnrollForm ? (
            <form onSubmit={handleEnroll}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label 
                  htmlFor="name" 
                  style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}
                >
                  Nome Completo
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required
                  value={paymentInfo.name}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label 
                  htmlFor="email" 
                  style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}
                >
                  Email
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required
                  value={paymentInfo.email}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label 
                  style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}
                >
                  Método de Pagamento
                </label>
                
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    cursor: 'pointer',
                    padding: '0.75rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '0.5rem',
                    flex: '1',
                    background: paymentInfo.paymentMethod === 'pix' ? 'rgba(13, 148, 136, 0.1)' : 'transparent',
                    borderColor: paymentInfo.paymentMethod === 'pix' ? '#0d9488' : '#cbd5e1'
                  }}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="pix" 
                      checked={paymentInfo.paymentMethod === 'pix'}
                      onChange={handleInputChange}
                      style={{ margin: 0 }}
                    />
                    <span>PIX</span>
                  </label>
                  
                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    cursor: 'pointer',
                    padding: '0.75rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '0.5rem',
                    flex: '1',
                    background: paymentInfo.paymentMethod === 'bank' ? 'rgba(13, 148, 136, 0.1)' : 'transparent',
                    borderColor: paymentInfo.paymentMethod === 'bank' ? '#0d9488' : '#cbd5e1'
                  }}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="bank" 
                      checked={paymentInfo.paymentMethod === 'bank'}
                      onChange={handleInputChange}
                      style={{ margin: 0 }}
                    />
                    <span>Conta Bancária</span>
                  </label>
                </div>
              </div>
              
              {paymentInfo.paymentMethod === 'pix' && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <label 
                    htmlFor="pixKey" 
                    style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}
                  >
                    Chave PIX
                  </label>
                  <input 
                    type="text" 
                    id="pixKey" 
                    name="pixKey" 
                    required
                    value={paymentInfo.pixKey}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>
              )}
              
              {paymentInfo.paymentMethod === 'bank' && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <label 
                      htmlFor="bank" 
                      style={{ 
                        display: 'block', 
                        marginBottom: '0.5rem',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}
                    >
                      Banco
                    </label>
                    <input 
                      type="text" 
                      id="bank" 
                      name="bankAccount.bank" 
                      required={paymentInfo.paymentMethod === 'bank'}
                      value={paymentInfo.bankAccount.bank}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.875rem'
                      }}
                    />
                  </div>
                  
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ flex: '1' }}>
                      <label 
                        htmlFor="agency" 
                        style={{ 
                          display: 'block', 
                          marginBottom: '0.5rem',
                          fontSize: '0.875rem',
                          fontWeight: '500'
                        }}
                      >
                        Agência
                      </label>
                      <input 
                        type="text" 
                        id="agency" 
                        name="bankAccount.agency" 
                        required={paymentInfo.paymentMethod === 'bank'}
                        value={paymentInfo.bankAccount.agency}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          borderRadius: '0.5rem',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.875rem'
                        }}
                      />
                    </div>
                    
                    <div style={{ flex: '1' }}>
                      <label 
                        htmlFor="account" 
                        style={{ 
                          display: 'block', 
                          marginBottom: '0.5rem',
                          fontSize: '0.875rem',
                          fontWeight: '500'
                        }}
                      >
                        Conta
                      </label>
                      <input 
                        type="text" 
                        id="account" 
                        name="bankAccount.account" 
                        required={paymentInfo.paymentMethod === 'bank'}
                        value={paymentInfo.bankAccount.account}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          borderRadius: '0.5rem',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.875rem'
                        }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}>
                      Tipo de Conta
                    </label>
                    
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <label style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem',
                        cursor: 'pointer',
                        padding: '0.75rem',
                        border: '1px solid #cbd5e1',
                        borderRadius: '0.5rem',
                        flex: '1',
                        background: paymentInfo.bankAccount.accountType === 'corrente' ? 'rgba(13, 148, 136, 0.1)' : 'transparent',
                        borderColor: paymentInfo.bankAccount.accountType === 'corrente' ? '#0d9488' : '#cbd5e1'
                      }}>
                        <input 
                          type="radio" 
                          name="bankAccount.accountType" 
                          value="corrente" 
                          checked={paymentInfo.bankAccount.accountType === 'corrente'}
                          onChange={handleInputChange}
                          style={{ margin: 0 }}
                        />
                        <span>Corrente</span>
                      </label>
                      
                      <label style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem',
                        cursor: 'pointer',
                        padding: '0.75rem',
                        border: '1px solid #cbd5e1',
                        borderRadius: '0.5rem',
                        flex: '1',
                        background: paymentInfo.bankAccount.accountType === 'poupanca' ? 'rgba(13, 148, 136, 0.1)' : 'transparent',
                        borderColor: paymentInfo.bankAccount.accountType === 'poupanca' ? '#0d9488' : '#cbd5e1'
                      }}>
                        <input 
                          type="radio" 
                          name="bankAccount.accountType" 
                          value="poupanca" 
                          checked={paymentInfo.bankAccount.accountType === 'poupanca'}
                          onChange={handleInputChange}
                          style={{ margin: 0 }}
                        />
                        <span>Poupança</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
              
              <div style={{ 
                padding: '1rem', 
                background: '#f8fafc', 
                borderRadius: '0.5rem',
                marginBottom: '1.5rem',
                fontSize: '0.875rem',
                color: '#64748b'
              }}>
                <p style={{ margin: '0 0 0.5rem' }}>
                  Ao se inscrever no programa de afiliados, você concorda com os nossos <a href="#" style={{ color: '#0d9488', textDecoration: 'none' }}>Termos e Condições</a>.
                </p>
                <p style={{ margin: 0 }}>
                  Os pagamentos são processados até o dia 15 do mês seguinte, para valores acima de R$ 50,00.
                </p>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  type="button"
                  onClick={() => setShowEnrollForm(false)}
                  style={{
                    background: 'transparent',
                    color: '#64748b',
                    border: '1px solid #cbd5e1',
                    borderRadius: '0.5rem',
                    padding: '0.75rem 1rem',
                    fontWeight: '500',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    flex: '1'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(0, 0, 0, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                  }}
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  style={{
                    background: '#0d9488',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    padding: '0.75rem 1rem',
                    fontWeight: '500',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    flex: '1'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#0f766e'}
                  onMouseLeave={(e) => e.target.style.background = '#0d9488'}
                >
                  Tornar-se Afiliado
                </button>
              </div>
            </form>
          ) : (
            <button 
              onClick={() => setShowEnrollForm(true)}
              style={{
                background: '#0d9488',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                padding: '0.75rem 1rem',
                fontWeight: '500',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => e.target.style.background = '#0f766e'}
              onMouseLeave={(e) => e.target.style.background = '#0d9488'}
            >
              <Users size={18} />
              Inscrever-se no Programa de Afiliados
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Affiliate Dashboard */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {/* Referrals Card */}
            <div style={{ 
              background: 'white',
              borderRadius: '1rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              padding: '1.5rem'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem',
                marginBottom: '1rem'
              }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  background: 'rgba(13, 148, 136, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Users size={20} color="#0d9488" />
                </div>
                <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Indicações</span>
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                {affiliateStats.referrals}
              </div>
            </div>
            
            {/* Pending Commission Card */}
            <div style={{ 
              background: 'white',
              borderRadius: '1rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              padding: '1.5rem'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem',
                marginBottom: '1rem'
              }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  background: 'rgba(13, 148, 136, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <DollarSign size={20} color="#0d9488" />
                </div>
                <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Comissão Pendente</span>
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                R$ {affiliateStats.pendingCommission.toFixed(2)}
              </div>
            </div>
            
            {/* Total Earned Card */}
            <div style={{ 
              background: 'white',
              borderRadius: '1rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              padding: '1.5rem'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem',
                marginBottom: '1rem'
              }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  background: 'rgba(13, 148, 136, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <TrendingUp size={20} color="#0d9488" />
                </div>
                <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Total Ganho</span>
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                R$ {affiliateStats.totalEarned.toFixed(2)}
              </div>
            </div>
            
            {/* Conversion Rate Card */}
            <div style={{ 
              background: 'white',
              borderRadius: '1rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              padding: '1.5rem'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem',
                marginBottom: '1rem'
              }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  background: 'rgba(13, 148, 136, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <LinkIcon size={20} color="#0d9488" />
                </div>
                <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Taxa de Conversão</span>
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                {affiliateStats.conversionRate}%
              </div>
            </div>
          </div>
          
          {/* Affiliate Link */}
          <div style={{ 
            background: 'white',
            borderRadius: '1rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            padding: '1.5rem',
            marginBottom: '2rem'
          }}>
            <h2 style={{ 
              fontSize: '1.25rem', 
              fontWeight: '600',
              marginBottom: '1rem'
            }}>
              Seu Link de Afiliado
            </h2>
            <div style={{ 
              display: 'flex', 
              gap: '0.5rem',
              marginBottom: '1.5rem'
            }}>
              <input 
                type="text" 
                value={affiliateLink}
                readOnly
                style={{
                  flex: '1',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.875rem',
                  background: '#f8fafc'
                }}
              />
              <button 
                onClick={handleCopyLink}
                style={{
                  background: linkCopied ? '#10b981' : '#0d9488',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  padding: '0.75rem 1rem',
                  fontWeight: '500',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  if (!linkCopied) e.target.style.background = '#0f766e';
                }}
                onMouseLeave={(e) => {
                  if (!linkCopied) e.target.style.background = '#0d9488';
                }}
              >
                {linkCopied ? <CheckCircle size={18} /> : <Copy size={18} />}
                {linkCopied ? 'Copiado!' : 'Copiar'}
              </button>
              <button 
                onClick={handleShareLink}
                style={{
                  background: 'transparent',
                  color: '#0d9488',
                  border: '1px solid #0d9488',
                  borderRadius: '0.5rem',
                  padding: '0.75rem 1rem',
                  fontWeight: '500',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(13, 148, 136, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                }}
              >
                <Share2 size={18} />
                Compartilhar
              </button>
            </div>
            <div style={{ 
              padding: '1rem', 
              background: '#f8fafc', 
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              color: '#64748b'
            }}>
              <p style={{ margin: 0 }}>
                <strong>Dica:</strong> Compartilhe seu link em suas redes sociais, blog, email ou diretamente com colegas fisioterapeutas para maximizar seus ganhos.
              </p>
            </div>
          </div>
          
          {/* Payment Information */}
          <div style={{ 
            background: 'white',
            borderRadius: '1rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            padding: '1.5rem'
          }}>
            <h2 style={{ 
              fontSize: '1.25rem', 
              fontWeight: '600',
              marginBottom: '1.5rem'
            }}>
              Informações de Pagamento
            </h2>
            
            <form onSubmit={handleUpdatePaymentInfo}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label 
                  style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}
                >
                  Método de Pagamento
                </label>
                
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    cursor: 'pointer',
                    padding: '0.75rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '0.5rem',
                    flex: '1',
                    background: paymentInfo.paymentMethod === 'pix' ? 'rgba(13, 148, 136, 0.1)' : 'transparent',
                    borderColor: paymentInfo.paymentMethod === 'pix' ? '#0d9488' : '#cbd5e1'
                  }}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="pix" 
                      checked={paymentInfo.paymentMethod === 'pix'}
                      onChange={handleInputChange}
                      style={{ margin: 0 }}
                    />
                    <span>PIX</span>
                  </label>
                  
                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    cursor: 'pointer',
                    padding: '0.75rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '0.5rem',
                    flex: '1',
                    background: paymentInfo.paymentMethod === 'bank' ? 'rgba(13, 148, 136, 0.1)' : 'transparent',
                    borderColor: paymentInfo.paymentMethod === 'bank' ? '#0d9488' : '#cbd5e1'
                  }}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="bank" 
                      checked={paymentInfo.paymentMethod === 'bank'}
                      onChange={handleInputChange}
                      style={{ margin: 0 }}
                    />
                    <span>Conta Bancária</span>
                  </label>
                </div>
              </div>
              
              {paymentInfo.paymentMethod === 'pix' && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <label 
                    htmlFor="pixKey" 
                    style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}
                  >
                    Chave PIX
                  </label>
                  <input 
                    type="text" 
                    id="pixKey" 
                    name="pixKey" 
                    required
                    value={paymentInfo.pixKey}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.875rem'
                    }}
                  />
                </div>
              )}
              
              {paymentInfo.paymentMethod === 'bank' && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <label 
                      htmlFor="bank" 
                      style={{ 
                        display: 'block', 
                        marginBottom: '0.5rem',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}
                    >
                      Banco
                    </label>
                    <input 
                      type="text" 
                      id="bank" 
                      name="bankAccount.bank" 
                      required={paymentInfo.paymentMethod === 'bank'}
                      value={paymentInfo.bankAccount.bank}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.875rem'
                      }}
                    />
                  </div>
                  
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ flex: '1' }}>
                      <label 
                        htmlFor="agency" 
                        style={{ 
                          display: 'block', 
                          marginBottom: '0.5rem',
                          fontSize: '0.875rem',
                          fontWeight: '500'
                        }}
                      >
                        Agência
                      </label>
                      <input 
                        type="text" 
                        id="agency" 
                        name="bankAccount.agency" 
                        required={paymentInfo.paymentMethod === 'bank'}
                        value={paymentInfo.bankAccount.agency}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          borderRadius: '0.5rem',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.875rem'
                        }}
                      />
                    </div>
                    
                    <div style={{ flex: '1' }}>
                      <label 
                        htmlFor="account" 
                        style={{ 
                          display: 'block', 
                          marginBottom: '0.5rem',
                          fontSize: '0.875rem',
                          fontWeight: '500'
                        }}
                      >
                        Conta
                      </label>
                      <input 
                        type="text" 
                        id="account" 
                        name="bankAccount.account" 
                        required={paymentInfo.paymentMethod === 'bank'}
                        value={paymentInfo.bankAccount.account}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          borderRadius: '0.5rem',
                          border: '1px solid #cbd5e1',
                          fontSize: '0.875rem'
                        }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}>
                      Tipo de Conta
                    </label>
                    
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <label style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem',
                        cursor: 'pointer',
                        padding: '0.75rem',
                        border: '1px solid #cbd5e1',
                        borderRadius: '0.5rem',
                        flex: '1',
                        background: paymentInfo.bankAccount.accountType === 'corrente' ? 'rgba(13, 148, 136, 0.1)' : 'transparent',
                        borderColor: paymentInfo.bankAccount.accountType === 'corrente' ? '#0d9488' : '#cbd5e1'
                      }}>
                        <input 
                          type="radio" 
                          name="bankAccount.accountType" 
                          value="corrente" 
                          checked={paymentInfo.bankAccount.accountType === 'corrente'}
                          onChange={handleInputChange}
                          style={{ margin: 0 }}
                        />
                        <span>Corrente</span>
                      </label>
                      
                      <label style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem',
                        cursor: 'pointer',
                        padding: '0.75rem',
                        border: '1px solid #cbd5e1',
                        borderRadius: '0.5rem',
                        flex: '1',
                        background: paymentInfo.bankAccount.accountType === 'poupanca' ? 'rgba(13, 148, 136, 0.1)' : 'transparent',
                        borderColor: paymentInfo.bankAccount.accountType === 'poupanca' ? '#0d9488' : '#cbd5e1'
                      }}>
                        <input 
                          type="radio" 
                          name="bankAccount.accountType" 
                          value="poupanca" 
                          checked={paymentInfo.bankAccount.accountType === 'poupanca'}
                          onChange={handleInputChange}
                          style={{ margin: 0 }}
                        />
                        <span>Poupança</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
              
              <button 
                type="submit"
                style={{
                  background: '#0d9488',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  padding: '0.75rem 1rem',
                  fontWeight: '500',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.background = '#0f766e'}
                onMouseLeave={(e) => e.target.style.background = '#0d9488'}
              >
                Atualizar Informações de Pagamento
              </button>
            </form>
          </div>
        </>
      )}
      
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AffiliateProgram;