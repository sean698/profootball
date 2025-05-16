import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "NFL Teams | Pro Football Report",
  description: "Browse NFL teams, view team information, schedules, and stats.",
};

export default function TeamsPage() {
  return (
    <div>
      <Nav />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-6">NFL Teams</h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-lg mb-4 text-center">This is the Teams page.</p>
          <p className="text-xl text-center py-10">
            Placeholder content for the Teams section. Team listings and
            information will go here.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
