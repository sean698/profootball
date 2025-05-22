import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Image from "next/image";

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
        <h1 className="text-4xl font-bold mb-6">Highest Rated Sportsbooks</h1>

        {/* Disclaimer Banner */}
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-8">
          <p className="text-yellow-700">
            <span className="font-bold">DISCLAIMER:</span> This content is for
            informational and entertainment purposes only. No betting odds or
            information on this page constitutes a solicitation to place a bet
            or to use any sports betting services.
          </p>
        </div>

        {/* Responsive Table Wrapper */}
        <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full border-collapse">
            <tbody>
              {[
                { src: "/images/Fanatics.svg", alt: "BetFanatics Logo", href: "https://betfanatics.com/...", name: "BetFanatics" },
                { src: "/images/fanduel.svg", alt: "Fanduel Logo", href: "https://www.fanduel.com/...", name: "FanDuel" },
                { src: "/images/bet365.svg", alt: "Bet365 Logo", href: "https://www.on.bet365.ca/", name: "Bet365" },
                // ... other sportsbooks ...
                { src: "/images/OLG Proline.svg", alt: "OLG Proline Logo", href: "https://www.olg.ca/en/account/registration.html...", name: "OLG PROLINE+" },
              ].map(({ src, alt, href, name }, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-3 text-center align-middle">
                    <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mx-auto">
                      <Image
                        src={src}
                        alt={alt}
                        width={100}
                        height={100}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center align-middle whitespace-nowrap">
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-lg md:text-xl font-semibold"
                    >
                      {name}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}


