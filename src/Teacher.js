import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';

const Teacher = () => {
  const videoRef = useRef(null);
  const [peerId, setPeerId] = useState('');

  useEffect(() => {
    let teacherPeer = null;
    // Capture the teacher's media stream (video & audio)
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        // Initialize the teacher's Peer instance
        teacherPeer = new Peer();
        teacherPeer.on('open', (id) => {
          console.log('Teacher peer id:', id);
          setPeerId(id);
        });
        // Answer incoming calls from students using the teacher's media stream
        teacherPeer.on('call', (call) => {
          call.answer(stream);
          call.on('stream', (studentStream) => {
            console.log('Received student stream.');
            // Optionally, you can display the student's stream if needed.
          });
        });
      })
      .catch((error) => {
        console.error('Error accessing media devices:', error);
      });

    // Clean up the teacher's peer connection on component unmount
    return () => {
      if (teacherPeer) {
        teacherPeer.destroy();
      }
    };
  }, []);

  return (
    <div>
      <h2>Teacher Panel</h2>
      <video ref={videoRef} autoPlay style={{ width: '600px' }} />
      <div style={{ marginTop: '20px' }}>
        <h3>Share this link with your students:</h3>
        {peerId ? (
          <p>{window.location.origin}/student?teacherId={peerId}</p>
        ) : (
          <p>Loading your session link...</p>
        )}
      </div>
    </div>
  );
};

export default Teacher;
