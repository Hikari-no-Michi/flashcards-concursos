import React, { useState, useEffect } from 'react';

interface BotaoRespostaProps {
  handleResposta: (direcao: number) => void;
  setIsModalLogin: React.Dispatch<React.SetStateAction<boolean>>;
  isLogged: boolean;
}

const BotaoResposta: React.FC<BotaoRespostaProps> = ({ handleResposta, setIsModalLogin, isLogged }) => {
  const [contador, setContador] = useState(0);
  
  useEffect(() => {
    if (contador >= 7 && !isLogged) {
      setIsModalLogin(true);
    }
  }, [contador, isLogged, setIsModalLogin]);

  const handleClickResposta = (direcao: number) => {
    if (!isLogged) {
      handleResposta(direcao);
      setContador(prev => prev + 1);
      if (contador + 1 >= 7) setIsModalLogin(true);
      return;
    }
    
    if (isLogged) {
      handleResposta(direcao)
      return;
    }
  };

  return (
    <div className="relative">
      <div className="flex justify-center space-x-4 mt-4">
        <div
          className="w-[200px] text-center bg-red-500 p-3 text-slate-50 select-none cursor-pointer focus:outline-none transition transform duration-200 hover:scale-105 active:scale-95 rounded-md shadow-md"
          onClick={(e) => {
            e.stopPropagation();
            handleClickResposta(-1);
          }}
        >
          <span className="font-semibold">Errei 😞</span>
        </div>
        <div
          className="w-[200px] text-center bg-green-500 p-3 text-slate-50 select-none cursor-pointer focus:outline-none transition transform duration-200 hover:scale-105 active:scale-95 rounded-md shadow-md"
          onClick={(e) => {
            e.stopPropagation();
            handleClickResposta(1);
          }}
        >
          <span className="font-semibold">Acertei! 😎</span>
        </div>
      </div>
    </div>
  );
};

export default BotaoResposta;
