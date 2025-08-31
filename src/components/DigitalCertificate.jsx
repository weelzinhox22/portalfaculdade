import React, { useState } from 'react';
import { Download, Share2, Award, CheckCircle, Copy, Printer } from 'lucide-react';

const DigitalCertificate = ({
  studentName = 'Nome do Aluno',
  courseName = 'Nome do Curso',
  completionDate = '01/01/2023',
  duration = '20 horas',
  instructorName = 'Nome do Instrutor',
  certificateId = 'CERT-12345-6789',
  logoUrl = 'https://via.placeholder.com/150x50?text=FisioWel',
  signatureUrl = 'https://via.placeholder.com/200x80?text=Assinatura'
}) => {
  const [showActions, setShowActions] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  
  const handleCopyLink = () => {
    // Generate a shareable link for the certificate
    const shareableLink = `https://fisiowel.com.br/certificados/${certificateId}`;
    navigator.clipboard.writeText(shareableLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 3000);
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Certificado: ${courseName}`,
        text: `Confira meu certificado do curso ${courseName} na FisioWel!`,
        url: `https://fisiowel.com.br/certificados/${certificateId}`,
      });
    } else {
      handleCopyLink();
    }
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleDownload = () => {
    // In a real implementation, this would generate a PDF or image file
    alert('Iniciando download do certificado...');
  };
  
  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split('/');
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return `${day} de ${months[parseInt(month) - 1]} de ${year}`;
  };
  
  return (
    <div style={{ 
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '2rem 1rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Certificate Actions */}
      <div style={{ 
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '0.75rem',
        marginBottom: '1.5rem'
      }}>
        <button 
          onClick={handleDownload}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
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
          <Download size={18} />
          Baixar PDF
        </button>
        
        <button 
          onClick={() => setShowActions(!showActions)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'transparent',
            color: '#64748b',
            border: '1px solid #cbd5e1',
            borderRadius: '0.5rem',
            padding: '0.75rem 1rem',
            fontWeight: '500',
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(0, 0, 0, 0.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
          }}
        >
          Mais Ações
          
          {showActions && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '0.5rem',
              background: 'white',
              borderRadius: '0.5rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              width: '200px',
              zIndex: 10,
              animation: 'fadeIn 0.2s ease-out'
            }}>
              <button 
                onClick={handlePrint}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.75rem 1rem',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid #e2e8f0',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.background = '#f8fafc'}
                onMouseLeave={(e) => e.target.style.background = 'transparent'}
              >
                <Printer size={18} color="#64748b" />
                <span>Imprimir</span>
              </button>
              
              <button 
                onClick={handleCopyLink}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.75rem 1rem',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '1px solid #e2e8f0',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.background = '#f8fafc'}
                onMouseLeave={(e) => e.target.style.background = 'transparent'}
              >
                {linkCopied ? <CheckCircle size={18} color="#10b981" /> : <Copy size={18} color="#64748b" />}
                <span>{linkCopied ? 'Link copiado!' : 'Copiar link'}</span>
              </button>
              
              <button 
                onClick={handleShare}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.75rem 1rem',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.background = '#f8fafc'}
                onMouseLeave={(e) => e.target.style.background = 'transparent'}
              >
                <Share2 size={18} color="#64748b" />
                <span>Compartilhar</span>
              </button>
            </div>
          )}
        </button>
      </div>
      
      {/* Certificate */}
      <div 
        style={{
          position: 'relative',
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '0.5rem',
          padding: '3rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          textAlign: 'center',
          aspectRatio: '1.414 / 1', // A4 aspect ratio
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
        className="certificate-container"
      >
        {/* Certificate Border */}
        <div style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          right: '1rem',
          bottom: '1rem',
          border: '2px solid #0d9488',
          borderRadius: '0.25rem',
          pointerEvents: 'none'
        }} />
        
        {/* Certificate Header */}
        <div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginBottom: '1.5rem'
          }}>
            <img 
              src={logoUrl} 
              alt="FisioWel Logo" 
              style={{ height: '50px' }}
            />
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ 
              height: '2px', 
              background: '#0d9488', 
              flex: '1', 
              maxWidth: '100px' 
            }} />
            <Award size={32} color="#0d9488" />
            <div style={{ 
              height: '2px', 
              background: '#0d9488', 
              flex: '1', 
              maxWidth: '100px' 
            }} />
          </div>
          
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700',
            margin: '0 0 0.5rem',
            color: '#0f172a',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            CERTIFICADO
          </h1>
          
          <p style={{ 
            fontSize: '1rem', 
            color: '#64748b',
            margin: '0 0 2rem'
          }}>
            DE CONCLUSÃO DE CURSO
          </p>
        </div>
        
        {/* Certificate Content */}
        <div>
          <p style={{ 
            fontSize: '1.1rem', 
            lineHeight: '1.6',
            margin: '0 0 1.5rem',
            color: '#334155'
          }}>
            Certificamos que
          </p>
          
          <h2 style={{ 
            fontSize: '1.75rem', 
            fontWeight: '700',
            margin: '0 0 1.5rem',
            color: '#0f172a',
            fontFamily: 'serif'
          }}>
            {studentName}
          </h2>
          
          <p style={{ 
            fontSize: '1.1rem', 
            lineHeight: '1.6',
            margin: '0 0 1.5rem',
            color: '#334155',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            concluiu com êxito o curso <strong>{courseName}</strong>, 
            com carga horária total de <strong>{duration}</strong>, 
            em <strong>{formatDate(completionDate)}</strong>.
          </p>
        </div>
        
        {/* Certificate Footer */}
        <div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <img 
              src={signatureUrl} 
              alt="Assinatura do Instrutor" 
              style={{ height: '80px' }}
            />
          </div>
          
          <p style={{ 
            fontSize: '1rem', 
            fontWeight: '600',
            margin: '0 0 0.25rem',
            color: '#0f172a'
          }}>
            {instructorName}
          </p>
          
          <p style={{ 
            fontSize: '0.875rem', 
            margin: '0 0 1.5rem',
            color: '#64748b'
          }}>
            Instrutor(a)
          </p>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.5rem'
          }}>
            <div style={{ 
              height: '1px', 
              background: '#cbd5e1', 
              flex: '1', 
              maxWidth: '100px' 
            }} />
            <p style={{ 
              fontSize: '0.75rem', 
              margin: 0,
              color: '#64748b',
              fontWeight: '500'
            }}>
              CERTIFICADO ID: {certificateId}
            </p>
            <div style={{ 
              height: '1px', 
              background: '#cbd5e1', 
              flex: '1', 
              maxWidth: '100px' 
            }} />
          </div>
          
          <p style={{ 
            fontSize: '0.75rem', 
            margin: 0,
            color: '#64748b'
          }}>
            Verifique a autenticidade deste certificado em: 
            <span style={{ fontWeight: '500' }}>fisiowel.com.br/verificar</span>
          </p>
        </div>
      </div>
      
      {/* Certificate Verification */}
      <div style={{ 
        background: '#f8fafc',
        borderRadius: '0.5rem',
        padding: '1.5rem',
        marginTop: '2rem',
        border: '1px solid #e2e8f0'
      }}>
        <h3 style={{ 
          fontSize: '1.1rem', 
          fontWeight: '600',
          margin: '0 0 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <CheckCircle size={20} color="#0d9488" />
          Certificado Verificado
        </h3>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem'
        }}>
          <div>
            <p style={{ 
              fontSize: '0.875rem', 
              color: '#64748b',
              margin: '0 0 0.25rem'
            }}>
              ID do Certificado
            </p>
            <p style={{ 
              fontSize: '0.875rem', 
              fontWeight: '500',
              margin: 0
            }}>
              {certificateId}
            </p>
          </div>
          
          <div>
            <p style={{ 
              fontSize: '0.875rem', 
              color: '#64748b',
              margin: '0 0 0.25rem'
            }}>
              Data de Emissão
            </p>
            <p style={{ 
              fontSize: '0.875rem', 
              fontWeight: '500',
              margin: 0
            }}>
              {completionDate}
            </p>
          </div>
          
          <div>
            <p style={{ 
              fontSize: '0.875rem', 
              color: '#64748b',
              margin: '0 0 0.25rem'
            }}>
              Carga Horária
            </p>
            <p style={{ 
              fontSize: '0.875rem', 
              fontWeight: '500',
              margin: 0
            }}>
              {duration}
            </p>
          </div>
          
          <div>
            <p style={{ 
              fontSize: '0.875rem', 
              color: '#64748b',
              margin: '0 0 0.25rem'
            }}>
              Status
            </p>
            <p style={{ 
              fontSize: '0.875rem', 
              fontWeight: '500',
              margin: 0,
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}>
              <CheckCircle size={14} />
              Válido
            </p>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @media print {
          body * {
            visibility: hidden;
          }
          .certificate-container, .certificate-container * {
            visibility: visible;
          }
          .certificate-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            box-shadow: none;
            border: none;
          }
        }
      `}</style>
    </div>
  );
};

export default DigitalCertificate;