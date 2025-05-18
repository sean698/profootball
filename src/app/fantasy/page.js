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
  alt="ESPN Logo"
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
  alt="ESPN Logo"
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
  alt="ESPN Logo"
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
              <tr><td className="border w-1/4 py-15 text-center">Logo 5</td>
              <td className="border w-3/4 py-15 text-center">
              <a
      href="https://home.myfantasyleague.com/10"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      My Fantasy League (MFL)
    </a></td></tr>
              <tr><td className="border w-1/4 py-15 text-center">Logo 6</td>
              <td className="border w-3/4 py-15 text-center">
              <a
      href="https://www.fantasypros.com/nfl/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      FantasyPros
    </a></td></tr>
              <tr><td className="border w-1/4 py-15 text-center">Logo 7</td>
              <td className="border w-3/4 py-15 text-center">
              <a
      href="https://www.cbssports.com/fantasy/football/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      CBC Sports Fantasy
    </a></td></tr>
              <tr><td className="border w-1/4 py-15 text-center">Logo 8</td>
              <td className="border w-3/4 py-15 text-center">
              <a
      href="https://fantasyfootballcalculator.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      Fantasy Football Calculator
    </a></td></tr>
              <tr><td className="border w-1/4 py-15 text-center">Logo 9</td>
              <td className="border w-3/4 py-15 text-center">
              <a
      href="https://www.draftsharks.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      Draft Sharks
    </a></td></tr>
              <tr><td className="border w-1/4 py-15 text-center">Logo 10</td>
              <td className="border w-3/4 py-15 text-center">
              <a
      href="https://www.fftoday.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      FFToday
    </a></td></tr>
              <tr><td className="border w-1/4 py-15 text-center">Logo 11</td>
              <td className="border w-3/4 py-15 text-center">
              <a
      href="https://www.numberfire.com/nfl/fantasy/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      FanDuel Fantasy
    </a></td></tr>
              <tr><td className="border w-1/4 py-15 text-center">Logo 12</td>
              <td className="border w-3/4 py-15 text-center">
              <a
      href="https://football.razzball.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      Razzball
    </a></td></tr>
              <tr><td className="border w-1/4 py-15 text-center">Logo 13</td>
              <td className="border w-3/4 py-15 text-center">
              <a
      href="https://www.si.com/fantasy/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      Sports Illustrated 
    </a></td></tr>
              <tr><td className="border w-1/4 py-15 text-center">Logo 14</td>
              <td className="border w-3/4 py-15 text-center">
              <a
      href="https://walterfootball.com/fantasy.php"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      Walter Football
    </a></td></tr>
              <tr><td className="border w-1/4 py-15 text-center">Logo 15</td>
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
