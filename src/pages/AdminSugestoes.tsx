import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getSuggestions, updateSuggestionStatus, type Suggestion, type SuggestionStatus } from '../services/suggestionsService';

// Função para verificar se o usuário é administrador
const isAdmin = (profile: any) => {
  return profile?.role === 'admin';
};

export default function AdminSugestoes() {
  const { user, profile, loading } = useAuth();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<SuggestionStatus | 'all'>('all');
  const [adminNotes, setAdminNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && isAdmin(profile)) {
      loadSuggestions();
    }
  }, [user, profile, selectedStatus]);

  const loadSuggestions = async () => {
    try {
      const data = await getSuggestions(
        selectedStatus !== 'all' ? { status: selectedStatus as SuggestionStatus } : undefined
      );
      setSuggestions(data);
    } catch (err) {
      console.error('Error loading suggestions:', err);
      setError('Erro ao carregar sugestões');
    }
  };

  const handleStatusUpdate = async (suggestionId: string, newStatus: SuggestionStatus) => {
    try {
      setIsLoading(true);
      await updateSuggestionStatus(suggestionId, newStatus, adminNotes);
      setAdminNotes('');
      await loadSuggestions();
    } catch (err) {
      console.error('Error updating suggestion:', err);
      setError('Erro ao atualizar status da sugestão');
    } finally {
      setIsLoading(false);
    }
  };

  // Primeiro, esperamos o carregamento do AuthContext terminar
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  // Agora, com loading=false, podemos checar a permissão com segurança
  if (!user || !isAdmin(profile)) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold text-red-600">
          Acesso Negado
        </h1>
        <p className="mt-2">
          Você não tem permissão para acessar esta página.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Painel Administrativo - Sugestões</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-6">
        <label className="block text-gray-700 mb-2">
          Filtrar por status
        </label>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value as SuggestionStatus | 'all')}
          className="w-48 px-3 py-2 border rounded"
        >
          <option value="all">Todos</option>
          <option value="pending">Em análise</option>
          <option value="in_progress">Em produção</option>
          <option value="completed">Concluídas</option>
          <option value="rejected">Rejeitadas</option>
        </select>
      </div>

      <div className="grid gap-6">
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">{suggestion.title}</h3>
                <p className="text-gray-500 text-sm">
                  Por: {suggestion.profiles?.nome || 'Usuário'}
                  {suggestion.want_notifications && ' (Deseja receber notificações)'}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                suggestion.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                suggestion.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                suggestion.status === 'completed' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}>
                {suggestion.status === 'pending' ? 'Em análise' :
                 suggestion.status === 'in_progress' ? 'Em produção' :
                 suggestion.status === 'completed' ? 'Concluída' :
                 'Rejeitada'}
              </span>
            </div>

            <p className="text-gray-700 mb-4">{suggestion.description}</p>

            <div className="border-t pt-4">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Observações do administrador
                </label>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  rows={2}
                  placeholder="Adicione observações sobre a atualização do status..."
                />
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleStatusUpdate(suggestion.id, 'pending')}
                  disabled={isLoading || suggestion.status === 'pending'}
                  className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 disabled:opacity-50"
                >
                  Em análise
                </button>
                <button
                  onClick={() => handleStatusUpdate(suggestion.id, 'in_progress')}
                  disabled={isLoading || suggestion.status === 'in_progress'}
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 disabled:opacity-50"
                >
                  Em produção
                </button>
                <button
                  onClick={() => handleStatusUpdate(suggestion.id, 'completed')}
                  disabled={isLoading || suggestion.status === 'completed'}
                  className="px-4 py-2 bg-green-100 text-green-800 rounded hover:bg-green-200 disabled:opacity-50"
                >
                  Concluída
                </button>
                <button
                  onClick={() => handleStatusUpdate(suggestion.id, 'rejected')}
                  disabled={isLoading || suggestion.status === 'rejected'}
                  className="px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200 disabled:opacity-50"
                >
                  Rejeitar
                </button>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-500">
              <p>Criada em: {new Date(suggestion.created_at).toLocaleDateString()}</p>
              {suggestion.admin_notes && (
                <p className="mt-2">
                  <strong>Última observação:</strong> {suggestion.admin_notes}
                </p>
              )}
            </div>
          </div>
        ))}

        {suggestions.length === 0 && (
          <p className="text-gray-500">
            Nenhuma sugestão encontrada {selectedStatus !== 'all' ? 'com este status' : ''}.
          </p>
        )}
      </div>
    </div>
  );
}
