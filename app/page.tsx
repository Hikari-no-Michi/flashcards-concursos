"use client";
import React, { useState } from 'react';
import {Header, Sidebar} from './components/header';
import Flashcard from './components/flashCard';
import ModalDisciplinas from './components/modalDisciplinas';
import SearchBar from './components/searchBar.tsx';
import ModalLogin from './components/usuario/login';
import useAuth from '@/hooks/useAuth';
import useFrasesMotivacionais from '@/hooks/useFrasesMotivacionais';
import { useRouter } from 'next/navigation'; 
import useFlashcards from '@/hooks/useFlashcards';

export default function FlashcardApp() {
  const [showDisciplinas, setShowDisciplinas] = useState(false);
  const [pesquisa, setPesquisa] = useState('');
  const [isModalLogin, setIsModalLogin] = useState(false);
  const { isLogged, isLoading } = useAuth();
  const fraseMotivacional = useFrasesMotivacionais();

  // Utilizando o hook para gerenciar os flashcards
  const {
    disciplinas,
    selectedDisciplina,
    cardAtual,
    mostrarPergunta,
    handleSelectDisciplina,
    selecionarProximoCard,
    setMostrarPergunta
  } = useFlashcards();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-sky-500 text-white text-2xl font-bold text-center">
        Trajetória Concursos FlashCards
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-sky-100 flex flex-col items-center">
      <div className="hidden lg:flex">
        <Sidebar setShowDisciplinas={setShowDisciplinas} />
      </div>

      <Header
        titulo={selectedDisciplina ? selectedDisciplina.nome : "FlashCards"}
        setShowDisciplinas={setShowDisciplinas}
        isLogged={isLogged}
        setIsModalLogin={setIsModalLogin}
      />
      
      {isModalLogin && <ModalLogin onClose={function (): void {
        throw new Error('Function not implemented.');
      } } onLogin={function (): void {
        throw new Error('Function not implemented.');
      } } />}

      {showDisciplinas && (
        <ModalDisciplinas
          disciplinas={disciplinas}
          selectedDisciplina={selectedDisciplina}
          handleSelectDisciplina={handleSelectDisciplina}
          setShowDisciplinas={setShowDisciplinas}
          setMostrarPergunta={setMostrarPergunta}
        />
      )}

      <SearchBar placeholder="Pesquisar card" setPesquisa={setPesquisa} />
      
      <Flashcard
        conteudoDisciplina={cardAtual}
        mensagem={fraseMotivacional}
        showDisciplinas={showDisciplinas}
        setShowDisciplinas={setShowDisciplinas}
        mostrarPergunta={mostrarPergunta}
        setMostrarPergunta={setMostrarPergunta}
        selecionarProximoCard={selecionarProximoCard}
        setIsModalLogin={setIsModalLogin}
        isLogged={isLogged} setCardAtual={function (value: React.SetStateAction<{ pergunta: string; resposta: string; } | null>): void {
          throw new Error('Function not implemented.');
        } } setListaDeCards={function (value: React.SetStateAction<{ pergunta: string; resposta: string; }[]>): void {
          throw new Error('Function not implemented.');
        } }      />
    </div>
  );
}
