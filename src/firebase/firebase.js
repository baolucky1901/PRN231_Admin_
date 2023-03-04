import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 } from 'uuid';
import { db, storage } from './config';

export const upLoadImage = async (e, setUrl) => {
    if (e.target.files) {
        const imageRef = ref(
            storage,
            `images/${v4()}${e.target.files[0].name}`
        );
        await uploadBytes(imageRef, e.target.files[0])
            .then(() => {
                getDownloadURL(imageRef)
                    .then((url) => {
                        setUrl(url);
                    })
                    .catch((error) => toast.error(error.message));
            })
            .catch((error) => toast.error(error.message));
    }
};

export const upLoadAllImage = async (images, setListUrls) => {
    const files = Object.values(images);
    for (let file of files) { 
        const imageRef = ref(storage, `images2/${v4()}${file.name}`);
        await uploadBytes(imageRef, file)
            .then((snap) =>
                getDownloadURL(snap.ref)
                    .then((url) => {
                        setListUrls((prev) => [...prev, url]);
                    })
                    .catch((error) => toast.error(error.message))
            )
            .catch((e) => toast.error(e.message));
    }
};

