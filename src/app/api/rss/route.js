import { NextResponse } from "next/server"; // Next.js API utilities for handling HTTP responses.
import Parser from "rss-parser"; // RSS parser for parsing RSS feeds.
import fs from "fs"; // File System module to read feeds.json.
import path from "path"; // Path module for file paths management.

export async function GET() {
  const parser = new Parser({
    customFields: {
      feed: ["lastBuildDate"], // Extract 'lastBuildDate' from feed metadata.
      item: ["media:content"], // Extract 'media:content' for images in the item.
    },
  });

  let allArticles = []; // Initialize an empty array to store articles.

  // Load the feeds.json file dynamically.
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

      // Extract metadata from feed.
      const feedTitle = parsedFeed.title || "Unknown Feed";
      const feedImage =
        image ||
        parsedFeed.image?.url ||
        parsedFeed.itunes?.image ||
        parsedFeed["media:content"]?.url ||
        null;
    // Ensure correct main feed link
const feedLink =
parsedFeed.link && parsedFeed.link.startsWith("http")
  ? parsedFeed.link
  : parsedFeed.items?.[0]?.link
    ? new URL(parsedFeed.items[0].link).origin
    : feedUrl;
      const feedUpdatedAt = parsedFeed.lastBuildDate || parsedFeed.items?.[0]?.pubDate || null;

      // Process each article, ensuring correct link usage.
      const articlesWithFeedInfo = parsedFeed.items.map(item => {
        const articleLink = item.link?.startsWith("http") ? item.link : feedLink; // Ensure valid URL.

        if (!articleLink) {
          console.warn(`Skipping article due to missing link: ${item.title}`);
          return null;
        }

        return {
          title: item.title || "Untitled",
          link: articleLink,
          pubDate: item.pubDate || feedUpdatedAt,
          contentSnippet: item.contentSnippet || "",
          feedTitle,
          feedImage,
          feedLink,
          updatedAt: feedUpdatedAt,
        };
      }).filter(Boolean); // Remove null values (articles with missing links).

      allArticles = [...allArticles, ...articlesWithFeedInfo];
    }

    return NextResponse.json({ articles: allArticles });
  } catch (error) {
    console.error("RSS Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch RSS feeds" }, { status: 500 });
  }
}
