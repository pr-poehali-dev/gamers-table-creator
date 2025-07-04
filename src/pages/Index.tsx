import PlayersTable from "@/components/PlayersTable";
import { playersData } from "@/data/playersData";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-green-50 to-lime-100 p-4">
      <div className="container mx-auto">
        <PlayersTable players={playersData} />
      </div>
    </div>
  );
};

export default Index;
