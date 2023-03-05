import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import app from '../../firebase/config'
import React from 'react' 
import {useState} from 'react'
import {upLoadAllImage} from '../../firebase/firebase'
// const firebaseConfig = {
//     apiKey: "AIzaSyAqeJxzZ8sAPSqCT8HtPAMbKralQLLK3Tk",
//     authDomain: "bookstoreapi-jff.firebaseapp.com",
//     projectId: "bookstoreapi-jff",
//     storageBucket: "bookstoreapi-jff.appspot.com",
//     messagingSenderId: "335777351366",
//     appId: "1:335777351366:web:5ee8f63dbdafddfafc79c7",
//     measurementId: "G-Z2H1M7KG8V"
// };

// firebase.initializeApp(firebaseConfig);



const UploadImageList = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get the URL of the uploaded image from Firebase storage
      upLoadAllImage(imageUrls, setImageUrls);
      setLoading(false);
    }
  };
  console.log("img: ",imageUrls);
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <Upload
      name="image"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      multiple={true}
      action={file => {
        // Upload the file to Firebase storage
        const ref = app.storage().ref('images2').child(file.name);
        const uploadTask = ref.put(file);
        uploadTask.on('state_changed', snapshot => {}, error => {
          message.error('Failed to upload image');
        }, () => {
          message.success('Image uploaded successfully');
        });
      }}
      onChange={handleChange}
    >
      {imageUrls.map((url, index) => (
        <img key={index} src={url} alt="avatar" style={{ width: '100%' }} />
      ))}
      {uploadButton}
    </Upload>
  );
};

export default UploadImageList;