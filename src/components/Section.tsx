import React from 'react';

interface SectionProps {
  content: {
    h2: string;
    table?: React.ReactNode;
    Votar?: React.ComponentType; // Defina o tipo como React.ComponentType
  };
}

const Section: React.FC<SectionProps> = ({ content }) => {
  const { h2,  table, Votar } = content;

  return (
    <section>
      <h2>{h2}</h2>

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
