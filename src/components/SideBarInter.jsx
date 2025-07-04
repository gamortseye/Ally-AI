import { ChevronLeft, Plus, FileText, Search, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { useUser } from '../context/UserContext';

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const { selectedAvatar } = useUser();

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  // Collapsed sidebar view
  if (!expanded) {
    return (
      <div className="h-screen bg-gray-50 w-16 p-2 flex flex-col items-center border-r border-gray-200">
        <button 
          onClick={toggleSidebar}
          className="p-1 rounded-lg bg-blue-500 text-white mb-6 mt-4"
        >
          <ChevronLeft className="rotate-180 w-5 h-5" />
        </button>
        
        <div className="flex flex-col items-center space-y-6">
          <button className="p-2 rounded-lg bg-blue-500 text-white">
            <Plus className="w-5 h-5" />
          </button>
          
          <button className="bg-blue-500 p-1 rounded text-white">
            <FileText className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mt-auto mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
            {selectedAvatar?.image ? (
              <img
                src={selectedAvatar.image}
                alt={selectedAvatar.name}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/default-avatar.png';
                }}
              />
            ) : (
              <div className="h-full w-full bg-gray-400" />
            )}
          </div>
        </div>
      </div>
    );
  }

  // Expanded sidebar view
  return (
    <div className="h-screen bg-gray-50 w-80 p-4 border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-500">Ally</h1>
        <button 
          onClick={toggleSidebar}
          className="p-1 rounded-lg bg-blue-500 text-white ml-2"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      {/* New Chat Section */}
      <div className="mb-8">
        <button className="flex items-center gap-2 mb-4 w-full bg-white px-3 py-2 rounded-md shadow-sm hover:bg-blue-50">
          <div className="bg-blue-500 p-1 rounded text-white">
            <Plus className="w-4 h-4" />
          </div>
          <span className="text-gray-600">Newchat</span>
        </button>
      </div>

      {/* Trending News Section */}

       <div className="flex items-center gap-2 mb-4">
          <div className="bg-blue-500 p-1 rounded text-white">
            <FileText className="w-5 h-5" />
          </div>
          <span className="text-gray-600 font-medium">Trending news</span>
        </div>
        
      <div className="flex-1 overflow-y-auto">
      
        <div className="flex-1 bg-blue-50 rounded-lg  p-4 space-y-6 ">
          <div>
            <h3 className="text-lg font-medium text-gray-700 text-center">Breaking the Silence</h3>
            <h4 className="text-sm text-gray-600 mb-1 text-center">Survivor Stories of Resilience</h4>
            <p className="text-sm text-gray-500 text-center">
              Highlight personal stories of GBV survivors who have overcome challenges and rebuilt their lives.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 text-center">Understanding Your Rights</h3>
            <h4 className="text-sm text-gray-600 mb-1 text-center">Legal Protections Against GBV</h4>
            <p className="text-sm text-gray-500 text-center">
              Explain legal frameworks, such as Ghana's Domestic Violence Act, and how survivors can seek justice.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 text-center">Spotting the Signs</h3>
            <h4 className="text-sm text-gray-600 mb-1 text-center">How to Identify Abusive Patterns</h4>
            <p className="text-sm text-gray-500">
              <span className="flex">
                <span className="mr-2">•</span>
                <span>Educate users on recognizing emotional, physical, and financial abuse in relationships.</span>
              </span>
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 text-center">Safe Spaces</h3>
            <h4 className="text-sm text-gray-600 mb-1 text-center">A Guide to Shelters and Support Services</h4>
            <p className="text-sm text-gray-500">
              <span className="flex">
                <span className="mr-2">•</span>
                <span>A comprehensive list of safe places and organizations that offer help to GBV survivors.</span>
              </span>
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 text-center">Tech for Good</h3>
            <h4 className="text-sm text-gray-600 mb-1 text-center">How AI is Transforming GBV Support</h4>
            <p className="text-sm text-gray-500">
              <span className="flex">
                <span className="mr-2">•</span>
                <span>Showcase how AI-driven platforms like ours are making support more accessible and confidential.</span>
              </span>
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 text-center">Cultural Shifts</h3>
            <h4 className="text-sm text-gray-600 mb-1 text-center">Challenging Harmful Norms and Traditions</h4>
            <p className="text-sm text-gray-500">
              <span className="flex">
                <span className="mr-2">•</span>
                <span>Discuss how communities are working to end practices like child marriage and female genital mutilation.</span>
              </span>
            </p>
          </div>
        </div>
      </div>
  

      {/* Avatar at bottom */}
      <div className="mt-auto py-4 flex items-center space-x-3">
        <div className="h-10 w-10 rounded-full bg-gray-300 overflow-hidden">
          {selectedAvatar?.image ? (
            <img
              src={selectedAvatar.image}
              alt={selectedAvatar.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/default-avatar.png';
              }}
            />
          ) : (
            <div className="h-full w-full bg-gray-400" />
          )}
        </div>
        {selectedAvatar?.name && (
          <span className="text-gray-700 font-medium">{selectedAvatar.name}</span>
        )}
      </div>
    </div>
  );
}