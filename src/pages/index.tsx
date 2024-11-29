// /pages/index.tsx
import React from 'react';
import QuoteComponent from '../components/../pages/quotes';
import Main from '../components/layout/Main'; // Importação correta do componente Main


export default function HomePage() {
  return (
    <div>
      <Main>
        <QuoteComponent />
      </Main>
    </div>
  );
}
