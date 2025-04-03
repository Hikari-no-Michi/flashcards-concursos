"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faChartBar, 
  faBook, 
  faClipboardList, 
  faUser, 
  faDollarSign, 
  faClock 
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

type HeaderProps = {
  titulo: string;
  setShowDisciplinas: (value: boolean) => void;
  isLogged: boolean;
  setIsModalLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header: React.FC<HeaderProps> = ({ titulo, setShowDisciplinas, isLogged, setIsModalLogin }) => {
  const [esta_logado, func_esta_logado] = useState<boolean>(isLogged);
  const [diasRestantes, setDiasRestantes] = useState<number>(30);

  useEffect(() => {
    const calcularDias = () => {
      const dataExpiracao = new Date();
      dataExpiracao.setDate(dataExpiracao.getDate() + 30);
      const hoje = new Date();
      const diferenca = Math.ceil((dataExpiracao.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24));
      setDiasRestantes(diferenca);
    };
    calcularDias();
  }, []);

  return (
    <header className="w-full text-slate-50 p-4 shadow-md flex flex-col items-center lg:justify-center lg:fixed lg:top-0 lg:left-0 lg:w-full lg:h-[70px] bg-blue-900 lg:bg-white lg:text-slate-800">
      <div className="w-full flex justify-between items-center max-w-lg lg:justify-center">
        <h1 className="text-base font-semibold lg:text-lg">{titulo}</h1>
        <button
          onClick={() => {
            if (esta_logado) {
              func_esta_logado(false);
              localStorage.removeItem("token");
              localStorage.removeItem("user");
            } else {
              setIsModalLogin(true);
            }
          }}
          className="w-[100px] text-sm text-white bg-blue-700 px-3 p-1 rounded-full flex items-center justify-center cursor-pointer lg:absolute lg:right-4 lg:top-1/2 lg:-translate-y-1/2 lg:px-5 lg:py-2 lg:text-base lg:font-semibold"
        >
          {esta_logado ? "Sair" : "Login"}
        </button>
      </div>
      <div className="w-full flex justify-between mt-2 max-w-lg lg:hidden">
        <button className="flex-1 bg-blue-600 p-2 mx-0.5 rounded-md flex flex-col items-center justify-center text-sm text-slate-50">
          <FontAwesomeIcon icon={faChartBar} className="w-6 h-6 mb-1" />
          <span>Estatísticas</span>
        </button>
        <button
          onClick={() => setShowDisciplinas(true)}
          className="flex-1 bg-blue-600 p-2 mx-0.5 rounded-md flex flex-col items-center justify-center text-sm text-slate-50"
        >
          <FontAwesomeIcon icon={faBook} className="w-6 h-6 mb-1" />
          <span>Disciplina</span>
        </button>
        <button className="flex-1 bg-blue-600 p-2 mx-0.5 rounded-md flex flex-col items-center justify-center text-sm text-slate-50">
          <FontAwesomeIcon icon={faClipboardList} className="w-6 h-6 mb-1" />
          <span>Revisão</span>
        </button>
      </div>
      <div className="w-full text-center text-sm m-2 text-slate-50 md:text-yellow-500 lg:text-yellow-500">
        <FontAwesomeIcon icon={faClock} className="mr-2" />
        {diasRestantes} dias restantes na conta free
      </div>
    </header>
  );
};

const Sidebar: React.FC<{ setShowDisciplinas: (value: boolean) => void }> = ({ setShowDisciplinas }) => {
  return (
    <nav className="hidden lg:flex lg:flex-col lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-[300px] lg:bg-white lg:shadow-lg lg:py-5 lg:border-r">
      <div className="w-full h-[200px] flex items-center justify-center text-slate-800 text-xl font-bold">
        Logo
      </div>

      <div className="flex flex-col w-full">
        <button className="w-full h-[45px] flex items-center px-5 text-slate-800 text-sm hover:bg-blue-700 transition">
          <FontAwesomeIcon icon={faUser} className="w-5 h-5 mr-3 text-slate-800 text-sm" />
          <span>Perfil</span>
        </button>
        <button className="w-full h-[45px] flex items-center px-5 text-slate-800 text-sm hover:bg-blue-700 transition">
          <FontAwesomeIcon icon={faChartBar} className="w-5 h-5 mr-3 text-slate-800 text-sm" />
          <span>Estatísticas</span>
        </button>
        <button
          onClick={() => setShowDisciplinas(true)}
          className="w-full h-[45px] flex items-center px-5 text-slate-800 text-sm hover:bg-blue-700 transition"
        >
          <FontAwesomeIcon icon={faBook} className="w-5 h-5 mr-3 text-slate-800 text-sm" />
          <span>Disciplinas</span>
        </button>
        <button className="w-full h-[45px] flex items-center px-5 text-slate-800 text-sm hover:bg-blue-700 transition">
          <FontAwesomeIcon icon={faClipboardList} className="w-5 h-5 mr-3 text-slate-800 text-sm" />
          <span>Revisão</span>
        </button>
        <button className="w-full h-[45px] flex items-center px-5 text-slate-800 text-sm hover:bg-blue-700 transition">
          <FontAwesomeIcon icon={faDollarSign} className="w-5 h-5 mr-3 text-slate-800 text-sm" />
          <span>Financeiro</span>
        </button>
      </div>
    </nav>
  );
};

export { Header, Sidebar };
