import { useState, useEffect } from 'react';
import SidebarInter from './components/SideBarInter';
import MainContent from './components/MainContent';
import CookieConsent from './components/CookiesConsent';
import { initDB, getCookieConsent, setCookieConsent } from './utils/database.js';
import { useUser } from './context/UserContext';

function InterfaceAi() {
  const [showCookieConsent, setShowCookieConsent] = useState(true);
  const [dbInitialized, setDbInitialized] = useState(false);
  const { selectedAvatar, setSelectedAvatar } = useUser();

  useEffect(() => {
    const setupDatabase = async () => {
      try {
        await initDB();
        setDbInitialized(true);
        
        const consent = await getCookieConsent();
        if (consent) {
          setShowCookieConsent(false);
        }

        // Check if there's a stored character in localStorage
        const storedCharacter = localStorage.getItem('selectedCharacter');
        if (storedCharacter) {
          setSelectedAvatar(JSON.parse(storedCharacter));
        }
      } catch (error) {
        console.error('Failed to initialize database:', error);
      }
    };
    
    setupDatabase();
  }, []);

  const handleCookieConsent = async (consent) => {
    if (dbInitialized) {
      await setCookieConsent(consent);
      setShowCookieConsent(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarInter />
      <MainContent />
      {showCookieConsent && <CookieConsent onConsent={handleCookieConsent} />}
    </div>
  );
}

export default InterfaceAi;