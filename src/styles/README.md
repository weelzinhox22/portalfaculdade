# 🎨 Template CSS para Novas Páginas

## 📋 Visão Geral

Este diretório contém templates CSS que resolvem definitivamente o problema de estilos não funcionarem em páginas novas do portal.

## 🚀 Como Usar

### 1. **Template Principal** (`page-template.css`)

Este arquivo contém todos os estilos base necessários para uma página funcional:

- **Header e navegação** com design responsivo
- **Cards** com hover effects e bordas coloridas
- **Botões** em diferentes estilos (primary, secondary, outline)
- **Formulários** com inputs estilizados
- **Sliders** customizados
- **Alertas** em diferentes cores
- **Tabelas** responsivas
- **Accordion** interativo
- **Modais** para overlays
- **Loading spinners**
- **Utilitários** para margens, padding e alinhamento

### 2. **Passos para Usar**

```bash
# 1. Copie o template para sua página
cp src/styles/page-template.css src/pages/MinhaPagina.css

# 2. Renomeie as classes no arquivo CSS
# Exemplo: .page-template → .minha-pagina

# 3. Importe no seu componente React
import './MinhaPagina.css';
```

### 3. **Exemplo de Renomeação**

```css
/* ANTES (template) */
.page-template-header { ... }
.page-template-nav { ... }
.page-template-card { ... }

/* DEPOIS (sua página) */
.minha-pagina-header { ... }
.minha-pagina-nav { ... }
.minha-pagina-card { ... }
```

### 4. **Estrutura HTML Recomendada**

```jsx
import React from 'react';
import './MinhaPagina.css';

const MinhaPagina = () => {
  return (
    <div className="minha-pagina">
      <header className="minha-pagina-header">
        <nav className="minha-pagina-nav">
          <div className="minha-pagina-nav-content">
            <div className="minha-pagina-logo">Título da Página</div>
            <div className="minha-pagina-nav-links">
              <a href="#secao1" className="minha-pagina-nav-link">Seção 1</a>
              <a href="#secao2" className="minha-pagina-nav-link">Seção 2</a>
            </div>
          </div>
        </nav>
      </header>

      <main className="minha-pagina-main">
        <div className="minha-pagina-container">
          <section id="secao1" className="minha-pagina-section">
            <h1 className="minha-pagina-section-title">Título Principal</h1>
            <p className="minha-pagina-section-subtitle">Subtítulo descritivo</p>
            
            <div className="minha-pagina-cards-grid">
              <div className="minha-pagina-card border-primary">
                <h3 className="minha-pagina-card-title">Card 1</h3>
                <p className="minha-pagina-card-description">Descrição do card</p>
                <button className="minha-pagina-btn minha-pagina-btn-primary">
                  Botão
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="minha-pagina-footer">
        <div className="minha-pagina-footer-content">
          <p>© 2025 Sua Página</p>
        </div>
      </footer>
    </div>
  );
};

export default MinhaPagina;
```

## 🎯 Vantagens do Template

### ✅ **Problemas Resolvidos**
- ❌ Estilos não funcionando em páginas novas
- ❌ Dependência do Tailwind CSS
- ❌ Conflitos de CSS global
- ❌ Falta de responsividade

### ✅ **Benefícios**
- 🎨 Design consistente em todas as páginas
- 📱 Totalmente responsivo
- 🚀 Performance otimizada
- 🔧 Fácil de personalizar
- 📚 Documentação completa

## 🎨 Personalização

### **Cores**
```css
/* Cores primárias */
--primary-color: #0891b2;
--secondary-color: #14b8a6;
--accent-color: #10b981;

/* Cores de estado */
--success-color: #22c55e;
--warning-color: #f59e0b;
--error-color: #ef4444;
```

### **Tipografia**
```css
/* Fontes */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* Tamanhos */
--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-base: 1rem;
--text-lg: 1.125rem;
--text-xl: 1.25rem;
--text-2xl: 1.5rem;
```

### **Espaçamentos**
```css
/* Margens e padding */
--spacing-1: 0.25rem;
--spacing-2: 0.5rem;
--spacing-4: 1rem;
--spacing-6: 1.5rem;
--spacing-8: 2rem;
```

## 📱 Responsividade

O template inclui breakpoints automáticos:

- **Mobile First**: Design começa em mobile
- **Tablet**: `@media (min-width: 768px)`
- **Desktop**: `@media (min-width: 1024px)`
- **Large**: `@media (min-width: 1280px)`

## 🔧 Componentes Disponíveis

### **Navegação**
- Header sticky
- Menu responsivo
- Links com hover effects

### **Layout**
- Container responsivo
- Grid system flexível
- Seções com espaçamento automático

### **Interatividade**
- Cards com hover
- Botões com estados
- Accordion expansível
- Modais overlay

### **Formulários**
- Inputs estilizados
- Labels responsivos
- Validação visual

## 🚨 Troubleshooting

### **Estilos não aparecem**
1. ✅ Verifique se o arquivo CSS está importado
2. ✅ Confirme se as classes estão corretas
3. ✅ Verifique se não há conflitos de CSS

### **Responsividade não funciona**
1. ✅ Verifique se os media queries estão corretos
2. ✅ Confirme se as classes responsivas estão aplicadas
3. ✅ Teste em diferentes tamanhos de tela

### **Performance lenta**
1. ✅ Use apenas as classes necessárias
2. ✅ Remova estilos não utilizados
3. ✅ Otimize as transições CSS

## 📚 Recursos Adicionais

- **Figma Design System**: [Link para o design system]
- **Component Library**: [Link para biblioteca de componentes]
- **Style Guide**: [Link para guia de estilos]

## 🤝 Contribuição

Para melhorar o template:

1. **Fork** o repositório
2. **Crie** uma branch para sua feature
3. **Commit** suas mudanças
4. **Push** para a branch
5. **Abra** um Pull Request

## 📞 Suporte

Se precisar de ajuda:

- 📧 Email: suporte@portal.com
- 💬 Discord: [Link do servidor]
- 📖 Documentação: [Link da documentação]

---

**✨ Dica Pro**: Use o template como base e personalize apenas o necessário. Isso garante consistência e reduz o tempo de desenvolvimento!
