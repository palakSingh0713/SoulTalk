import CharacterCard from './CharacterCard';

const CharacterGrid = ({ characters, onSelectCharacter }) => {
  return (
    <div className="character-grid-container">
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          onClick={() => onSelectCharacter(character)}
        />
      ))}
    </div>
  );
};

export default CharacterGrid;