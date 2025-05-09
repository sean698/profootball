import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { headers } from "next/headers";
import Image from 'next/image';

/*  homepage (/page.js) is trying to access HTTP headers,
    which forces the route into dynamic rendering.
    But Next.js is trying to pre-render it statically during next build,
    which is incompatible. So must opt page into dynamic rendering explicitly
*/
export const dynamic = 'force-dynamic';

const decodeHtmlEntities = (str) => {
  if (!str) return "";
  if (typeof window === "undefined") return str;

  try {
    const doc = new DOMParser().parseFromString(str, "text/html");
    return doc.documentElement.textContent;
  } catch (error) {
    console.error("Error decoding HTML entities:", error);
    return str;
  }
};

async function fetchRSS() {
  try {
    console.log("Fetching RSS data...");

    const headersList = headers();
    const host = headersList.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";

    const apiUrl = `${protocol}://${host}/api/rss`;
    console.log("Fetching from URL:", apiUrl);

    const response = await fetch(apiUrl, {
      cache: "no-store",
      next: { revalidate: 600 },
    });

    console.log("RSS API response status:", response.status);

    if (!response.ok) {
      console.error("RSS API returned error:", response.status);
      return [];
    }

    const data = await response.json();
    console.log(`Successfully fetched ${data.sources?.length || 0} sources`);

    return data.sources || [];
  } catch (error) {
    console.error("Error fetching RSS data:", error);
    return [];
  }
}

function formatDate(dateString) {
  if (!dateString) return "Unknown";

  try {
    return new Date(dateString).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch (e) {
    console.error("Error formatting date:", e);
    return "Unknown";
  }
}

export default async function Home() {
  const sources = await fetchRSS();

  if (!sources || sources.length === 0) {
    return (
      <div>
        <Nav />
        <div className="flex justify-center items-center h-96">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Unable to load news</h2>
            <p>Please try again later or check your internet connection.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  sources.forEach((sourceObj) => {
    if (sourceObj.source.link === "https://www.nbcsports.com/profootballtalk") {
      sourceObj.source.link = "https://www.nbcsports.com/nfl/profootballtalk";
    }
  });

  const regularSources = sources.filter((source) => !source.source.isPodcast);
  const podcastSources = sources.filter((source) => source.source.isPodcast);

  return (
    <div>
      <Nav />
      {regularSources.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-bold mb-2">Loading News Sources</h2>
            <p>Please wait while we gather the latest NFL news.</p>
          </div>
        </div>
      ) : (
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
                  <Image
                    src={source.image}
                    alt={decodeHtmlEntities(source.title || "Unknown Source")}
                    className="w-10 h-10 mr-3 rounded-full object-cover"
                  />
                )}
                <div>
                  <a
                    href={source.link || "#"}
                    className="text-blue-500 hover:text-blue-700"
                    target="_blank"
                    rel="noopener noreferrer"
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
                            <Image
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
                        <Image
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
                          .flatMap(
                            ({ articles }) => articles?.slice(0, 4) || []
                          )
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
                                  <Image
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
                target="_blank"
                rel="noopener noreferrer"
              >
                MORE ...
              </a>
            </div>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
}
