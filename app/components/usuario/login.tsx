import React, { useState } from 'react';
import ModalCadastro from './cadastro';

const ModalLogin: React.FC<{ 
  onClose: () => void; 
  onLogin: () => void;
}> = ({ onClose, onLogin}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showCadastro, setShowCadastro] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      onLogin();
    }
  };

  return (
    <div>
      {showCadastro ? (
        <ModalCadastro
          onClose={() => setShowCadastro(false)}
          onCadastro={() => {
            console.log('Cadastro realizado');
            setShowCadastro(false);
          }}
        />
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center mx-2 relative">
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl right-3"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4">Faça o login</h3>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="w-full p-2 border rounded"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                Login
              </button>
            </form>
            <button onClick={() => setShowCadastro(true)} className="mt-4 text-blue-500">
              Criar Conta
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalLogin;
