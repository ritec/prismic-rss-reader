// Use the `use client` directive to mark this as a Client Component
"use client";

import React, { useEffect, useState } from 'react';
import { SliceComponentProps } from "@prismicio/react";
import axios from 'axios';
import styles from './RssContainer.module.css';  // Make sure the path is correct

const RssContainer = ({ slice }: SliceComponentProps<any>): JSX.Element => {
  const [podcastInfo, setPodcastInfo] = useState(null);
  const [showAllEpisodes, setShowAllEpisodes] = useState(false);  // State to control the visibility of episodes
  const feedUrl = "https://pa.tedcdn.com/feeds/talks.rss?type=audio";  // URL for the RSS feed

  useEffect(() => {
    const fetchRssFeed = async () => {
      try {
        const response = await axios.get('/api/rss', { params: { url: feedUrl } });
        setPodcastInfo(response.data);
      } catch (error) {
        console.error('Error fetching RSS feed:', error);
      }
    };

    fetchRssFeed();
  }, []);

  if (!podcastInfo) return <div>Loading...</div>;

  const toggleEpisodes = () => {
    setShowAllEpisodes(!showAllEpisodes);
  };

  return (
    <section className={styles.podcastContainer}>
      <h1 className={styles.title}>{podcastInfo.title}</h1>
      <img src={podcastInfo.image.url} alt="Podcast cover" className={styles.coverImage} />
      <div dangerouslySetInnerHTML={{ __html: podcastInfo.description }} />
      <div className={styles.episode}>
        <h2>{podcastInfo.items[0].title}</h2>
        {podcastInfo.items[0]['itunes:image'] && podcastInfo.items[0]['itunes:image'].href && (
          <img src={podcastInfo.items[0]['itunes:image'].href} alt="Episode cover" className={styles.episodeImage} />
        )}
        <audio controls src={podcastInfo.items[0].enclosure.url} className={styles.audioPlayer}>
          Your browser does not support the audio element.
        </audio>
        <div dangerouslySetInnerHTML={{ __html: podcastInfo.items[0].description }} />
        <p className={styles.details}><strong>Published on:</strong> {new Date(podcastInfo.items[0].pubDate).toLocaleDateString()}</p>
        <p className={styles.details}><strong>Duration:</strong> {podcastInfo.items[0]['itunes:duration']}</p>
      </div>
      <button onClick={toggleEpisodes} className={styles.showMoreButton}>
        {showAllEpisodes ? "See Less" : "See More"}
      </button>
      {showAllEpisodes && podcastInfo.items.slice(1).map((episode, index) => (
        <div key={index} className={styles.episode}>
          <h2>{episode.title}</h2>
          {episode['itunes:image'] && episode['itunes:image'].href && (
            <img src={episode['itunes:image'].href} alt="Episode cover" className={styles.episodeImage} />
          )}
          <audio controls src={episode.enclosure.url} className={styles.audioPlayer}>
            Your browser does not support the audio element.
          </audio>
          <div dangerouslySetInnerHTML={{ __html: episode.description }} />
          <p className={styles.details}><strong>Published on:</strong> {new Date(episode.pubDate).toLocaleDateString()}</p>
          <p className={styles.details}><strong>Duration:</strong> {episode['itunes:duration']}</p>
        </div>
      ))}
    </section>
  );
};

export default RssContainer;
