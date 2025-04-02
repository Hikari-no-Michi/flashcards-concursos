"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faBook, faClipboardList } from "@fortawesome/free-solid-svg-icons";

type HeaderProps = {
  titulo: string;
  setShowDisciplinas: (value: boolean) => void;
  isLogged: boolean;
  onLogout: () => void;
};

const Header: React.FC<HeaderProps> = ({ titulo, setShowDisciplinas, isLogged, onLogout }) => {
  return (
    <header className="w-full bg-sky-600 text-white p-4 shadow-md flex flex-col items-center">
      <div className="w-full flex justify-between items-center max-w-lg">
        <h1 className="text-base font-semibold">{titulo}</h1>
        {isLogged && (
          <button
            onClick={onLogout}
            className="w-[100px] text-sm text-slate-800 bg-slate-50 px-3 p-1 rounded-full ml-auto"
          >
            Sair
          </button>
        )}
        {!isLogged && (
          <span className="text-sm text-slate-800 bg-slate-50 w-[100px] px-3 p-1 rounded-full">
            Login
          </span>
        )}
      </div>
      <div className="w-full flex justify-between mt-2 max-w-lg">
        <button className="flex-1 bg-sky-500 p-2 mx-0.5 rounded-md flex flex-col items-center justify-center text-sm">
          <FontAwesomeIcon icon={faChartBar} className="w-6 h-6 mb-1" />
          <span>Estatísticas</span>
        </button>
        <button
          onClick={() => setShowDisciplinas(true)}
          className="flex-1 bg-sky-500 p-2 mx-0.5 rounded-md flex flex-col items-center justify-center text-sm"
        >
          <FontAwesomeIcon icon={faBook} className="w-6 h-6 mb-1" />
          <span>Disciplina</span>
        </button>
        <button className="flex-1 bg-sky-500 p-2 mx-0.5 rounded-md flex flex-col items-center justify-center text-sm">
          <FontAwesomeIcon icon={faClipboardList} className="w-6 h-6 mb-1" />
          <span>Revisão</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
