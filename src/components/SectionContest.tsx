import React from 'react';

interface SectionProps {
  content: {
    h2: string;
    table?: React.ReactNode;
    Votar?: React.ComponentType; // Defina o tipo como React.ComponentType
  };
}

const SectionContest: React.FC<SectionProps> = ({ content }) => {


  const { h2, table } = content;

  return (
    <section>
      <h2>{h2} </h2>
      {table && (
        <div className="table-container">{table}</div>
      )}

    </section>
  );
};

export default SectionContest;
