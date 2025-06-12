
import React from 'react';
import { APP_NAME } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-slate-400 p-6 mt-12 text-center">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved (not really, this is a demo!).</p>
        <p className="text-sm mt-1">Powered by React, Tailwind CSS, and Gemini API.</p>
      </div>
    </footer>
  );
};

export default Footer;
