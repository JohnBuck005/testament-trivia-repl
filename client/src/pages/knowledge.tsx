import { Book, User, MapPin, Calendar } from "lucide-react";
import FloatingElements from "@/components/game/FloatingElements";

export default function Knowledge() {
  const biblicalFacts = [
    {
      title: "Garden of Eden",
      description: "The first home of humanity, where Adam and Eve lived in perfect harmony with God.",
      category: "Places"
    },
    {
      title: "Noah's Ark",
      description: "A massive vessel built to save animals and Noah's family from the great flood.",
      category: "Events"
    },
    {
      title: "Moses",
      description: "Led the Israelites out of Egypt and received the Ten Commandments on Mount Sinai.",
      category: "People"
    },
    {
      title: "David",
      description: "A shepherd boy who became king, known for defeating Goliath and writing many Psalms.",
      category: "People"
    },
    {
      title: "Jesus Christ",
      description: "The Son of God who came to earth to save humanity through His death and resurrection.",
      category: "People"
    }
  ];

  const biblicalPeople = [
    {
      name: "Abraham",
      title: "Father of Faith",
      description: "Called by God to leave his homeland and become the father of many nations."
    },
    {
      name: "Mary",
      title: "Mother of Jesus",
      description: "Chosen by God to be the mother of our Savior, showing great faith and obedience."
    },
    {
      name: "Paul",
      title: "Apostle to the Gentiles",
      description: "Former persecutor of Christians who became one of the greatest missionaries."
    },
    {
      name: "Esther",
      title: "Queen of Courage",
      description: "Risked her life to save the Jewish people from destruction in Persia."
    }
  ];

  return (
    <div className="min-h-screen cosmic-bg text-white overflow-x-hidden relative">
      <FloatingElements />
      
      <div className="relative z-10 min-h-screen flex flex-col px-4 pt-8 pb-20">
        {/* Header */}
        <div className="text-center mb-8">
          <Book className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Bible Knowledge</h1>
          <p className="text-white/70">
            Discover the wonders of biblical history and people
          </p>
        </div>

        {/* Biblical Facts Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <MapPin className="mr-2 text-blue-400" size={20} />
            Biblical Facts
          </h2>
          <div className="space-y-3">
            {biblicalFacts.map((fact, index) => (
              <div key={index} className="glass-card rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{fact.title}</h3>
                  <span className="text-xs text-yellow-400 bg-yellow-400/20 px-2 py-1 rounded-full">
                    {fact.category}
                  </span>
                </div>
                <p className="text-white/80 text-sm">{fact.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Biblical People Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <User className="mr-2 text-purple-400" size={20} />
            People of Faith
          </h2>
          <div className="space-y-3">
            {biblicalPeople.map((person, index) => (
              <div key={index} className="glass-card rounded-xl p-4">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mr-3">
                    <User className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{person.name}</h3>
                    <p className="text-yellow-300 text-xs">{person.title}</p>
                  </div>
                </div>
                <p className="text-white/80 text-sm ml-13">{person.description}</p>
              </div>
            ))}
          </div>
        </div>


      </div>
    </div>
  );
}