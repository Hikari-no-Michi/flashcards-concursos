import React, { useState } from 'react';

interface RespostaProps {
  conteudoDisciplina: { resposta: string };
  setMostrarPergunta: React.Dispatch<React.SetStateAction<boolean>>;
}

const Resposta: React.FC<RespostaProps> = ({ conteudoDisciplina, setMostrarPergunta }) => {
  
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setMostrarPergunta(false);
  };

  return (
    <>
    <h2 className='p-3'>Matéria  Disciplina</h2>
    <p
      onClick={handleClick}
      className={`border-2 border-gray-300 rounded-lg p-4 bg-white shadow-md transition-transform h-[55vh] flex justify-center items-center text-slate-700 text-sm `}
    >
      {conteudoDisciplina.resposta}
    </p>
    </>
  );
};

export default Resposta;
