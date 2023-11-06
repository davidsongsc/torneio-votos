import React from 'react';

interface SectionProps {
  content: {
    div?: {
      className?: string;
      children: React.ReactNode;
    };
    h2: string;
    p: string;
    table?: React.ReactNode;
    Votar?: React.ComponentType; // Defina o tipo como React.ComponentType
  };
}

const Section: React.FC<SectionProps> = ({ content }) => {
  const { h2, div, p, table, Votar } = content;

  return (
    <section>
      <h2>{h2}</h2>
      {div && (
        <div className={div.className}>{div.children}</div>
      )}
      <p>{p}</p>
      {table && (
        <div className="table-container">{table}</div>
      )}
      {Votar && (
        <div className="votar-container">
          <Votar /> {/* Renderiza o componente de votação */}
        </div>
      )}
    </section>
  );
};

export default Section;
