"use client"

import { useState, useEffect } from 'react';

export default function useAuth() {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token')     
      

      console.log("Token encontrado:", token);

      try {
        const response = await fetch('/api/users/validateToken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token }) 
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Token válido:", data.user);
          setIsLogged(true);
        } else {
          console.log("Token inválido ou expirado.");
          setIsLogged(false);
        }
      } catch (error) {
        console.error("Erro ao validar o token:", error);
        setIsLogged(false);
      }

      setIsLoading(false);
    };

    verifyToken();
  }, []);

  return { isLogged, isLoading };
}
