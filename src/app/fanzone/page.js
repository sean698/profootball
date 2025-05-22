import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "NFL Fan Zone | Pro Football Report",
  description: "NFL fan content, forums, polls, fan reactions, and community.",
};

export default function FanzonePage() {
  return (
    <div>
      <Nav />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-6">Fan Zone</h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-lg mb-4 text-center">This is the Fan Zone page.</p>
          <p className="text-xl text-center py-10">
            Placeholder content for the Fan Zone section. Fan forums, polls, and
            community content will go here.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
