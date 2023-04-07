import { useEffect, useState } from "react";
import { Mutator } from "@/components/spread-letters";

const ITERATION_INCREMENT = 1 / 12;
const INTERVAL_TIME = 1000 / 45;

export function useLettersMutator(word: string, setWord: any, mutator?: Mutator) {
  const [iterations, setIterations] = useState(0);
  useEffect(() => {
    if (mutator) {
      const { mutationLogic, iterates } = mutator;
      if (!iterates) {
        const randomWord = mutationLogic(
          word,
          iterations
        );
        setWord(randomWord);
      } else {
        if (iterations < word.length) {
          const intervalId = setInterval(() => {
            const randomWord = mutationLogic(
              word,
              iterations
            );
            setWord(randomWord);
            setIterations(
              (previousIterations) =>
                previousIterations + ITERATION_INCREMENT
            );
          }, INTERVAL_TIME);

          return () => clearInterval(intervalId);
        }
      }
    }
  }, [iterations]);
}