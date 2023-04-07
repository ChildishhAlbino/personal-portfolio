import { useState } from "react";
import { useLettersMutator } from "@/hooks/use-letters-mutator";

export function Letters({ word, className, mutator }: LettersProps) {

  const initialMutation = mutator?.initialMutation
  const initialWord = initialMutation ? initialMutation(word, 0) : word
  const [currentWord, setWord] = useState(initialWord);
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
  mutator: null,
  initialMutation: null
};

type LettersProps = {
  word: string
  className?: string
  mutator?: Mutator
}

export type Mutator = {
  mutationLogic: MutationLogic,
  iterates: boolean,
  initialMutation?: MutationLogic
}

type MutationLogic = (s: string, iterations: number) => string

const ALPHABET: string = "abcdefghijklmnopqrstuvwxyz";

export function generateRandomWord(word: string, iterations: number): string {
  const randomWord = word.split("").map((letter, index) => {
    const uniqueAlphabet = ALPHABET.replace(letter.toLowerCase(), "");
    return index < Math.floor(iterations) + 1
      ? letter
      : uniqueAlphabet[Math.floor(Math.random() * uniqueAlphabet.length)] as string;
  });
  return randomWord.join("");
}

export function generateShiftedWord(word: string, iterations: number): string {
  const shiftedWord = word.split("").map((letter, index) => {
    const uniqueAlphabet = ALPHABET.replace(letter.toLowerCase(), "");
    const indexOfLetter = ALPHABET.indexOf(letter) as number
    return (uniqueAlphabet[indexOfLetter + index] || uniqueAlphabet[indexOfLetter - index]) as string
  });
  return shiftedWord.join("");
}


