import "./App.css"
import { languages } from "./languages"
import { useState, useEffect } from "react"
import clsx from "clsx"
import { getFarewellText, randomWord } from "./utils"
import Confetti from "react-confetti"

export default function App(){

    const [currentWord, setCurrentWord] = useState(()=>randomWord())
    const [guessedLetter, setGuessedLetter] = useState([])

    const wrongGuessCount = guessedLetter.filter(x => !currentWord.word.includes(x)).length
    const isGameOver = wrongGuessCount >= languages.length-1
    const isGameWon = currentWord.word.split('').every(x=> guessedLetter.includes(x))
    let isFarewell
    const condition = wrongGuessCount > 0 ? wrongGuessCount-1 : 0   
    const lastGuess = guessedLetter[guessedLetter.length-1]
    const isLastGuessWrong = !isGameOver && lastGuess && !currentWord.word.includes(lastGuess)

    const alphabet = "abcdefghijklmnopqrstuvwxyz"


    const Languages = languages.map((x, index)=> {
       const isLost = wrongGuessCount > index
    
        return (
        <p className={clsx('lang', isLost && 'lost' )} key={index} 
        style={{backgroundColor: x.backgroundColor, 
            color: x.color}}>{x.name}</p>)
        }
    )

    

    const letterElements = currentWord.word.split('').map((x, index)=>{
        const isfailedLetter = isGameOver && !guessedLetter.includes(x)
        return(
        <span className={clsx('letters', isfailedLetter && 'incorrect')} key={index}>{guessedLetter.includes(x) ? x.toUpperCase() : "" || isGameOver ? x.toUpperCase() : ""}</span>
        )
})
   
    const keyboardElements = alphabet.split('').map((x,index)=> {
        const isRight = currentWord.word.split('').includes(x) && guessedLetter.includes(x)
        const isWrong = !currentWord.word.split('').includes(x) && guessedLetter.includes(x)

        return(
    <button disabled={isGameOver || isGameWon} className={clsx('btn', isRight && 'right', isWrong && 'wrong')} 
    onClick={()=> pickedLetter(x)} key={index}>{x.toUpperCase()}</button>
    )})

    function newGame(){
        setCurrentWord(randomWord())
        setGuessedLetter([])
    }

    function pickedLetter(val){
        setGuessedLetter(prevValue => 
            prevValue.includes(val)? prevValue :
             [...prevValue, val]) 
    }

    const gameStatClass = clsx('game-stat', isGameOver && 'lost', isGameWon && 'won', isLastGuessWrong && "farewell")

    return (
        <main>
            {isGameWon && <Confetti recycle={false} numberOfPieces={1000} width={window.innerWidth} height={window.innerHeight} />}
            <header>
                <h1 className="head">Assembly: Endgame</h1>
                <p className="info">
                    Guess the word in under 8 attempts to keep the programming
                    world safe from Assembly!
                </p>
            </header>

            <section className={gameStatClass}>
                {isGameWon ? (<>
                    <h2>YOU WIN</h2>
                    <p>Well done!</p>
                </>) : isGameOver ? (<>
                    <h2>Game Over!</h2>
                    <p>"you lose! Better start learning Assembly"</p>
                </>)
                 : isLastGuessWrong ? <p>{getFarewellText(languages[wrongGuessCount-1].name)}</p> : ''
                }
            </section>
                <p className="hint">{`Hint: ${currentWord.hint}`}</p>
            <section className="list-sec">
                {Languages}
            </section>
            <section className="word">
                {letterElements}
            </section>
            <section className="alphabet-display">
                {keyboardElements}
            </section>
            {(isGameOver || isGameWon) && <button onClick={newGame} className="new-game">New Game</button>}
        </main>
        
        
    )
}