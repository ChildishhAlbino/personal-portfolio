import { useState } from "react";
import { useLettersMutator } from "@/hooks/use-letters-mutator";

export function Letters({ word, className, mutator }: LettersProps) {
  const [currentWord, setWord] = useState(word);
  useLettersMutator(word, setWord, mutator);
  return (
    <div className={`flex justify-between ${className || ""}`}>
      {currentWord.split("").map((letter, index) => (
        <h1 key={`${letter}_${index}`}>{letter}</h1>
      ))}
    </div>
  );
}

Letters.defaultProps = {
  mutator: null
};

type LettersProps = {
  word: string
  className?: string
  mutator?: Mutator
}

export type Mutator = {
  mutationLogic: (s: string, iterations: number) => string,
  iterates: boolean
}

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

export function generateRandomWord(word: string, iterations: number): string {
  const randomWord = word.split("").map((letter, index) => {
    const uniqueAlphabet = ALPHABET.replace(letter.toLowerCase(), "");
    return index < Math.floor(iterations) + 1
      ? letter
      : uniqueAlphabet[Math.floor(Math.random() * 25)];
  });
  return randomWord.join("");
}

