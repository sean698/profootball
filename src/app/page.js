import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const decodeHtmlEntities = (str) => {
  if (!str) return "";
  if (typeof window === "undefined") return str;
  const doc = new DOMParser().parseFromString(str, "text/html");
  return doc.documentElement.textContent;
};

async function fetchRSS() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/rss`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Failed to fetch RSS data");
  }

  const data = await response.json();
  return data.sources || [];
}

function formatDate(dateString) {
  if (!dateString) return "Unknown";
  return new Date(dateString).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function Home() {
  const sources = await fetchRSS();

  const regularSources = sources.filter((source) => !source.source.isPodcast);
  const podcastSources = sources.filter((source) => source.source.isPodcast);

  return (
    <div>
      <Nav />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-5">
        {regularSources.map(({ source, articles }) => (
          <div
            key={source.link || source.title}
            className={`bg-white shadow-lg rounded-lg p-4 ${
              source.title && source.link.includes("youtube")
                ? "col-span-1 md:col-span-2 lg:col-span-3"
                : ""
            }`}
          >
            <div className="flex items-center mb-4">
              {source.image && (
                <img
                  src={source.image}
                  alt={decodeHtmlEntities(source.title || "Unknown Source")}
                  className="w-10 h-10 mr-3 rounded-full object-cover"
                />
              )}
              <div>
                <a
                  href={source.link || "#"}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <h2 className="text-lg font-bold uppercase text-black cursor-pointer">
                    {decodeHtmlEntities(source.title || "Unknown Source")}
                  </h2>
                </a>
                <p className="text-gray-500 text-xs">
                  Last Updated: {formatDate(source.updatedAt)}
                </p>
              </div>
            </div>

            {source.title && source.link.includes("youtube") ? (
              <>
                <div className="overflow-x-auto whitespace-nowrap flex gap-4 mb-6">
                  {articles.slice(0, 8).map((video, index) => (
                    <a
                      key={index}
                      href={video.link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block min-w-[250px] max-w-[280px]"
                    >
                      <div className="w-full rounded-lg overflow-hidden group aspect-video">
                        {video.thumbnail ? (
                          <img
                            src={video.thumbnail}
                            alt={decodeHtmlEntities(
                              video.title || "Untitled Video"
                            )}
                            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:-translate-y-1 group-hover:brightness-80 group-hover:shadow-lg"
                          />
                        ) : (
                          <div className="bg-gray-200 h-40 w-full flex items-center justify-center">
                            <p className="text-center px-3 text-sm font-semibold truncate">
                              {decodeHtmlEntities(
                                video.title || "Untitled Video"
                              )}
                            </p>
                          </div>
                        )}
                      </div>
                      <p className="text-center mt-2 text-sm font-semibold w-full truncate">
                        {decodeHtmlEntities(video.title || "Untitled Video")}
                      </p>
                    </a>
                  ))}
                </div>

                {podcastSources.length > 0 && source.title === "NFL" && (
                  <>
                    <div className="flex items-center mb-2">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/7/75/YouTube_social_white_squircle_(2017).svg"
                        alt="YouTube Logo"
                        className="w-12 h-12 mr-2"
                      />
                      <div>
                        <h2 className="text-lg font-bold text-black">
                          NFL Podcasts
                        </h2>
                        <p className="text-gray-500 text-xs">
                          Last Updated:{" "}
                          {formatDate(podcastSources[0]?.source?.updatedAt)}
                        </p>
                      </div>
                    </div>
                    <div className="overflow-x-auto whitespace-nowrap flex gap-4">
                      {podcastSources
                        .flatMap(({ articles }) => articles.slice(0, 4))
                        .map((video, index) => (
                          <a
                            key={index}
                            href={video.link || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block min-w-[250px] max-w-[280px]"
                          >
                            <div className="w-full rounded-lg overflow-hidden group aspect-video">
                              {video.thumbnail ? (
                                <img
                                  src={video.thumbnail}
                                  alt={decodeHtmlEntities(
                                    video.title || "Untitled Video"
                                  )}
                                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:-translate-y-1 group-hover:brightness-80 group-hover:shadow-lg"
                                />
                              ) : (
                                <div className="bg-gray-200 h-40 w-full flex items-center justify-center">
                                  <p className="text-center px-3 text-sm font-semibold truncate">
                                    {decodeHtmlEntities(
                                      video.title || "Untitled Video"
                                    )}
                                  </p>
                                </div>
                              )}
                            </div>
                            <p className="text-center mt-2 text-sm font-semibold w-full truncate">
                              {decodeHtmlEntities(
                                video.title || "Untitled Video"
                              )}
                            </p>
                          </a>
                        ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <ul className="space-y-2">
                {articles.slice(0, 6).map((article, index) => (
                  <li
                    key={index}
                    className="border-b pb-2 flex items-start gap-2"
                  >
                    <div>
                      <a
                        href={article.link || "#"}
                        className="text-black hover:underline hover:text-blue-500 font-medium"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <h3>
                          {decodeHtmlEntities(
                            article.title || "Untitled Article"
                          )}
                        </h3>
                      </a>
                      <a
                        href={`/comments/${article.title}`}
                        className="hover:text-blue-500"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-message-circle"
                        >
                          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                        </svg>
                      </a>
                      <p className="text-gray-500 text-xs">
                        {formatDate(article.pubDate)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <a
              href={source.link || "#"}
              className="text-sm text-blue-500 mt-2 block font-semibold"
            >
              MORE ...
            </a>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
