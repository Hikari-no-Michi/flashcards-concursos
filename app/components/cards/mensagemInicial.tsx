import React, { useRef } from 'react';

const MensagemInicial: React.FC<{
  mensagem: string;
  showDisciplinas: boolean;
  setShowDisciplinas: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ mensagem, showDisciplinas, setShowDisciplinas }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -250 : 250;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full">
      {/* Cards rolando horizontalmente */}
      <div className="w-full overflow-x-auto flex space-x-4 py-5 px-5 scrollbar-hidden" ref={scrollRef}>
        {/* Card Polícia Federal */}
        <div className="flex-shrink-0 w-[250px] h-[150px] bg-white rounded-lg shadow-lg flex items-center p-4">
          <img
            src="https://d5gag3xtge2og.cloudfront.net/producao/33333516/G/1678655183719.png"
            alt="Polícia Federal"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h3 className="text-lg font-semibold">Polícia Federal</h3>
            <p className="text-sm text-gray-600">Curso preparatório para o concurso da Polícia Federal.</p>
          </div>
        </div>

        {/* Card Banco do Brasil */}
        <div className="flex-shrink-0 w-[250px] h-[150px] bg-white rounded-lg shadow-lg flex items-center p-4">
          <img
            src="https://t.ctcdn.com.br/uty-qsFeDcV-IrDWVSpY3HmGx_g=/i620291.jpeg"
            alt="Banco do Brasil"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h3 className="text-lg font-semibold">Banco do Brasil</h3>
            <p className="text-sm text-gray-600">Curso preparatório para o concurso do Banco do Brasil.</p>
          </div>
        </div>

        {/* Card MP PI */}
        <div className="flex-shrink-0 w-[250px] h-[150px] bg-white rounded-lg shadow-lg flex items-center p-4">
          <img
            src="https://cdn.focusconcursos.com.br/5333f320-a79d-11e7-be81-833fcc7d70fc/Banners/concurso-mp-pi-768x577.png"
            alt="MP PI"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h3 className="text-lg font-semibold">MP PI</h3>
            <p className="text-sm text-gray-600">Curso preparatório para o concurso do Ministério Público do Piauí.</p>
          </div>
        </div>

        {/* Card GCM Teresina */}
        <div className="flex-shrink-0 w-[250px] h-[150px] bg-white rounded-lg shadow-lg flex items-center p-4">
          <img
            src="https://implacavelconcursos.com.br/wp-content/uploads/2024/10/imagem_2024-10-10_234854671.png"
            alt="GCM Teresina"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h3 className="text-lg font-semibold">GCM Teresina</h3>
            <p className="text-sm text-gray-600">Curso preparatório para o concurso da Guarda Municipal de Teresina.</p>
          </div>
        </div>
      </div>

      {/* Botões de navegação (esquerda e direita) */}
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
