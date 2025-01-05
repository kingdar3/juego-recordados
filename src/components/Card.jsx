export const Card = ({ card, handleCardClick }) => {
    return (
        <div
            className={`drop-shadow-md flex items-center ${
                card.flipped ? '[transform:rotateY(10deg)]' : 'bg-white'
             } justify-center cursor-pointer h-32 w-32 hover:scale-105 rounded-xl transition-all duration-1000 `}
            onClick={() => handleCardClick(card.id)}
            onDragStart={(e) => e.preventDefault()} 
            style={{ userSelect: "none" }} 
        >
            <div>
                <img
                    src={card.img}
                    alt={card.alt}
                     draggable="false"// Deshabilita el arrastre de la imagen
                    className={`h-32 scale-110 rounded-xl  ${!card.flipped ? '[transform:rotateY(180deg)] [backface-visibility:hidden] transition-all duration-1000' : ''}`}
                />
            </div>

        </div>
    );
};
