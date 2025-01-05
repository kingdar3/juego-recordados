export const Modal = ({ gameResult, setGameResult, moves, handleNewGame, timeWhenWon }) => {
    return (
        <div className={`${gameResult ? "flex" : "hidden"} flex-col justify-center items-center gap-7 bg-black w-[250px] h-[380px] top-1/2 left-1/2
    -translate-x-1/2 -translate-y-1/2 z-40 rounded-lg absolute`}>
            {/* icono para cerrar modal */}
            {gameResult === "victory" && (
                <>
                    <h1 className="text-white uppercase text-3xl font-bold tracking-wider">¡GANASTE!</h1>
                    <div className="flex justify-between gap-10">
                        <p className="text-white">Movimientos</p>
                        <p className="text-white">{moves}</p>
                    </div>
                    <p className="text-white">Tiempo para ganar: {timeWhenWon}s</p> {/* Mostrar el tiempo transcurrido */}
                    <button className="bg-yellow-500 font-semibold text-black rounded-md px-5 py-1 hover:opacity-90" onClick={handleNewGame}>JUGAR DE NUEVO</button>
                </>
            )}

            {gameResult === "timeOver" && (
                <>
                    <h1 className="text-white uppercase text-3xl font-bold tracking-wider">¡SE AGOTÓ EL TIEMPO!</h1>
                    <p className="text-white text-center">Perdiste</p>
                    <button className="bg-yellow-500 font-semibold text-black rounded-md px-5 py-1 hover:opacity-90" onClick={handleNewGame}>JUGAR DE NUEVO</button>
                </>
            )}
        </div>
    );
};
