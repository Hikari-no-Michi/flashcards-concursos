import { useEffect, useState } from "react";

const frasesMotivacionais: string[] = [
  "A vitória começa com o primeiro passo!",
  "O esforço de hoje é a conquista de amanhã.",
  "Você é mais forte do que imagina.",
  "O sucesso é a soma de pequenos esforços.",
  "O caminho é difícil, mas a vitória é doce.",
  "O único limite é o que você acredita ser.",
  "Transforme seus sonhos em planos.",
  "O trabalho duro traz resultados.",
  "Se você pode sonhar, você pode alcançar.",
  "Acredite em si mesmo e todo o resto virá.",
  "Nunca desista, o começo é sempre o mais difícil.",
  "A jornada é longa, mas cada passo vale a pena.",
  "O fracasso é apenas o começo do sucesso.",
  "Se você não tentar, nunca saberá do que é capaz.",
  "O futuro pertence àqueles que acreditam em seus sonhos.",
  "Sua única competição é você mesmo.",
  "Nada vem fácil, mas tudo vale a pena.",
  "A persistência transforma fracasso em sucesso.",
  "Hoje é o dia perfeito para começar.",
  "Acredite no seu potencial e vá além!",
];

export default function useFrasesMotivacionais() {
  const [mensagem, setMensagem] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedMensagem = localStorage.getItem("mensagem");
      if (storedMensagem) {
        setMensagem(storedMensagem);
      } else {
        const randomMessage = frasesMotivacionais[Math.floor(Math.random() * frasesMotivacionais.length)];
        localStorage.setItem("mensagem", randomMessage);
        setMensagem(randomMessage);
      }
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomMessage = frasesMotivacionais[Math.floor(Math.random() * frasesMotivacionais.length)];
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("mensagem", randomMessage);
        setMensagem(randomMessage);
      }
    }, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return mensagem;
}