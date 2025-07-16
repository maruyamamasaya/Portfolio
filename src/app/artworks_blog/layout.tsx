import { ReactNode } from 'react';
import BodyClass from '../components/BodyClass';
import './mac.css';

export default function ArtworksLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <BodyClass className="mac-theme" />
      {children}
    </>
  );
}
