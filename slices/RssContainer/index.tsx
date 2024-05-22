// Use the `use client` directive to mark this as a Client Component
"use client";

import React, { useEffect, useState } from 'react';
import { SliceComponentProps } from "@prismicio/react";
import axios from 'axios';

const RssContainer = ({ slice }: SliceComponentProps<any>): JSX.Element => {
  const [episodes, setEpisodes] = useState([]);
  const feedUrl = "https://pa.tedcdn.com/feeds/talks.rss?type=audio"; // URL for the RSS feed

  useEffect(() => {
    const fetchRssFeed = async () => {
      try {
        // Here, you call your local API route which in turn fetches the RSS feed
        const response = await axios.get('/api/rss', { params: { url: feedUrl } });
        setEpisodes(response.data.items);
      } catch (error) {
        console.error('Error fetching RSS feed:', error);
      }
    };

    fetchRssFeed();
  }, []);

  return (
    <section>
      <h1>TED Talks Audio</h1>
      {episodes.map((episode, index) => (
        <div key={index}>
          <h2>{episode.title}</h2>
          <audio controls src={episode.enclosure.url}>
            Your browser does not support the audio element.
          </audio>
        </div>
      ))}
    </section>
  );
};

export default RssContainer;
