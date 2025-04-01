import { NextResponse } from "next/server";
import Parser from "rss-parser";
import fs from "fs";
import path from "path";

// HTML Entity Decoder (for server-side)
const decodeHtmlEntities = (str) => {
  if (!str) return "";
  return str.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
};

export async function GET() {
  const parser = new Parser({
    customFields: {
      feed: ["lastBuildDate"],
      item: ["media:content"],
    },
  });

  let sources = []; 
  const filePath = path.join(process.cwd(), "data", "feeds.json");

  let feeds;
  try {
    feeds = JSON.parse(fs.readFileSync(filePath, "utf8")).feeds;
  } catch (error) {
    console.error("Error loading feeds.json:", error);
    return NextResponse.json({ error: "Failed to load feed URLs" }, { status: 500 });
  }

  try {
    for (const { image, url: feedUrl } of feeds) {
      const response = await fetch(feedUrl);

      if (!response.ok) {
        console.warn(`Skipping feed due to fetch failure: ${feedUrl}`);
        continue;
      }

      const xmlText = await response.text();
      const parsedFeed = await parser.parseString(xmlText);

      const feedTitle = decodeHtmlEntities(parsedFeed.title || "Unknown Feed");
      const feedImage =
        image || parsedFeed.image?.url || parsedFeed.itunes?.image || parsedFeed["media:content"]?.url || null;
      const feedLink = parsedFeed.link && parsedFeed.link.startsWith("http")
        ? parsedFeed.link
        : parsedFeed.items?.[0]?.link
        ? new URL(parsedFeed.items[0].link).origin
        : feedUrl;
      const feedUpdatedAt = parsedFeed.lastBuildDate || parsedFeed.items?.[0]?.pubDate || null;

      // Process articles
      const articles = parsedFeed.items.map(item => {
        const articleLink = item.link?.startsWith("http") ? item.link : feedLink;
        if (!articleLink) return null;

        return {
          title: decodeHtmlEntities(item.title || "Untitled"),
          link: articleLink,
          pubDate: item.pubDate || feedUpdatedAt,
          contentSnippet: decodeHtmlEntities(item.contentSnippet || ""),
        };
      }).filter(Boolean); 

      sources.push({
        source: {
          title: feedTitle,
          link: feedLink,
          image: feedImage,
          updatedAt: feedUpdatedAt,
        },
        articles,
      });
    }

    return NextResponse.json({ sources });
  } catch (error) {
    console.error("RSS Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch RSS feeds" }, { status: 500 });
  }
}
