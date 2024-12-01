import React, { useEffect, useState } from 'react';

// Definindo o tipo de citação (quote)
type Quote = {
  text: string;
  author: string;
};

const InspirationPage = () => {
  const [quote, setQuote] = useState<Quote | null>(null); // Mudando para o tipo correto
  const [loading, setLoading] = useState<boolean>(true);

  const fetchQuote = async () => {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = 'https://zenquotes.io/api/random';
  
    try {
      const response = await fetch(proxyUrl + targetUrl, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      });
  
      const data = await response.json();
      console.log('Resposta da API:', data);
  
      // Aqui, acessamos o índice [0] e as propriedades q e a
      if (data.length > 0) {
        setQuote({
          text: data[0]?.q,  // Citação
          author: data[0]?.a, // Autor
        });
      } else {
        console.error('Nenhuma citação encontrada');
      }
    } catch (error) {
      console.error('Erro ao carregar citação:', error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  console.log("Citação atual:", quote); // Verifique se o estado está sendo atualizado

  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '30px', // Aumenta o padding ao redor do conteúdo
        borderRadius: '5px',
        textAlign: 'center',
        width: '60%', // Diminuindo a largura do contêiner
        maxWidth: '600px', // Máxima largura do contêiner
        margin: '0 auto', // Centraliza o contêiner na tela
      }}
    >
      {quote ? (
        <>
          <blockquote
            style={{
              fontStyle: 'italic',
              fontSize: '1.5rem', // Aumenta o tamanho da citação
              marginBottom: '30px', // Aumenta o espaço abaixo da citação
            }}
          >
            {quote.text}
          </blockquote>
          <footer
            style={{
              fontWeight: 'bold',
              fontSize: '1.2rem', // Aumenta o tamanho do nome do autor
              marginTop: '10px',
            }}
          >
            - {quote.author}
          </footer>
          <button
            onClick={fetchQuote}
            style={{
              maxWidth: '140px', // Limita a largura do botão
              width: '40%', // Largura do botão é 40% da largura do contêiner
              marginTop: '40px', // Aumenta o espaço acima do botão
              padding: '12px 20px', // Aumenta o padding dentro do botão
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '1.0rem', // Aumenta o tamanho da fonte do botão
            }}
          >
            Carregar outra citação
          </button>
        </>
      ) : (
        <p>Carregando citação...</p>
      )}
    </div>
  );
  
  
}

export default InspirationPage;
