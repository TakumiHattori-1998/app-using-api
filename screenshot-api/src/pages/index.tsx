// pages/index.tsx
import { useState } from 'react';

const Home: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [imageSrc, setImageSrc] = useState<string>('');
  const pngFile = 'screenshot.png';

  const fetchScreenshot = async () => {
    try {
      const response = await fetch(`/api/screenshot?url=${encodeURIComponent(url)}`);
      if (response.ok) {
        const blob = await response.blob();
        const imageObjectURL = URL.createObjectURL(blob);
        setImageSrc(imageObjectURL);
      } else {
        console.error('Failed to fetch screenshot');
      }
    } catch (error) {
      console.error('Error fetching screenshot:', error);
    }
  };

  return (
    <div>
      <h1>Complete HTML to Image</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
      />
      <button onClick={fetchScreenshot}>Get Screenshot</button>
      <div>
        <img src={`/${pngFile}`} alt="" style={{ width: '200px', height: 'auto' }}/>
      </div>
    </div>
  );
};

export default Home;