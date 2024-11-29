import { useEffect, useState } from 'react';

interface Quote {
  q: string;  // Citação
  a: string;  // Autor da citação
}

export default function ZenQuote() {
  const [quote, setQuote] = useState<Quote | null>(null);  // Estado para armazenar a citação

  // Função para buscar uma nova citação
  const fetchNewQuote = async () => {
    try {
      const response = await fetch('https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/random', {
        headers: {
          'Authorization': 'Bearer YOUR_CORS_ANYWHERE_API_KEY',  // Aqui vai a chave do CORS Anywhere
        },
      });
      const data = await response.json();

      // Supondo que a API retorna um array, pegamos o primeiro elemento
      if (data && data.length > 0) {
        setQuote({ q: data[0].q, a: data[0].a });
      }
      
      console.log(data);
    } catch (error) {
      console.error('Erro ao buscar citação:', error);
    }
  };
  
  // Carregar uma citação ao montar o componente
  useEffect(() => {
    fetchNewQuote();  // Carregar uma citação ao iniciar
  }, []); // [] significa que o efeito será executado apenas uma vez, quando o componente for montado

  return (
    <div className="p-4 text-center">
      {/* Exibindo a citação ou uma mensagem de carregamento */}
      {quote ? (
        <div>
          <p className="text-xl font-semibold">{`"${quote.q}"`}</p>
          <p className="text-md text-gray-500">- {quote.a}</p>
        </div>
      ) : (
        <p>Carregando citação...</p>
      )}

      {/* Botão para buscar uma nova citação */}
      <button 
        onClick={fetchNewQuote}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Buscar outra citação
      </button>
    </div>
  );
}
