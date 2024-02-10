import { useState } from 'react';
import OpenAI from 'openai';

function App() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateImage = async (promptText) => {
    setIsLoading(true);
    try {      
      const apiKey = import.meta.env.VITE_REACT_APP_OPENAI_API_KEY;            
      const openai = new OpenAI({
        apiKey: apiKey
      });
      const response = await openai.images.generate({
        model: 'dall-e-3',
        prompt: promptText,
      });

      setImageUrl(response.data[0].url);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt) {
      generateImage(prompt);
    }
  };

  return (
    <>
      <h1>Dall-E Image Generator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt for Dall-E"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Generating...': 'Generate Image'}
        </button>
      </form>
      {imageUrl && <img src={imageUrl} alt="Generated from Dall-E" style={{ marginTop: '20px' }} />}
    </>
  );
}

export default App;