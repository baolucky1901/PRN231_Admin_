import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 } from "uuid";
import { storage } from "./config";

export const uploadPDFAndGetURL = async (pdfFile) => {
  try {
    if (!pdfFile) {
      throw new Error("Invalid PDF file object");
    }

    // Create a reference to the PDF file in Firebase Storage
    const pdfRef = ref(storage, `pdfs/${pdfFile.name}`);

    // Upload the PDF file to Firebase Storage
    await uploadBytes(pdfRef, pdfFile);

    // Get the download URL for the PDF file
    const url = await getDownloadURL(pdfRef);

    // Return the download URL
    return url;
  } catch (error) {
    // Handle errors
    console.log(error);
    return null;
  }
};

// export const uploadPdfFile = (pdfUpload, setPdfUrls) => {
//     if (pdfUpload === null) return;
//     const pdfRef = ref(storage, `pdfs/${pdfUpload.name}`);
//     uploadBytes(pdfRef, pdfUpload).then((snapshot) => {
//       getDownloadURL(snapshot.ref).then((url) => {
//         setPdfUrls((prev) => [...prev, url]);
//       });
//     });
//   };

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
