// pages/api/rss.js
import RSSParser from 'rss-parser';

export default async function handler(req, res) {
  const parser = new RSSParser();
  const feedUrl = 'https://pa.tedcdn.com/feeds/talks.rss?type=audio';

  try {
    debugger
    console.log('test upper')
    const feed = await parser.parseURL(feedUrl);
    res.status(200).json(feed);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch RSS feed', error });
  }
}
