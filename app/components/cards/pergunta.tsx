import React, { useState } from 'react';

interface PerguntaProps {
  conteudoDisciplina: { pergunta: string };
  setMostrarPergunta: React.Dispatch<React.SetStateAction<boolean>>;
}

const Pergunta: React.FC<PerguntaProps> = ({ conteudoDisciplina, setMostrarPergunta }) => {
  
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();    
    setMostrarPergunta(true);
  };

  const formatText = (text: string) => {
    const words = text.split(' '); // Quebra o texto em palavras
    let firstHalf = '';
    let secondHalf = '';

    for (let i = 0; i < words.length; i++) {
      if (firstHalf.length + words[i].length <= text.length / 2) {
        firstHalf += words[i] + ' '; 
      } else {
        secondHalf += words.slice(i).join(' ');
        break;
      }
    }

    return (
      <div style={{ textAlign: 'center' }}>
        <div>{firstHalf.trim()}</div>
        <div>{secondHalf.trim()}</div>
      </div>
    );
  };

  return (
    <>
    <h2 className='p-3'>Matéria  Disciplina</h2>
    <h2
      onClick={handleClick}
      className={`border-2 border-gray-300 rounded-lg p-4 bg-white shadow-md transition-transform h-[55vh] flex justify-center items-center text-blue-500 text-xl font-semibold text-center `}
    >
      {
      conteudoDisciplina.pergunta.length > 30 ? 
      formatText(conteudoDisciplina.pergunta) 
      : conteudoDisciplina.pergunta
      }
    </h2>
    </>
  );
};

export default Pergunta;
