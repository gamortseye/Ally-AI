
import { Smile } from "lucide-react";

const GreetingMessage = ({ character }) => {
  return (
    <div className="inline-flex items-center border border-[#417CDB] rounded-full px-8 py-3 text-[#3772dd]">
      <Smile className="mr-2" size={24} />
      <span className="text-xl font-semibold">HELLO</span>
    </div>
  );
};

export default GreetingMessage;
