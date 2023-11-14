import React from 'react';

interface SectionProps {
  content: {
    h2: string;
    table?: React.ReactNode;
    Votar?: React.ComponentType; // Defina o tipo como React.ComponentType
  };
}

const Section: React.FC<SectionProps> = ({ content }) => {


  const { table, Votar } = content;

  return (
    <section>
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
