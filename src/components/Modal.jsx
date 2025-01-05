export const Modal = ({
    gameOver,
    setGamerOver,
    moves,
    handleNewGame
}) => {
    return (
        <div className={`${gameOver ? "flex" : "hidden"} flex-col justify-center items-center gap-7 bg-black w-[250px] h-[380px] top-1/2 left-1/2
    -translate-x-1/2 -translate-y-1/2 z-40 rounded-lg absolute`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-12 h-12 bg-yellow-500 rounded-full p-2 animate-bounce">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
            </svg>
        </div>
    );
};
