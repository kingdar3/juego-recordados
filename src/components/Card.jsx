export const Card = ({ card, handleCardClick }) => {
    const placeholderImg = "/img/logo2.svg"; // Ruta de la imagen predeterminada

    return (
        <div
            className={`drop-shadow-md flex items-center justify-center cursor-pointer 
                h-20 w-20 2xl:h-24 2xl:w-24 hover:scale-105 rounded-xl transition-all duration-1000`}
            onClick={() => handleCardClick(card.id)}
            onDragStart={(e) => e.preventDefault()}
            style={{ userSelect: "none" }}
        >
            {card.flipped ? (
                <img
                    src={card.img} // Imagen específica de la carta cuando está volteada
                    alt={card.alt}
                    draggable="false"
                    className="h-20 w-20 2xl:h-24 2xl:w-24 scale-110 rounded-xl transition-all duration-1000"
                />
            ) : (
                <img
                    src={placeholderImg} // Imagen predeterminada cuando no está volteada
                    alt="Placeholder"
                    draggable="false"
                    className="h-20 w-20 2xl:h-24 2xl:w-24 scale-110 rounded-xl transition-all duration-1000"
                />
            )}
        </div>
    );
};
