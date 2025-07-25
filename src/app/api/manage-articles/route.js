import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CUSTOM_ARTICLES_FILE_PATH = path.join(process.cwd(), 'data', 'custom-articles.json');

// Helper function to ensure data directory exists
function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Helper function to read custom articles
function readCustomArticles() {
  try {
    ensureDataDirectory();
    
    if (!fs.existsSync(CUSTOM_ARTICLES_FILE_PATH)) {
      // Create the file if it doesn't exist
      const initialData = { articles: {} };
      fs.writeFileSync(CUSTOM_ARTICLES_FILE_PATH, JSON.stringify(initialData, null, 2));
      console.log('Created new custom-articles.json file');
      return initialData;
    }
    const articlesData = fs.readFileSync(CUSTOM_ARTICLES_FILE_PATH, 'utf8');
    return JSON.parse(articlesData);
  } catch (error) {
    console.error('Error reading custom-articles.json:', error);
    return { articles: {} };
  }
}

// Helper function to write custom articles
function writeCustomArticles(articlesData) {
  try {
    ensureDataDirectory();
    fs.writeFileSync(CUSTOM_ARTICLES_FILE_PATH, JSON.stringify(articlesData, null, 2));
    console.log('Successfully wrote custom articles to file');
    return true;
  } catch (error) {
    console.error('Error writing custom-articles.json:', error);
    return false;
  }
}

// POST - Add custom article to a specific source
export async function POST(request) {
  try {
    console.log('Received POST request to add custom article');
    const { sourceUrl, title, link } = await request.json();
    console.log('Request data:', { sourceUrl, title, link });

    if (!sourceUrl || !title || !link) {
      console.error('Missing required fields:', { sourceUrl: !!sourceUrl, title: !!title, link: !!link });
      return NextResponse.json({ error: 'Source URL, title, and link are required' }, { status: 400 });
    }

    console.log('Reading custom articles data...');
    const customArticlesData = readCustomArticles();
    console.log('Current custom articles data:', Object.keys(customArticlesData.articles || {}));
    
    // Initialize articles object if it doesn't exist
    if (!customArticlesData.articles) {
      customArticlesData.articles = {};
    }
    
    // Initialize array for this source if it doesn't exist
    if (!customArticlesData.articles[sourceUrl]) {
      customArticlesData.articles[sourceUrl] = [];
      console.log('Initialized new array for source:', sourceUrl);
    }

    // Create new article object
    const newArticle = {
      title: title.trim(),
      link: link.trim(),
      pubDate: new Date().toISOString(),
      isCustom: true // Flag to identify custom articles
    };
    console.log('Created new article:', newArticle);

    // Add to the beginning of the array (most recent first)
    customArticlesData.articles[sourceUrl].unshift(newArticle);
    console.log('Added article to array. New length:', customArticlesData.articles[sourceUrl].length);

    // Limit to 10 custom articles per source
    if (customArticlesData.articles[sourceUrl].length > 10) {
      customArticlesData.articles[sourceUrl] = customArticlesData.articles[sourceUrl].slice(0, 10);
      console.log('Trimmed array to 10 items');
    }

    // Write back to file
    console.log('Writing custom articles to file...');
    if (!writeCustomArticles(customArticlesData)) {
      console.error('Failed to write custom articles to file');
      return NextResponse.json({ error: 'Failed to save custom article' }, { status: 500 });
    }

    console.log('Successfully added custom article');
    return NextResponse.json({ 
      message: 'Custom article added successfully', 
      article: newArticle 
    });
  } catch (error) {
    console.error('Error adding custom article:', error);
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: error.message 
    }, { status: 500 });
  }
}

// GET - Get custom articles for all sources
export async function GET() {
  try {
    const customArticlesData = readCustomArticles();
    return NextResponse.json(customArticlesData);
  } catch (error) {
    console.error('Error fetching custom articles:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 