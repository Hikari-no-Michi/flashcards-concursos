import { useState } from 'react';

interface Disciplina {
  nome: string;
  arquivo: string;
}

interface Card {
  pergunta: string;
  resposta: string;
}

const disciplinas: Disciplina[] = [
  { nome: 'Direito Constitucional', arquivo: 'constitucional.json' },
  { nome: 'Direito Administrativo', arquivo: 'administrativo.json' },
  { nome: 'Direito Penal', arquivo: 'penal.json' },
  { nome: 'Direito Processual Penal', arquivo: 'processual_penal.json' },
  { nome: 'Arquivologia', arquivo: 'arquivologia.json' }
];

export default function useFlashcards() {
  const [selectedDisciplina, setSelectedDisciplina] = useState<Disciplina | null>(null);
  const [listaDeCards, setListaDeCards] = useState<Card[]>([]);
  const [cardAtual, setCardAtual] = useState<Card | null>(null);
  const [cardAtualNumber, setCardAtualNumber] = useState<number>(1);
  const [mostrarPergunta, setMostrarPergunta] = useState<boolean>(true);

  const fetchConteudoDisciplina = async (arquivo: string) => {
    try {
      const response = await fetch(`/${arquivo}`);
      const data: Card[] = await response.json();
      setListaDeCards(data);
      if (data.length > 0) {
        setCardAtual(data[Math.floor(Math.random() * data.length)]);
      }
    } catch (error) {
      console.error('Erro ao carregar o conteúdo da disciplina:', error);
    }
  };

  const handleSelectDisciplina = (disciplina: Disciplina) => {
    setSelectedDisciplina(disciplina);
    fetchConteudoDisciplina(disciplina.arquivo);
  };

  const selecionarProximoCard = () => {
    setMostrarPergunta(false);
    const proximoIndex = cardAtualNumber % listaDeCards.length;
    setCardAtual(listaDeCards[proximoIndex]);
    setCardAtualNumber(cardAtualNumber + 1);
    setMostrarPergunta(false);
  };

  return {
    disciplinas,
    selectedDisciplina,
    listaDeCards,
    cardAtual,
    cardAtualNumber,
    mostrarPergunta,
    handleSelectDisciplina,
    selecionarProximoCard,
    setMostrarPergunta,
  };
}
