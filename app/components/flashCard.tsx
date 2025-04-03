"use client"
import React, { useState } from 'react';
import AnimacaoFlashcard from './cards/animacaoFlashcard';
import Pergunta from './cards/pergunta';
import Resposta from './cards/resposta';
import MensagemInicial from './cards/mensagemInicial';
import BotaoResposta from './cards/botaoResposta';

type ConteudoDisciplina = {
  pergunta: string;
  resposta: string;
};

interface FlashcardProps {
  conteudoDisciplina: ConteudoDisciplina | null;
  mensagem: string;
  showDisciplinas: boolean;
  setShowDisciplinas: React.Dispatch<React.SetStateAction<boolean>>;
  mostrarPergunta: boolean;
  setMostrarPergunta: React.Dispatch<React.SetStateAction<boolean>>;
  setCardAtual: React.Dispatch<React.SetStateAction<ConteudoDisciplina | null>>;
  setListaDeCards: React.Dispatch<React.SetStateAction<ConteudoDisciplina[]>>;
  selecionarProximoCard: () => void;
  setIsModalLogin: React.Dispatch<React.SetStateAction<boolean>>;
  isLogged: boolean;
}

const Flashcard: React.FC<FlashcardProps> = ({
  conteudoDisciplina,
  mensagem,
  showDisciplinas,
  setShowDisciplinas,
  mostrarPergunta,
  setMostrarPergunta,
  selecionarProximoCard,
  setIsModalLogin,
  isLogged,
}) => {
  const [animacao, setAnimacao] = useState(0);

  const handleResposta = (direcao: number) => {
    setAnimacao(direcao);
    setTimeout(() => {
      setAnimacao(0);
      selecionarProximoCard();
    }, 300);
  };

  return (
    <div className="w-full max-w-lg lg:max-w-4xl mt-4 px-2 sm:px-0">
      <AnimacaoFlashcard animacao={animacao}>
        {conteudoDisciplina ? (
          <>
            {!mostrarPergunta ? (
              <Pergunta
                conteudoDisciplina={conteudoDisciplina}
                setMostrarPergunta={setMostrarPergunta}
              />
            ) : (
              <Resposta
                conteudoDisciplina={conteudoDisciplina}
                setMostrarPergunta={setMostrarPergunta}
              />
            )}
          </>
        ) : (
          <MensagemInicial
            mensagem={mensagem}
            showDisciplinas={showDisciplinas}
            setShowDisciplinas={setShowDisciplinas}
          />
        )}
      </AnimacaoFlashcard>

      {conteudoDisciplina && (
        <BotaoResposta handleResposta={handleResposta} setIsModalLogin={setIsModalLogin} isLogged={isLogged} />
      )}
    </div>
  );
};

export default Flashcard;
