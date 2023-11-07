import React from 'react';

interface AsideProps {
  content: {
    div?: {
      className?: string;
      children: React.ReactNode;
    };
    h2: string;
    p: string;
    table?: React.ReactNode; // Adicionamos a propriedade 'table' ao conteúdo

  };
}

const Aside: React.FC<AsideProps> = ({ content }) => {
  const { div, h2, p, table } = content;

  return (
    <aside>
      <h2>{h2}</h2>
      {div && (
        <div className={div.className}>{div.children}</div>
      )}
      <p>{p}</p>
      {table && (
        <div className="table-container">{table}</div>
      )}
    </aside>
  );
};

export default Aside;
