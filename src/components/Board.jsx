import { useEffect, useState } from "react";
import { imgs } from "../data";
import { Card } from "./Card";
import { Modal } from "./Modal";

// Función para barajar las cartas
const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

export const Board = () => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]); // Para manejar las cartas volteadas
    const [moves, setMoves] = useState(0); // Movimientos
    const [gameResult, setGameResult] = useState(""); // "victory" o "timeOver"
    const [isDisabled, setIsDisabled] = useState(false); // Para saber si el juego está deshabilitado
    const [timeLeft, setTimeLeft] = useState(60); // Tiempo restante en segundos
    const [timeWhenWon, setTimeWhenWon] = useState(null); // Tiempo cuando se ganó el juego

    // Crear el tablero con las cartas duplicadas y barajadas
    const createBoard = () => {
        const duplicatecards = imgs.flatMap((img, i) => {
            const duplicate = {
                ...img,
                id: img.id + imgs.length
            };
            return [img, duplicate];
        });

        const newCards = shuffleArray(duplicatecards);
        const cards = newCards.map(card => {
            return {
                ...card,
                flipped: false,
                matched: false,
            };
        });
        setCards(cards);
    };

    useEffect(() => {
        createBoard();
    }, []);

    // Temporizador
    useEffect(() => {
        if (gameResult === "victory" || timeLeft === 0) {
            if (timeLeft === 0 && gameResult !== "victory") {
                setGameResult("timeOver"); // Actualiza el estado cuando el tiempo se acaba
            }
            setIsDisabled(true); // Deshabilitar el juego si ya se ganó o se acabó el tiempo
            return;
        }

        const timer = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft(prevTime => prevTime - 1);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, gameResult]);

    const handleCardClick = (id) => {
        if (isDisabled) return; // No hacer nada si el juego está deshabilitado

        const [currentCard] = cards.filter(card => card.id === id);
        if (!currentCard.flipped && !currentCard.matched) {
            currentCard.flipped = true;

            const newFlippedCards = [...flippedCards, currentCard];
            setFlippedCards(newFlippedCards);

            if (newFlippedCards.length === 2) {
                setIsDisabled(true);
                const [firstCard, secondCard] = newFlippedCards;
                if (firstCard.img === secondCard.img) {
                    firstCard.matched = true;
                    secondCard.matched = true;
                    setIsDisabled(false);
                } else {
                    setTimeout(() => {
                        firstCard.flipped = false;
                        secondCard.flipped = false;
                        setCards(cards);
                        setIsDisabled(false);
                    }, 1000); // Esperar 1 segundo antes de voltear las cartas
                }
                setFlippedCards([]);
                setMoves(moves + 1);
            }
            setCards(cards);
        }

        // Comprobar si todas las cartas están emparejadas (victoria)
        if (cards.every(card => card.matched) && gameResult !== "victory") {
            setGameResult("victory");

            // Calcular el tiempo transcurrido desde el inicio
            const timeTaken = 60 - timeLeft; // Tiempo tomado en segundos
            setTimeWhenWon(timeTaken); // Guardar el tiempo transcurrido
            setIsDisabled(true); // Deshabilitar el juego al ganar
        }
    };

    const handleNewGame = () => {
        setCards([]);
        createBoard();
        setMoves(0);
        setGameResult(""); // Resetear el resultado del juego
        setIsDisabled(false);
        setTimeLeft(60); // Reiniciar el tiempo
        setTimeWhenWon(null); // Resetear el tiempo cuando se gana
    };

    return (
        <>
            {/* Mostrar el modal de acuerdo al estado del juego */}
            <Modal 
                gameResult={gameResult} 
                moves={moves} 
                timeWhenWon={timeWhenWon} // Pasamos el tiempo al modal
                handleNewGame={handleNewGame} 
            />
            <div className="relative h-screen flex items-center overflow-hidden">
                <div className="mx-auto flex flex-col justify-center items-center">
                <img src="/img/logo.png" alt="Logo" className="max-w-full h-auto  mb-3" />
                    <h1 className="font-bold lg:text-4xl md:text-2xl mb-3">Juego de memoria</h1>
                    <p className="text-xl mb-6">Tiempo restante: {timeLeft}s</p>
                    <div className="grid grid-cols-4 gap-7 justify-center items-center px-3 lg:py-2 lg:my-3">
                        {
                            cards.map(card => (
                                <Card card={card} key={card.id} handleCardClick={handleCardClick}></Card>
                            ))
                        }
                    </div>
                    <button className="bg-black font-semibold text-white rounded-md px-5 my-5 py-1 hover:text-yellow-500 transition-all mb-3" onClick={handleNewGame}>JUGAR DE NUEVO</button>
                </div>
            </div>
        </>
    );
};
