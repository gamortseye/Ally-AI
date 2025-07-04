import { FC } from "react";

const CharacterCard = ({ 
  name, 
  image, 
  isSelected, 
  onClick 
}) => {
  return (
    <div 
      className={`
        relative flex flex-col items-center cursor-pointer rounded-lg p-4
        transition-all duration-200
        ${isSelected ? 'bg-[#417CDB] text-white' : 'bg-[#417CDB] text-white hover:bg-white hover:text-[#417CDB]'}
      `}
      onClick={onClick}
    >
      <span className="absolute top-2 left-2 font-medium text-sm">
        {name}
      </span>
      <div className="flex justify-center items-center p-2 mt-4">
        <img 
          src={image} 
          alt={name} 
          className="w-24 h-24 object-contain" 
        />
      </div>
    </div>
  );
};

export default CharacterCard;