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
        <h1 className="text-4xl font-bold mb-6">Highest Rated Sportsbooks </h1>

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
          <table className="table-fixed w-full border-collapse">
            <tbody>
              {[
                { src: "/images/ESPN.svg", alt: "ESPN Logo", href: "https://www.espn.com/fantasy/football/", name: "ESPN Fantasy Football" },
                { src: "/images/yahoo.svg", alt: "Yahoo Logo", href: "https://football.fantasysports.yahoo.com/", name: "Yahoo Fantasy Football" },
                { src: "/images/sleeper.svg", alt: "Sleeper Logo", href: "https://sleeper.com/", name: "Sleeper App" },
                { src: "/images/NflFantasy.svg", alt: "NFL Fantasy Logo", href: "https://fantasy.nfl.com/", name: "NFL Fantasy" },
                { src: "/images/mfl-logo.svg", alt: "My Fantasy League Logo", href: "https://home.myfantasyleague.com/10", name: "My Fantasy League (MFL)" },
                { src: "/images/fantasy pros.svg", alt: "FantasyPros Logo", href: "https://www.fantasypros.com/nfl/", name: "FantasyPros" },
                { src: "/images/CBS Fantasy.svg", alt: "CBS Fantasy Logo", href: "https://www.cbssports.com/fantasy/football/", name: "CBS Sports Fantasy" },
                { src: "/images/fantasycalc.svg", alt: "Fantasy Calculator Logo", href: "https://fantasyfootballcalculator.com/", name: "Fantasy Football Calculator" },
                { src: "/images/draftsharks.svg", alt: "Draft Sharks Logo", href: "https://www.draftsharks.com/", name: "Draft Sharks" },
                { src: "/images/fftoday.svg", alt: "FFToday Logo", href: "https://www.fftoday.com/", name: "FFToday" },
                { src: "/images/fanduelfantasy.svg", alt: "FanDuel Fantasy Logo", href: "https://www.numberfire.com/nfl/fantasy/", name: "FanDuel Fantasy" },
                { src: "/images/razzball 2.svg", alt: "Razzball Logo", href: "https://football.razzball.com/", name: "Razzball" },
                { src: "/images/Sports-Illustrated-Logo.svg", alt: "Sports Illustrated Logo", href: "https://www.si.com/fantasy/", name: "Sports Illustrated" },
                { src: "/images/wf.svg", alt: "Walter Football Logo", href: "https://walterfootball.com/fantasy.php", name: "Walter Football" },
                { src: "/images/fantasysharks.svg", alt: "Fantasy Sharks Logo", href: "https://www.fantasysharks.com/", name: "Fantasy Sharks" },
              ].map(({ src, alt, href, name }, index) => (
                <tr key={index}>
                  <td className="border w-1/5 px-2 py-3 text-center align-middle">
                    <div className="w-24 h-24 flex items-center justify-center mx-auto">
                      <Image
                        src={src}
                        alt={alt}
                        width={100}
                        height={100}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </td>
                  <td className="border w-4/5 px-4 py-3 text-center align-middle">
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-xl font-semibold"
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

