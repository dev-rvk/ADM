import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

function App() {
  const [videoFrame, setVideoFrame] = useState(null);

  useEffect(() => {
    const socket = io();

    socket.on('videoFrame', (data) => {
      setVideoFrame(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="App">
      {videoFrame && (
        <img src={`data:image/jpeg;base64,${videoFrame.toString('base64')}`} alt="Scrcpy Screen" />
      )}
    </div>
  );
}

export default App;
