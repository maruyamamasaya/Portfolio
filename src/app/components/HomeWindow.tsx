"use client";
import Link from 'next/link';
import { Post } from '@/lib/posts';
import { useState } from 'react';

interface Props {
  posts: Post[];
}

export default function HomeWindow({ posts }: Props) {
  const [closing, setClosing] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setHidden(true);
      setShowImage(true);
    }, 500);
  };

  const handleMinimize = () => {
    setMinimized(true);
    setTimeout(() => {
      setHidden(true);
      setShowImage(true);
    }, 500);
  };

  if (showImage) return <img src="/images/fairy.gif" alt="closed" className="closed-image" />;
  if (hidden) return null;

  return (
    <div className={`win98-window m-4 ${closing ? 'fade-out' : ''} ${minimized ? 'minimized' : ''}`}> 
      <div className="win98-titlebar">
        <span>トップページ</span>
        <div className="window-controls">
          <button
            className="win98-btn minimize"
            aria-label="Minimize"
            onClick={handleMinimize}
          />
          <button
            className="win98-btn close"
            aria-label="Close"
            onClick={handleClose}
          />
        </div>
      </div>
      {!minimized && (
        <div className="win98-content">
          <div className="win98-file mb-4" />
          <h2 className="text-xl font-semibold mb-4">Blog</h2>
          <ul className="space-y-4">
            {posts.map(post => (
              <li key={post.slug} className="border-b pb-4 flex items-start space-x-2">
                {post.image && (
                  <img src={post.image} alt="thumb" className="w-16 h-16 object-cover" />
                )}
                <div>
                  <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
                    {post.title}
                  </Link>
                  <span className="block text-sm text-gray-500">{post.date}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
