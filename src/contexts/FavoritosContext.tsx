import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface FavoritoItem {
  id: number;
  titulo: string;
  tipo: string;
  dataAdicionado: string;
  [key: string]: any; // Para outras propriedades específicas
}

interface FavoritosContextType {
  favoritos: FavoritoItem[];
  adicionarFavorito: (item: { titulo: string; tipo: string; [key: string]: any }) => boolean;
  removerFavorito: (id: number) => void;
  removerFavoritoPorItem: (titulo: string, tipo: string) => void;
  isFavorito: (titulo: string, tipo: string) => boolean;
  toggleFavorito: (item: { titulo: string; tipo: string; [key: string]: any }) => boolean;
  getFavoritosPorTipo: (tipo: string) => FavoritoItem[];
  limparFavoritos: () => void;
}

const FavoritosContext = createContext<FavoritosContextType | undefined>(undefined);

export const useFavoritos = () => {
  const context = useContext(FavoritosContext);
  if (!context) {
    throw new Error('useFavoritos deve ser usado dentro de um FavoritosProvider');
  }
  return context;
};

export const FavoritosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [favoritos, setFavoritos] = useState<FavoritoItem[]>([]);

  // Carregar favoritos do localStorage quando o usuário faz login
  useEffect(() => {
    if (isAuthenticated && user) {
      const favoritosKey = `favoritos_${user.email || user.id || 'default'}`;
      const favoritosSalvos = localStorage.getItem(favoritosKey);
      
      if (favoritosSalvos) {
        try {
          setFavoritos(JSON.parse(favoritosSalvos));
        } catch (error) {
          console.error('Erro ao carregar favoritos:', error);
          setFavoritos([]);
        }
      } else {
        setFavoritos([]);
      }
    } else {
      setFavoritos([]);
    }
  }, [isAuthenticated, user]);

  // Salvar favoritos no localStorage sempre que a lista mudar
  useEffect(() => {
    if (isAuthenticated && user) {
      const favoritosKey = `favoritos_${user.email || user.id || 'default'}`;
      localStorage.setItem(favoritosKey, JSON.stringify(favoritos));
    }
  }, [favoritos, isAuthenticated, user]);

  const adicionarFavorito = (item: { titulo: string; tipo: string; [key: string]: any }): boolean => {
    if (!isAuthenticated) {
      alert('Você precisa estar logado para adicionar favoritos');
      return false;
    }

    const novoFavorito: FavoritoItem = {
      id: Date.now(), // ID único baseado no timestamp
      ...item,
      dataAdicionado: new Date().toISOString()
    };

    setFavoritos(prev => {
      // Verificar se já existe (baseado no título e tipo)
      const jaExiste = prev.some(fav => 
        fav.titulo === item.titulo && fav.tipo === item.tipo
      );
      
      if (jaExiste) {
        return prev; // Não adiciona duplicatas
      }
      
      return [...prev, novoFavorito];
    });

    return true;
  };

  const removerFavorito = (id: number): void => {
    setFavoritos(prev => prev.filter(item => item.id !== id));
  };

  const removerFavoritoPorItem = (titulo: string, tipo: string): void => {
    setFavoritos(prev => prev.filter(item => 
      !(item.titulo === titulo && item.tipo === tipo)
    ));
  };

  const isFavorito = (titulo: string, tipo: string): boolean => {
    return favoritos.some(item => 
      item.titulo === titulo && item.tipo === tipo
    );
  };

  const toggleFavorito = (item: { titulo: string; tipo: string; [key: string]: any }): boolean => {
    if (isFavorito(item.titulo, item.tipo)) {
      removerFavoritoPorItem(item.titulo, item.tipo);
      return false; // Removido
    } else {
      return adicionarFavorito(item); // Retorna true se adicionado com sucesso
    }
  };

  const getFavoritosPorTipo = (tipo: string): FavoritoItem[] => {
    return favoritos.filter(item => item.tipo === tipo);
  };

  const limparFavoritos = (): void => {
    setFavoritos([]);
  };

  const value: FavoritosContextType = {
    favoritos,
    adicionarFavorito,
    removerFavorito,
    removerFavoritoPorItem,
    isFavorito,
    toggleFavorito,
    getFavoritosPorTipo,
    limparFavoritos
  };

  return (
    <FavoritosContext.Provider value={value}>
      {children}
    </FavoritosContext.Provider>
  );
};

export default FavoritosContext;
