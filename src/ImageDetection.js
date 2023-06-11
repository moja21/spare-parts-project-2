import React, { useState } from 'react';
import axios from 'axios';

const ImageDetection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [detectionResult, setDetectionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append('image', file);

    const options = {
      method: 'POST',
      url: 'https://vehicle-damage-assessment.p.rapidapi.com/run',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '1827ee75a6msh688da8bb5d1d46fp17d3bejsn9020a7831e64',
        'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
      },
      data: {
        draw_result: false,
        remove_background: false,
        image: URL.createObjectURL(file)
      }
    };

    try {
      setIsLoading(true);
      const response = await axios.request(options);
      setDetectionResult(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Image Detection</h1>
      <input type="file" onChange={handleImageUpload} />
      {selectedImage && <img src={selectedImage} alt="Selected" />}
      {isLoading && <p>Loading...</p>}
      {detectionResult && (
        <div>
          <h2>Detection Result</h2>
          <p>{JSON.stringify(detectionResult)}</p>
        </div>
      )}
    </div>
  );
};

export default ImageDetection;