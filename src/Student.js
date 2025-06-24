import React, { useEffect, useRef } from 'react';
import Peer from 'peerjs';
import { useLocation } from 'react-router-dom';

const Student = () => {
  const videoRef = useRef(null);

  // Custom hook to parse query parameters from the URL
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const teacherId = query.get('teacherId');

  useEffect(() => {
    // Create a peer instance for the student
    const studentPeer = new Peer();

    studentPeer.on('open', (id) => {
      console.log('Student peer id:', id);
      // Get the student's media stream
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          // Call the teacher's peer (using the teacherId from the URL)
          const call = studentPeer.call(teacherId, stream);
          call.on('stream', (remoteStream) => {
            // Display the teacher's stream in the video element
            if (videoRef.current) {
              videoRef.current.srcObject = remoteStream;
            }
          });
        })
        .catch((error) => {
          console.error('Error accessing media devices:', error);
        });
    });

    // Clean up the peer connection when the component unmounts
    return () => {
      studentPeer.destroy();
    };
  }, [teacherId]);

  return (
    <div>
      <h2>Student View</h2>
      {teacherId ? (
        <div>
          <p>Connecting to teacher (ID: {teacherId})...</p>
          <video ref={videoRef} autoPlay style={{ width: '600px' }} />
        </div>
      ) : (
        <p>No teacher ID provided in the URL. Please use a valid session link.</p>
      )}
    </div>
  );
};

export default Student;
