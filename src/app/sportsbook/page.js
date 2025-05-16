import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Sportsbooks | Pro Football Report",
  description:
    "NFL betting odds, sportsbook reviews, betting guides, and more.",
};

export default function SportsbookPage() {
  return (
    <div>
      <Nav />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-6">Sportsbooks</h1>

        {/* Disclaimer Banner */}
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-8">
          <p className="text-yellow-700">
            <span className="font-bold">DISCLAIMER:</span> This content is for
            informational and entertainment purposes only. No betting odds or
            information on this page constitutes a solicitation to place a bet
            or to use any sports betting services.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-lg mb-4 text-center">
            This is the Sportsbooks page.
          </p>
          <p className="text-xl text-center py-10">
            Placeholder content for the Sportsbooks section. Betting odds,
            sportsbook information, and betting guides will go here.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
