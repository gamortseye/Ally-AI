import React from "react";
import PropTypes from "prop-types";
import CharacterSelector from "./CharacterSelector";

const Sidebar = ({ onSelectCharacter, selectedCharacter }) => {
  return (
    <div className="w-full md:w-[480px] bg-[#417CDB] text-white p-6 flex flex-col">
      <header className="mb-12 pt-4">
        <h1 className="text-2xl font-bold">ALLY</h1>
      </header>

      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Let Get Started</h2>
            <p className="text-sm leading-relaxed opacity-90 max-w-md mx-auto">
              This an AI powered Platform that will help you get influencers,
              provide legal advice to help stop Gender based violence
            </p>
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-8 text-center">Select Your Character</h3>
            <CharacterSelector
              onSelectCharacter={onSelectCharacter}
              selectedCharacter={selectedCharacter}
            />
          </div>
        </div>

        <footer className="mt-auto pt-8 text-center opacity-80 text-sm">
          <p>All Right Reserved</p>
        </footer>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  onSelectCharacter: PropTypes.func,
  selectedCharacter: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
};

Sidebar.defaultProps = {
  onSelectCharacter: () => {},
  selectedCharacter: null,
};

export default Sidebar;
