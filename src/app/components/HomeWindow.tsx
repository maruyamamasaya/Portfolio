"use client";
import Link from 'next/link';
import { Post } from '@/lib/posts';
import { useState, useEffect } from 'react';
import BlogNavButtons from '../components/BlogNavButtons';
import HeroAnimation from './HeroAnimation';

interface Props {
  posts: Post[];
}

export default function HomeWindow({ posts }: Props) {
  const [closing, setClosing] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  // Set the default window size a bit larger so the content is easier to read
  // when the page first loads. Users can still resize the window freely.
  const [size, setSize] = useState({ width: 800, height: 600 });
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

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

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleResizeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setResizing(true);
    e.stopPropagation();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragging) {
        setPosition({ x: e.clientX - offset.x, y: e.clientY - offset.y });
      }
      if (resizing) {
        setSize({
          width: Math.max(200, e.clientX - position.x),
          height: Math.max(200, e.clientY - position.y),
        });
      }
    };

    const handleMouseUp = () => {
      setDragging(false);
      setResizing(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, resizing, offset, position]);

  if (showImage) return <HeroAnimation />;
  if (hidden) return null;

  return (
    <div
      className={`win98-window m-4 absolute z-10 ${closing ? 'fade-out' : ''} ${minimized ? 'minimized' : ''}`}
      style={{ top: position.y, left: position.x, width: size.width, height: size.height }}
    >
      <div className="win98-titlebar cursor-move" onMouseDown={handleMouseDown}>
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
          <BlogNavButtons />
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
      <div
        className="resize-handle absolute w-4 h-4 bottom-0 right-0 cursor-se-resize"
        onMouseDown={handleResizeMouseDown}
      />
    </div>
  );
}
