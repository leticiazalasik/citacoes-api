interface MainProps {
    children: React.ReactNode;
  }
  
  export default function Main({ children }: MainProps) {
    return (
      <main className="container mx-auto px-4 py-8 flex-grow">
        {children}
      </main>
    );
  }