import React from "react";
import PropTypes from "prop-types";
import CharacterCard from "./CharacterCard";

const CharacterSelector = ({ onSelectCharacter, selectedCharacter }) => {
  const characters = [
    { id: "john", name: "John", image: "/john.png" },
    { id: "anna", name: "Anna", image: "/anna.png" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          name={character.name}
          image={character.image}
          isSelected={selectedCharacter?.id === character.id}
          onClick={() => onSelectCharacter(character)}
        />
      ))}
    </div>
  );
};

CharacterSelector.propTypes = {
  onSelectCharacter: PropTypes.func,
  selectedCharacter: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
};

CharacterSelector.defaultProps = {
  onSelectCharacter: () => {},
  selectedCharacter: null,
};

export default CharacterSelector;
