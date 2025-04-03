"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Importando o useRouter

const ModalCadastro: React.FC<{ 
  onClose: () => void; 
  onCadastro: () => void;
}> = ({ onClose, onCadastro}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Controle de envio do formulário
  const router = useRouter(); // Usando o hook useRouter para navegação

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !email || !password) return;

    setIsSubmitting(true); // Desativa o botão quando o envio começa
  
    try {
      const response = await fetch('/api/users/createUsers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onCadastro();
        onClose();
      } else {
        console.error('Erro no cadastro:', data.message);
      }
    } catch (error) {
      console.error('Erro ao conectar com o servidor:', error);
    } finally {
      setIsSubmitting(false); // Reativa o botão se o cadastro falhar
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Bloquear caracteres especiais e espaços
    const regex = /^[a-zA-Z0-9_.]*$/;
    if (!regex.test(value)) {
      value = value.replace(/[^a-zA-Z0-9_.]/g, ''); // Remove caracteres inválidos
    }

    // Limpar o timeout existente se o usuário continuar digitando
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Atualiza o nome de usuário
    setUsername(value);

    const timeout = setTimeout(() => {
        let newValue = value;
      
        // Remove "_" ou "." do início e do fim do nome de usuário
        while (newValue.startsWith('_') || newValue.startsWith('.')) {
          newValue = newValue.slice(1);
        }
        while (newValue.endsWith('_') || newValue.endsWith('.')) {
          newValue = newValue.slice(0, -1);
        }
      
        setUsername(newValue);
      }, 2000);

    // Armazenar o timeout para poder limpá-lo se o usuário continuar digitando
    setTypingTimeout(timeout);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center mx-2 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
        <h3 className="text-xl font-semibold mb-4">Criar Conta</h3>
        <form onSubmit={handleCadastro}>
          <div className="mb-3 flex items-center">
            <div className="bg-gray-200 p-2 rounded-l-lg text-xl text-slate-800">@</div>
            <input
              type="text"
              className="w-full p-2 border rounded-r-lg"
              placeholder="nomedeusuario"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="w-full p-2 border rounded"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded"
            disabled={isSubmitting} // Desativa o botão enquanto o formulário está sendo submetido
          >
            {isSubmitting ? 'Cadastrando...' : 'Criar Conta'}
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-blue-500">
          Voltar ao Login
        </button>
      </div>
    </div>
  );
};

export default ModalCadastro;
