import CharacterCard from "./CharacterCard";

const CharacterSelector = ({ 
  onSelectCharacter, 
  selectedCharacter 
}) => {
  const characters = [
    {
      id: "john",
      name: "John",
      image: "src/assets/john.png"
    },
    {
      id: "anna",
      name: "Anna",
      image: "src/assets/anna.png"
    }
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

export default CharacterSelector;
