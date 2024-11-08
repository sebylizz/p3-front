// src/app/components/NavBar.js
'use client';

import RightNavWrapper from './RightNavWrapper';

export default function NavBar() {
  return (
    <header className="flex justify-between items-center w-full py-2 px-4 lg:py-5 lg:px-6 bg-white border-b border-neutral-200">
      {/* Logo on the Left */}
      <a href="/" aria-label="SF Homepage" className="flex items-center">
        <picture>
          <source srcSet="/logo.png" />
          <img
            src="https://storage.googleapis.com/sfui_docs_artifacts_bucket_public/production/vsf_logo_sign.svg"
            alt="Sf Logo"
            className="h-8 md:h-10 lg:h-12 w-auto object-contain"
            onClick={() => handleButtonClick()}
          />
        </picture>
      </a>

      {/* Right-aligned Cart and Login */}
      <div className="flex items-center space-x-2">
        <RightNavWrapper />
      </div>
    </header>
  );
}
