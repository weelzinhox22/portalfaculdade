# Espaços para Anúncios e Newsletter - Portal FisioWel

## 📍 Locais Implementados

### 🏠 **Página Home**
1. **Newsletter Banner** - Logo após o hero section
2. **Newsletter Section** - Seção dedicada entre features e testimonials
3. **AdSense Banner** - Após newsletter section
4. **AdSense Medium** - Antes da seção de estatísticas

### 📄 **Páginas de Especialidades (ex: Saúde do Atleta)**
1. **Sidebar com Anúncios** - Lateral direita (desktop)
   - Newsletter compacta
   - 2 anúncios pequenos
   - Card de recursos populares
   - Card de estatísticas
2. **AdSense Banner** - Entre seções de módulos e materiais
3. **Newsletter Compacta** - No final da página
4. **AdSense Medium** - Após newsletter

### 📖 **Página de Artigos (ArticleViewer)**
1. **Sidebar com Anúncios** - Lateral direita (desktop)
2. **AdSense Inline** - Após o resumo do artigo
3. **Newsletter Compacta** - No final do artigo
4. **AdSense Medium** - Após newsletter

### 🌐 **Layout Global (todas as páginas)**
1. **Newsletter no Footer** - Seção destacada antes do footer
2. **Anúncio Flutuante** - Canto inferior direito (dismissível)

## 🎯 **Componentes Criados**

### 1. **AdSense.jsx**
- Componente reutilizável para anúncios Google AdSense
- Tamanhos: small, medium, large, banner
- Fallback visual para desenvolvimento
- Configuração automática de scripts

### 2. **Newsletter.jsx**
- Componente de inscrição em newsletter
- Variantes: default, compact, sidebar, footer
- Validação de email
- Estados de loading/sucesso/erro
- Integração preparada para serviços como Mailchimp

### 3. **SidebarAds.jsx**
- Sidebar completa com anúncios e newsletter
- Sticky positioning
- Cards de recursos populares
- Estatísticas do portal

### 4. **StickyAd.jsx**
- Anúncio flutuante/fixo
- Posições configuráveis
- Auto-hide opcional
- Dismissível pelo usuário

### 5. **NewsletterBanner.jsx**
- Banner de newsletter no topo
- Dismissível com localStorage
- Formulário inline compacto
- Responsivo

## 📱 **Responsividade**

- **Desktop (>1024px)**: Todas as funcionalidades ativas
- **Tablet (768px-1024px)**: Sidebar oculta, anúncios inline mantidos
- **Mobile (<768px)**: Anúncios adaptados, newsletter em formato vertical

## 🎨 **Estratégia de Posicionamento**

### **Alta Visibilidade:**
- Newsletter banner (topo da home)
- Anúncio flutuante (sempre visível)
- Newsletter no footer (todas as páginas)

### **Conteúdo Contextual:**
- Anúncios inline entre seções
- Sidebar em páginas de conteúdo
- Newsletter após leitura de artigos

### **Não Intrusivo:**
- Anúncios bem integrados ao design
- Newsletter com benefícios claros
- Opções de dismissal

## ⚙️ **Configuração Necessária**

### Para AdSense:
1. Substituir `ca-pub-XXXXXXXXXX` pelo seu Publisher ID
2. Configurar slots específicos para cada posição
3. Adicionar domínio no painel do AdSense

### Para Newsletter:
1. Integrar com serviço de email (Mailchimp, ConvertKit, etc.)
2. Configurar endpoint de API no componente Newsletter
3. Configurar automações de email

## 📊 **Métricas Sugeridas**

- **CTR dos anúncios** por posição
- **Taxa de inscrição** na newsletter por componente
- **Tempo de permanência** vs. presença de anúncios
- **Taxa de dismissal** dos anúncios flutuantes

## 🔧 **Próximos Passos**

1. **Configurar AdSense** com IDs reais
2. **Integrar newsletter** com serviço de email
3. **Implementar analytics** para tracking
4. **A/B testing** de posições e formatos
5. **Otimizar performance** com lazy loading
6. **Adicionar mais variações** de anúncios nativos

## 💡 **Oportunidades Adicionais**

- **Anúncios nativos** integrados aos cards de especialidades
- **Newsletter popup** com exit-intent
- **Anúncios de afiliados** para livros e cursos
- **Sponsored content** em formato de artigos
- **Banner promocional** para eventos e webinars
