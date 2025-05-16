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
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-6">Fantajohijosy Football</h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-lg mb-4 text-center">
            This is the Fantasy Football page.
          </p>
          <p className="text-xl text-center py-10">
            Placeholder content for the Fantasy Football section. Fantasy
            football information, rankings, and tools will go here.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
