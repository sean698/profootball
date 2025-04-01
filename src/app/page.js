import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

async function fetchRSS() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/rss`, {
    cache: "no-store", // Ensures fresh data
  });

  if (!response.ok) {
    throw new Error("Failed to fetch RSS data");
  }

  const data = await response.json();
  return data.articles || [];
}

// Function to group articles by source
function groupArticlesBySource(articles) {
  return articles.reduce((acc, article) => {
    const source = new URL(article.link).hostname;
    if (!acc[source])
      acc[source] = {
        feedTitle: article.feedTitle,
        feedImage: article.feedImage,
        feedLink: article.feedLink,
        articles: [],
      };
    acc[source].articles.push(article);
    return acc;
  }, {});
}

export default async function Home() {
  const articles = await fetchRSS(); // Fetch on server
  const groupedArticles = groupArticlesBySource(articles);

  return (
    <div>
      <Nav />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-5">
        {Object.entries(groupedArticles).map(([source, { feedTitle, feedImage, feedLink, articles }]) => (
          <div key={source} className="bg-white shadow-lg rounded-lg p-4">
            <div className="flex items-center mb-4">
              {feedImage && <img src={feedImage} alt={feedTitle} className="w-10 h-10 mr-3 rounded-full object-cover" />}
              <a href={feedLink} className="text-blue-500 hover:text-blue-700">
                <h2 className="text-lg font-bold uppercase text-black cursor-pointer">
                  {source.replace("www.", "")}
                </h2>
              </a>
            </div>
            <ul className="space-y-2">
              {articles.slice(0, 6).map((article, index) => (
                <li key={index} className="border-b pb-2 flex items-start gap-2">
                  <div>
                    <a
                      href={article.link}
                      className="text-black hover:underline hover:text-blue-500 font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <h3>{article.title}</h3>
                    </a>
                    <p className="text-gray-500 text-xs">{new Date(article.pubDate).toLocaleDateString()}</p>
                  </div>
                </li>
              ))}
            </ul>
            <a href={feedLink} className="text-sm text-blue-500 mt-2 block font-semibold">MORE ...</a>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
