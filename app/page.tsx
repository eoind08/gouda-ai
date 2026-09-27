'use client'

import ChatInterface from './components/ChatInterface'

export default function HomePage() {
  return (
    <div className="home-page">
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2629682720782125"
        crossOrigin="anonymous"
      />
      <meta
        name="google-adsense-account"
        content="ca-pub-2629682720782125"
      />

      <div className="home-content">
        <ChatInterface />
      </div>
    </div>
  )
}