import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Image from "next/image";

export const metadata = {
  title: "Fantasy Football | Pro Football Report",
  description:
    "Fantasy football news, player rankings, sleepers, busts, waiver wire advice, and more.",
};

export default function FantasyPage() {
  return (
    <div>
      <Nav />
      <div className="max-w-7xl mx-auto px-4 py-15">
        <h1 className="text-4xl font-bold mb-6">Top Fantasy Football Websites</h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <table className="table-fixed w-full border-collapse">
            <tbody>
              <tr><td className="border w-1/4 py-15 text-center">
              <Image
  src="/images/ESPN.svg"
  alt="ESPN Logo"
  width={100}
  height={100}
  className="mx-auto"
/>
    </td>
              <td className="border w-3/4 py-15 text-center">
              <a
      href="https://www.espn.com/fantasy/football/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      ESPN Fantasy Football
    </a></td></tr>
              <tr><td className="border w-1/4 py-15 text-center">
               <Image
  src="/images/yahoo.svg"
  alt="yahoo Logo"
  width={100}
  height={100}
  className="mx-auto"
/></td>
              <td className="border w-3/4 py-15 text-center">
              <a
      href="https://football.fantasysports.yahoo.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      Yahoo Fantasy Football
    </a></td></tr>
              <tr><td className="border w-1/4 py-15 text-center">
              <Image
  src="/images/sleeper.svg"
  alt="sleeper Logo"
  width={100}
  height={100}
  className="mx-auto"
/></td>
              <td className="border w-3/4 py-15 text-center">
              <a
      href="https://sleeper.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      Sleeper App
    </a></td></tr>
              <tr><td className="border w-1/4 py-15 text-center">
              <Image
  src="/images/NflFantasy.svg"
  alt="NFL Fantasy Logo"
  width={100}
  height={100}
  className="mx-auto"
/></td>
              <td className="border w-3/4 py-15 text-center">
              <a
      href="https://fantasy.nfl.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      NFL Fantasy
    </a></td></tr>
              <tr><td className="border w-1/4 py-15 text-center">
              <Image
  src="/images/mfl-logo.svg"
  alt="My fantasy League Fantasy Logo"
  width={100}
  height={100}
  className="mx-auto"
/></td>
              <td className="border w-3/4 py-15 text-center">
              <a
      href="https://home.myfantasyleague.com/10"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      My Fantasy League (MFL)
    </a></td></tr>
              <tr><td className="border w-1/4 py-15 text-center"><Image
  src="/images/fantasy pros.svg"
  alt="Fantasypros Logo"
  width={100}
  height={100}
  className="mx-auto"
/></td>
              <td className="border w-3/4 py-15 text-center">
              <a
      href="https://www.fantasypros.com/nfl/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      FantasyPros
    </a></td></tr>
              <tr><td className="border w-1/4 py-15 text-center"><Image
  src="/images/CBS Fantasy.svg"
  alt="CBS Fantasy Logo"
  width={100}
  height={100}
  className="mx-auto"
/></td>
              <td className="border w-3/4 py-15 text-center">
              <a
      href="https://www.cbssports.com/fantasy/football/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      CBS Sports Fantasy
    </a></td></tr>
              <tr><td className="border w-1/4 py-15 text-center"><Image
  src="/images/fantasycalc.svg"
  alt="Fantasy calculator Logo"
  width={100}
  height={100}
  className="mx-auto"
/></td>
              <td className="border w-3/4 py-15 text-center">
              <a
      href="https://fantasyfootballcalculator.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      Fantasy Football Calculator
    </a></td></tr>
              <tr><td className="border w-1/4 py-15 text-center"><Image
  src="/images/draftsharks.svg"
  alt="Draftsharks Logo"
  width={100}
  height={100}
  className="mx-auto"
/></td>
              <td className="border w-3/4 py-15 text-center">
              <a
      href="https://www.draftsharks.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      Draft Sharks
    </a></td></tr>
              <tr><td className="border w-1/4 py-15 text-center"><Image
  src="/images/fftoday.svg"
  alt="fftoday Logo"
  width={100}
  height={100}
  className="mx-auto"
/></td>
              <td className="border w-3/4 py-15 text-center">
              <a
      href="https://www.fftoday.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      FFToday
    </a></td></tr>
              <tr><td className="border w-1/4 py-15 text-center"><Image
  src="/images/fanduelfantasy.svg"
  alt="fanduel fantasy Logo"
  width={100}
  height={100}
  className="mx-auto"
/></td>
              <td className="border w-3/4 py-15 text-center">
              <a
      href="https://www.numberfire.com/nfl/fantasy/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      FanDuel Fantasy
    </a></td></tr>
              <tr><td className="border w-1/4 py-15 text-center"><Image
  src="/images/razzball 2.svg"
  alt="razzball Logo"
  width={100}
  height={100}
  className="mx-auto"
/></td>
              <td className="border w-3/4 py-15 text-center">
              <a
      href="https://football.razzball.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      Razzball
    </a></td></tr>
              <tr><td className="border w-1/4 py-15 text-center"><Image
  src="/images/Sports-Illustrated-Logo.svg"
  alt="Sports Illustrated Logo"
  width={100}
  height={100}
  className="mx-auto"
/></td>
              <td className="border w-3/4 py-15 text-center">
              <a
      href="https://www.si.com/fantasy/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      Sports Illustrated 
    </a></td></tr>
              <tr><td className="border w-1/4 py-15 text-center"><Image
  src="/images/wf.svg"
  alt="Walter football Logo"
  width={100}
  height={100}
  className="mx-auto"
/></td>
              <td className="border w-3/4 py-15 text-center">
              <a
      href="https://walterfootball.com/fantasy.php"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      Walter Football
    </a></td></tr>
              <tr><td className="border w-1/4 py-15 text-center"><Image
  src="/images/fantasysharks.svg"
  alt="Fantasy Sharks Logo"
  width={100}
  height={100}
  className="mx-auto"
/></td>
              <td className="border w-3/4 py-15 text-center">
              <a
      href="https://www.fantasysharks.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      Fantasy Sharks 
    </a></td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
}
