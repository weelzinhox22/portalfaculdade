import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Eye, Award, Calendar, Clock, CheckCircle } from 'lucide-react';
import DigitalCertificate from './DigitalCertificate';

const CertificateManager = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  
  useEffect(() => {
    // Simulating API call to fetch user certificates
    const fetchCertificates = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setCertificates([
            {
              id: 'CERT-12345-6789',
              courseName: 'Fisioterapia Esportiva Avançada',
              completionDate: '15/05/2023',
              duration: '40 horas',
              instructorName: 'Dra. Ana Silva',
              type: 'course'
            },
            {
              id: 'CERT-23456-7890',
              courseName: 'Workshop de Reabilitação Neurológica',
              completionDate: '22/07/2023',
              duration: '12 horas',
              instructorName: 'Dr. Carlos Mendes',
              type: 'workshop'
            },
            {
              id: 'CERT-34567-8901',
              courseName: 'Congresso Internacional de Fisioterapia',
              completionDate: '10/09/2023',
              duration: '24 horas',
              instructorName: 'Comitê Organizador',
              type: 'event'
            },
            {
              id: 'CERT-45678-9012',
              courseName: 'Técnicas de Mobilização Articular',
              completionDate: '05/11/2023',
              duration: '30 horas',
              instructorName: 'Prof. Roberto Almeida',
              type: 'course'
            },
          ]);
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error('Erro ao buscar certificados:', error);
        setLoading(false);
      }
    };
    
    fetchCertificates();
  }, []);
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const handleFilterChange = (type) => {
    setFilterType(type);
  };
  
  const handleViewCertificate = (certificate) => {
    setSelectedCertificate(certificate);
    setShowCertificateModal(true);
  };
  
  const handleDownloadCertificate = (certificateId) => {
    // In a real app, this would trigger a PDF download
    alert(`Iniciando download do certificado ${certificateId}...`);
  };
  
  const filteredCertificates = certificates
    .filter(cert => {
      // Apply search filter
      if (searchTerm) {
        return cert.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
               cert.id.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return true;
    })
    .filter(cert => {
      // Apply type filter
      if (filterType === 'all') return true;
      return cert.type === filterType;
    });
  
  return (
    <div style={{ 
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem 1rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ 
        fontSize: '1.875rem',
        fontWeight: '700',
        marginBottom: '2rem',
        color: '#0f172a',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <Award size={28} color="#0d9488" />
        Meus Certificados
      </h1>
      
      {/* Search and Filter */}
      <div style={{ 
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '2rem',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ 
          position: 'relative',
          flex: '1',
          minWidth: '250px',
          maxWidth: '400px'
        }}>
          <input
            type="text"
            placeholder="Buscar certificados..."
            value={searchTerm}
            onChange={handleSearch}
            style={{
              width: '100%',
              padding: '0.75rem 1rem 0.75rem 2.5rem',
              borderRadius: '0.5rem',
              border: '1px solid #e2e8f0',
              fontSize: '0.875rem',
              outline: 'none',
              transition: 'border-color 0.2s ease',
            }}
            onFocus={(e) => e.target.style.borderColor = '#0d9488'}
            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
          />
          <Search 
            size={18} 
            style={{
              position: 'absolute',
              left: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#94a3b8'
            }}
          />
        </div>
        
        <div style={{ 
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center'
        }}>
          <span style={{ 
            fontSize: '0.875rem',
            color: '#64748b',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Filter size={16} />
            Filtrar:
          </span>
          
          {['all', 'course', 'workshop', 'event'].map(type => (
            <button
              key={type}
              onClick={() => handleFilterChange(type)}
              style={{
                padding: '0.5rem 0.75rem',
                borderRadius: '0.375rem',
                fontSize: '0.75rem',
                fontWeight: '500',
                border: '1px solid #e2e8f0',
                background: filterType === type ? '#0d9488' : 'white',
                color: filterType === type ? 'white' : '#64748b',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (filterType !== type) {
                  e.target.style.background = '#f8fafc';
                }
              }}
              onMouseLeave={(e) => {
                if (filterType !== type) {
                  e.target.style.background = 'white';
                }
              }}
            >
              {type === 'all' ? 'Todos' : 
               type === 'course' ? 'Cursos' : 
               type === 'workshop' ? 'Workshops' : 'Eventos'}
            </button>
          ))}
        </div>
      </div>
      
      {/* Certificates List */}
      {loading ? (
        <div style={{ 
          display: 'flex',
          justifyContent: 'center',
          padding: '3rem 0'
        }}>
          <div style={{ 
            width: '40px',
            height: '40px',
            border: '3px solid #e2e8f0',
            borderTopColor: '#0d9488',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
        </div>
      ) : filteredCertificates.length === 0 ? (
        <div style={{ 
          textAlign: 'center',
          padding: '3rem 0',
          color: '#64748b'
        }}>
          <Award size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
          <p style={{ fontSize: '1.125rem', fontWeight: '500', margin: '0 0 0.5rem' }}>
            Nenhum certificado encontrado
          </p>
          <p style={{ fontSize: '0.875rem', margin: 0 }}>
            {searchTerm ? 'Tente uma busca diferente' : 'Complete um curso para obter seu primeiro certificado'}
          </p>
        </div>
      ) : (
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredCertificates.map(certificate => (
            <div 
              key={certificate.id}
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: '0.5rem',
                overflow: 'hidden',
                background: 'white',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
              }}
            >
              <div style={{ 
                background: '#f8fafc',
                padding: '1.5rem',
                borderBottom: '1px solid #e2e8f0',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: certificate.type === 'course' ? '#0d9488' : 
                              certificate.type === 'workshop' ? '#0369a1' : '#7c3aed',
                  color: 'white',
                  fontSize: '0.625rem',
                  fontWeight: '600',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.25rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  {certificate.type === 'course' ? 'Curso' : 
                   certificate.type === 'workshop' ? 'Workshop' : 'Evento'}
                </div>
                
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}>
                  <Award 
                    size={48} 
                    color={certificate.type === 'course' ? '#0d9488' : 
                           certificate.type === 'workshop' ? '#0369a1' : '#7c3aed'}
                  />
                </div>
                
                <h3 style={{ 
                  fontSize: '1rem',
                  fontWeight: '600',
                  margin: '0 0 0.5rem',
                  color: '#0f172a',
                  textAlign: 'center',
                  lineHeight: '1.4'
                }}>
                  {certificate.courseName}
                </h3>
                
                <p style={{ 
                  fontSize: '0.75rem',
                  color: '#64748b',
                  margin: 0,
                  textAlign: 'center'
                }}>
                  ID: {certificate.id}
                </p>
              </div>
              
              <div style={{ padding: '1rem 1.5rem' }}>
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.75rem'
                }}>
                  <Calendar size={16} color="#64748b" />
                  <span style={{ fontSize: '0.875rem' }}>
                    {certificate.completionDate}
                  </span>
                </div>
                
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.75rem'
                }}>
                  <Clock size={16} color="#64748b" />
                  <span style={{ fontSize: '0.875rem' }}>
                    {certificate.duration}
                  </span>
                </div>
                
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1.25rem'
                }}>
                  <CheckCircle size={16} color="#10b981" />
                  <span style={{ 
                    fontSize: '0.875rem',
                    color: '#10b981',
                    fontWeight: '500'
                  }}>
                    Verificado
                  </span>
                </div>
                
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.75rem'
                }}>
                  <button
                    onClick={() => handleViewCertificate(certificate)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '0.625rem',
                      borderRadius: '0.375rem',
                      background: 'white',
                      border: '1px solid #e2e8f0',
                      color: '#64748b',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#f8fafc'}
                    onMouseLeave={(e) => e.target.style.background = 'white'}
                  >
                    <Eye size={16} />
                    Visualizar
                  </button>
                  
                  <button
                    onClick={() => handleDownloadCertificate(certificate.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '0.625rem',
                      borderRadius: '0.375rem',
                      background: certificate.type === 'course' ? '#0d9488' : 
                                 certificate.type === 'workshop' ? '#0369a1' : '#7c3aed',
                      border: 'none',
                      color: 'white',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (certificate.type === 'course') {
                        e.target.style.background = '#0f766e';
                      } else if (certificate.type === 'workshop') {
                        e.target.style.background = '#0c4a6e';
                      } else {
                        e.target.style.background = '#6d28d9';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (certificate.type === 'course') {
                        e.target.style.background = '#0d9488';
                      } else if (certificate.type === 'workshop') {
                        e.target.style.background = '#0369a1';
                      } else {
                        e.target.style.background = '#7c3aed';
                      }
                    }}
                  >
                    <Download size={16} />
                    Baixar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Certificate Modal */}
      {showCertificateModal && selectedCertificate && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          padding: '1rem',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '0.5rem',
            width: '100%',
            maxWidth: '1000px',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative',
            animation: 'slideUp 0.3s ease-out'
          }}>
            <button 
              onClick={() => setShowCertificateModal(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '50%',
                width: '2rem',
                height: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#64748b',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#f8fafc';
                e.target.style.color = '#0f172a';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'white';
                e.target.style.color = '#64748b';
              }}
            >
              ×
            </button>
            
            <DigitalCertificate 
              studentName="Maria Silva"
              courseName={selectedCertificate.courseName}
              completionDate={selectedCertificate.completionDate}
              duration={selectedCertificate.duration}
              instructorName={selectedCertificate.instructorName}
              certificateId={selectedCertificate.id}
            />
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default CertificateManager;