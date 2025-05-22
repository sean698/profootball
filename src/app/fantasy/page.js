import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Image from "next/image";

export const metadata = {
  title: "Fantasy Football | Pro Football Report",
  description:
    "Fantasy football news, player rankings, sleepers, busts, waiver wire advice, and more.",
};

export default function FantasyPage() {
  const fantasyWebsites = [
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
  ];

  return (
    <div>
      <Nav />
      <div className="max-w-7xl mx-auto px-4 py-15">
        <h1 className="text-4xl font-bold mb-6">Top Fantasy Football Websites</h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Card View for All Screen Sizes */}
          <div className="space-y-4">
            {fantasyWebsites.map(({ src, alt, href, name }, index) => (
              <div key={index} className="border rounded-lg p-4 flex items-center space-x-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center flex-shrink-0">
                  <Image
                    src={src}
                    alt={alt}
                    width={80}
                    height={80}
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="flex-1 text-center">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-lg md:text-xl font-semibold block"
                  >
                    {name}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
