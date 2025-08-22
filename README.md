# Portal de Fisioterapia

Portal acadêmico completo para estudos em fisioterapia, desenvolvido em React com TailwindCSS.

## 🎯 Sobre o Projeto

Este portal centraliza conteúdos acadêmicos das quatro principais áreas de especialização em fisioterapia:

- **Fisioterapia na Saúde do Atleta** - Prevenção e reabilitação de lesões esportivas
- **Fisioterapia em Unidade Hospitalar** - Cuidados intensivos e reabilitação hospitalar  
- **Fisioterapia na Saúde do Idoso** - Envelhecimento ativo e qualidade de vida
- **Fisioterapia Neurofuncional** - Reabilitação neurológica e recuperação funcional

## 🚀 Tecnologias Utilizadas

- **React** - Biblioteca para construção da interface
- **React Router** - Navegação entre páginas
- **TailwindCSS** - Framework CSS para estilização
- **Lucide React** - Ícones modernos e responsivos
- **Vite** - Build tool e servidor de desenvolvimento

## 📦 Instalação

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
cd portal-fisioterapia
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em modo desenvolvimento:
```bash
npm run dev
```

4. Acesse no navegador: `http://localhost:5173`

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Header.jsx      # Cabeçalho com navegação
│   ├── Footer.jsx      # Rodapé
│   ├── Layout.jsx      # Layout principal
│   ├── SubjectCard.jsx # Cards das matérias
│   └── Sidebar.jsx     # Barra lateral das páginas de matérias
├── pages/              # Páginas da aplicação
│   ├── Home.jsx        # Página inicial
│   ├── SaudeAtleta.jsx # Fisioterapia na Saúde do Atleta
│   ├── UnidadeHospitalar.jsx # Fisioterapia em Unidade Hospitalar
│   ├── SaudeIdoso.jsx  # Fisioterapia na Saúde do Idoso
│   ├── Neurofuncional.jsx # Fisioterapia Neurofuncional
│   ├── Sobre.jsx       # Página sobre
│   └── Contato.jsx     # Página de contato
└── assets/             # Arquivos estáticos
```

## 🎨 Design System

### Cores Principais
- **Azul (Atleta)**: `#3b82f6` - Fisioterapia na Saúde do Atleta
- **Teal (Hospitalar)**: `#14b8a6` - Fisioterapia em Unidade Hospitalar  
- **Verde (Idoso)**: `#22c55e` - Fisioterapia na Saúde do Idoso
- **Roxo (Neuro)**: `#a855f7` - Fisioterapia Neurofuncional

### Tipografia
- **Fonte Principal**: Inter (Google Fonts)
- **Pesos**: 300, 400, 500, 600, 700

## 📱 Responsividade

O projeto foi desenvolvido com design responsivo, adaptando-se perfeitamente a:
- **Desktop** (1024px+)
- **Tablet** (768px - 1023px)
- **Mobile** (até 767px)

## 🧩 Componentes Principais

### Header
- Navegação responsiva com menu mobile
- Logo clicável
- Links ativos destacados

### SubjectCard  
- Cards interativos para cada matéria
- Gradientes coloridos por área
- Animações de hover

### Sidebar
- Navegação interna das páginas de matérias
- Seções: Conteúdo, Materiais, Simulados, Recursos
- Indicador visual da seção ativa

## 📄 Páginas

### Home
- Hero section com call-to-action
- Cards das 4 matérias principais
- Seção sobre o portal
- Design moderno e acolhedor

### Páginas de Matérias
- Layout com sidebar para navegação interna
- Hero section colorido por matéria
- Seções organizadas: Conteúdo Programático, Materiais de Estudo, Simulados, Recursos Extras
- Conteúdo placeholder pronto para inserção

### Sobre
- Informações sobre o portal
- Missão e diferenciais
- Estatísticas do projeto
- Design institucional

### Contato
- Formulário de contato completo
- Informações de contato
- FAQ básico
- Layout profissional

## 🔧 Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build de produção
```

## 🎯 Próximos Passos

- [ ] Adicionar conteúdo real às páginas de matérias
- [ ] Implementar sistema de busca
- [ ] Adicionar funcionalidade aos simulados
- [ ] Integrar sistema de download de materiais
- [ ] Implementar sistema de comentários/feedback

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Desenvolvido com ❤️ para a educação em fisioterapia.
