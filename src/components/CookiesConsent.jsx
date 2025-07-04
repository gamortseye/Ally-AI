function CookieConsent({ onConsent }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 flex flex-col md:flex-row justify-between items-center">
      <div className="mb-4 md:mb-0">
        <h2 className="text-xl text-gray-600">Accept All Cookies</h2>
      </div>
      <div className="flex space-x-4">
        <button 
          onClick={() => onConsent(true)}
          className="px-8 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 font-medium"
        >
          Yes
        </button>
        <button 
          onClick={() => onConsent(false)}
          className="px-8 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 font-medium"
        >
          No
        </button>
      </div>
    </div>
  );
}

export default CookieConsent;