import { NextResponse } from "next/server";
import Parser from "rss-parser";
import fs from "fs";
import path from "path";

const decodeHtmlEntities = (str) => {
  if (!str) return "";
  return str.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
};

const sanitizeXml = (xmlText) => {
  if (!xmlText) return "";

  return (
    xmlText
      // Fix attributes without values (e.g., <tag attr> to <tag attr="">)
      .replace(/(<[^>]*\s+)([a-zA-Z0-9_\-]+)(\s*[^=]*?>)/g, '$1$2=""$3')
      // Fix unescaped ampersands not part of entities
      .replace(/&(?!(amp;|lt;|gt;|quot;|apos;|#\d+;))/g, "&amp;")
      // Fix HTML entities that aren't valid in XML
      .replace(/&ldquo;/g, '"')
      .replace(/&rdquo;/g, '"')
      .replace(/&lsquo;/g, "'")
      .replace(/&rsquo;/g, "'")
      .replace(/&mdash;/g, "-")
      .replace(/&ndash;/g, "-")
      .replace(/&nbsp;/g, " ")
  );
};

export async function GET() {
  const parser = new Parser({
    customFields: {
      feed: ["lastBuildDate"],
      item: [["media:group", "media:group"]],
    },
    timeout: 60000,
    defaultRSS: "2.0",
  });

  let sources = [];
  const filePath = path.join(process.cwd(), "data", "feeds.json");

  let feeds;
  try {
    feeds = JSON.parse(fs.readFileSync(filePath, "utf8")).feeds;
    console.log(`Loaded ${feeds.length} feeds from feeds.json`);
  } catch (error) {
    console.error("Error loading feeds.json:", error);
    return NextResponse.json({ sources: [] }, { status: 200 });
  }

  for (const { image, url: feedUrl, isPodcast = false } of feeds) {
    try {
      console.log(`Fetching feed: ${feedUrl}`);

      if (feedUrl.includes("reddit.com")) {
        console.log(`Skipping known problematic feed: ${feedUrl}`);
        continue;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

      try {
        var response = await fetch(feedUrl, {
          method: "GET",
          headers: {
            "User-Agent": "Mozilla/5.0 (compatible; NFLNewsReader/1.0)",
            Accept: "application/rss+xml, application/xml, text/xml, */*",
          },
          signal: controller.signal,
        });
      } catch (fetchError) {
        console.warn(`Failed to fetch feed ${feedUrl}:`, fetchError.message);
        clearTimeout(timeoutId);
        continue;
      } finally {
        clearTimeout(timeoutId);
      }

      if (!response.ok) {
        console.warn(
          `Skipping feed due to HTTP error: ${feedUrl} (${response.status})`
        );
        continue;
      }

      let xmlText = await response.text();

      let parsedFeed;
      try {
        parsedFeed = await parser.parseString(xmlText);
      } catch (parseError) {
        console.warn(`Error parsing feed ${feedUrl}: ${parseError.message}`);

        try {
          const sanitizedXml = sanitizeXml(xmlText);
          parsedFeed = await parser.parseString(sanitizedXml);
          console.log(`Successfully parsed ${feedUrl} after sanitization`);
        } catch (sanitizeError) {
          console.error(
            `Failed to parse ${feedUrl} even after sanitizing:`,
            sanitizeError.message
          );
          continue;
        }
      }

      console.log("🔍 Feed title:", parsedFeed.title);
      console.log("🔗 Feed link:", parsedFeed.link);

      const feedTitle = decodeHtmlEntities(parsedFeed.title || "Unknown Feed");
      const feedImage =
        image || parsedFeed.image?.url || parsedFeed.itunes?.image || null;
      const feedLink = parsedFeed.link?.startsWith("http")
        ? parsedFeed.link
        : parsedFeed.items?.[0]?.link
        ? new URL(parsedFeed.items[0].link).origin
        : feedUrl;
      const feedUpdatedAt =
        parsedFeed.lastBuildDate || parsedFeed.items?.[0]?.pubDate || null;

      const articles = (parsedFeed.items || [])
        .map((item) => {
          try {
            const articleLink = item.link?.startsWith("http")
              ? item.link
              : feedLink;
            if (!articleLink) return null;

            const thumbnail =
              item["media:group"]?.["media:thumbnail"]?.[0]?.["$"]?.url ||
              item["media:thumbnail"]?.url ||
              item.enclosure?.url ||
              item["media:content"]?.url ||
              null;

            return {
              title: decodeHtmlEntities(item.title || "Untitled"),
              link: articleLink,
              thumbnail,
              pubDate: item.pubDate || feedUpdatedAt,
              contentSnippet: decodeHtmlEntities(item.contentSnippet || ""),
            };
          } catch (itemError) {
            console.warn(
              `Error processing item in feed ${feedUrl}:`,
              itemError.message
            );
            return null;
          }
        })
        .filter(Boolean);

      if (articles.length > 0) {
        sources.push({
          source: {
            title: feedTitle,
            link: feedLink,
            image: feedImage,
            updatedAt: feedUpdatedAt,
            isPodcast,
          },
          articles,
        });
        console.log(`Added ${articles.length} articles from ${feedTitle}`);
      } else {
        console.log(`No articles found in feed: ${feedUrl}`);
      }
    } catch (feedError) {
      console.error(`Error processing feed ${feedUrl}:`, feedError);
      continue;
    }
  }

  console.log(`Successfully processed ${sources.length} feeds`);
  return NextResponse.json({ sources });
}
