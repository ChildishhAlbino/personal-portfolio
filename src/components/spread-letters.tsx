export function Letters({ word, className }: LettersProps) {
    const letters = word.split('')

    return (
        <div className={`flex justify-between ${className || ''}`}>
            {letters.map((letter, index) => (
                <h1 key={`${letter}_${index}`}>{letter}</h1>
            ))}
        </div>
    )
}
type LettersProps = {
    word: string
    className?: string
}
