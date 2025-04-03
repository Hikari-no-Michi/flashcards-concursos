import React, { useRef } from 'react';

const MensagemInicial: React.FC<{ 
  mensagem: string;
  showDisciplinas: boolean;
  setShowDisciplinas: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ mensagem, showDisciplinas, setShowDisciplinas }) => {
  const scrollRef = useRef<HTMLUListElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -250 : 250;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const cursos = [
    { 
      nome: "Polícia Federal", 
      img: "/1908SMHOUSE12788Promotionscupomcapaprincipal_Ddmw.avif",
      link: "#"
    },
    { 
      nome: "Banco do Brasil", 
      img: "/0309SMHOUSE12788PromotionsJBBcapaprincipal_rwtr.avif",
      link: "#"
    },
    { 
      nome: "MP PI", 
      img: "1908SMHOUSE12788Promotionscupomcapaprincipal_Ddmw.avif",
      link: "#"
    },
    { 
      nome: "GCM Teresina", 
      img: "/0309SMHOUSE12788PromotionsJBBcapaprincipal_rwtr.avif",
      link: "#"
    }
  ];

  return (
    <div className="flex flex-col justify-center items-center h-full w-full mb-[100px]">
      {/* Lista de Cards */}
      <ul className="w-full flex overflow-x-auto space-x-4 py-5 px-5 scrollbar-hidden" ref={scrollRef}>
        {cursos.map((curso, index) => (
          <li key={index} className="flex-shrink-0 w-[250px] h-[150px]">
            <a href={curso.link} target="_blank" rel="noopener noreferrer">
              <img src={curso.img} alt={curso.nome} className="w-full h-full object-cover rounded-lg shadow-lg" />
            </a>
          </li>
        ))}
      </ul>

      {/* Botões de navegação */}
      <div className="flex justify-center space-x-4">
        <button
          className="bg-slate-50 text-slate-600 p-2 rounded-md shadow-lg flex justify-center items-center w-20 h-9"
          onClick={() => handleScroll('left')}
        >
          Voltar
        </button>
        <button
          className="bg-slate-50 text-slate-600 p-2 rounded-md shadow-lg flex justify-center items-center w-20 h-9"
          onClick={() => handleScroll('right')}
        >
          Próximo
        </button>
      </div>

      {/* Mensagem de motivação */}
      <h2 className="text-2xl font-bold text-[#0288d1] text-center md:text-3xl px-5 py-5">
        {mensagem}
      </h2>

      {/* Botão de ação */}
      {!showDisciplinas && (
        <button
          className="bg-[#0288d1] text-white px-8 py-3 rounded-md shadow-lg border-2 border-[#0288d1] hover:bg-[#01579b] focus:outline-none"
          onClick={() => setShowDisciplinas(true)}
        >
          Vamos Começar ?
        </button>
      )}
    </div>
  );
};

export default MensagemInicial;
