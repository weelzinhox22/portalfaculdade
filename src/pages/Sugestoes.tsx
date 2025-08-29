import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { createSuggestion, getSuggestions, type Suggestion } from '../services/suggestionsService';

export default function Sugestoes() {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [wantNotifications, setWantNotifications] = useState(true);
  const [userSuggestions, setUserSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      loadUserSuggestions();
    }
  }, [user]);

  const loadUserSuggestions = async () => {
    try {
      const suggestions = await getSuggestions({ userId: user?.id });
      setUserSuggestions(suggestions);
    } catch (err) {
      console.error('Error loading suggestions:', err);
      setError('Erro ao carregar suas sugestões');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (!user) throw new Error('Você precisa estar logado para enviar sugestões');

      await createSuggestion({
        title,
        description,
        user_id: user.id,
        want_notifications: wantNotifications
      });

      setTitle('');
      setDescription('');
      setWantNotifications(true);
      loadUserSuggestions();
      alert('Sugestão enviada com sucesso!');
    } catch (err) {
      console.error('Error submitting suggestion:', err);
      setError('Erro ao enviar sugestão. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status] || colors.pending;
  };

  const getStatusText = (status: string) => {
    const texts = {
      pending: 'Em análise',
      in_progress: 'Em produção',
      completed: 'Concluída',
      rejected: 'Rejeitada'
    };
    return texts[status] || texts.pending;
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Sugestões</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Enviar nova sugestão</h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="title">
              Título
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="description">
              Descrição
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              rows={4}
              required
            />
          </div>

          <div className="mb-6">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={wantNotifications}
                onChange={(e) => setWantNotifications(e.target.checked)}
                className="form-checkbox"
              />
              <span>Desejo receber notificações sobre o status da minha sugestão</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Enviando...' : 'Enviar Sugestão'}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Minhas Sugestões</h2>
        {userSuggestions.length === 0 ? (
          <p className="text-gray-500">Você ainda não enviou nenhuma sugestão.</p>
        ) : (
          <div className="space-y-4">
            {userSuggestions.map((suggestion) => (
              <div key={suggestion.id} className="border rounded p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{suggestion.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(suggestion.status)}`}>
                    {getStatusText(suggestion.status)}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{suggestion.description}</p>
                {suggestion.admin_notes && (
                  <div className="mt-2 p-2 bg-gray-50 rounded">
                    <p className="text-sm text-gray-600">
                      <strong>Observações:</strong> {suggestion.admin_notes}
                    </p>
                  </div>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  Enviada em: {new Date(suggestion.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
