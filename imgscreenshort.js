import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { storage } from './firebase';

const ImgScreenshort = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (!files) {
      return;
    }

    const fetchImages = async () => {
      try {
        let result = await storage().ref().listAll();
        if (result.items.length === 0) {
          return [];
        }

        let urlPromises = result.items.map(async (imageRef) => {
          const url = await imageRef.getDownloadURL();
          const metadata = await imageRef.getMetadata();
          return { url, timeCreated: metadata.timeCreated };
        });

        return Promise.all(urlPromises);
      } catch (error) {
        console.error('Error fetching images:', error);
        return [];
      }
    };

    const loadImages = async () => {
      const urls = await fetchImages();
      setFiles(urls);
    };

    loadImages();
  }, [files]);
  console.log(files)

  return (
    <View>
      {files.map((file, index) => (
        <Image
          key={index}
          source={{ uri: file.url }}
          style={{ width: 200, height: 200 }}
        />
      ))}
    </View>
  );
};

export default ImgScreenshort;
