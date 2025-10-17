import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import GreetingMessage from "./components/GreetingMessage";
import { useUser } from "./context/UserContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { setSelectedAvatar } = useUser();
  const navigate = useNavigate();
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
    setSelectedAvatar(character);
    localStorage.setItem("selectedCharacter", JSON.stringify(character));
    navigate("/interface"); // Navigate to the interface page
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-white">
      <Sidebar onSelectCharacter={handleCharacterSelect} selectedCharacter={selectedCharacter} />
      <main className="flex-1 flex items-center justify-center p-4 relative">
        {selectedCharacter && <GreetingMessage character={selectedCharacter} />}
        {!selectedCharacter && <GreetingMessage character={selectedCharacter} />}
      </main>
    </div>
  );
};

export default LoginPage;
