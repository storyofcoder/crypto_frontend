//
//
//
// import React, { useCallback, useState } from "react";
// // import { upload_icon } from "@ui/icons";
// import {Form } from "react-bootstrap"
// // import { useDropzone } from "react-dropzone";
//
// import Input from "../../atoms/Form/Input";
// import UploadInput from "../../atoms/Form/UploadInput";
// import "./style.scss";
// import CheckBox from "../../atoms/Form/CheckBox";
//
// const CreateToken2 = () => {
//   const [state, setState] = useState<any>({
//     file: null,
//     name: "",
//     description: "",
//     price: "",
//     royalty: "",
//     isOnBuy: false,
//     cryptoType: "INR",
//   });
//   const [uploadedFile, setUploadedFile] = useState<any>(null);
//
//
//   function setFile(file: any) {
//     setUploadedFile(file);
//     setState({ ...state, file: URL.createObjectURL(file) });
//   }
//   function unsetFile() {
//     setState({ ...state, file: null });
//   }
//
//   function handleSave(e: any){
//     const form = e.currentTarget;
//     console.log(form.checkValidity())
//
//     e.preventDefault()
//   }
//   const onDrop = useCallback((acceptedFiles) => {
//     setUploadedFile(acceptedFiles[0]);
//     setFile(acceptedFiles[0]);
//   }, []);
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
//
//
//   return (
//       <div className="create-token">
//         <div className="create-token--card">
//           <div className="create-token__section">
//             {state.file ? (
//                 <AssetView
//                     isVideo={uploadedFile.type.indexOf("video") >= 0}
//                     url={state.file}
//                     onCancel={unsetFile}
//                 />
//             ) : (
//                 <div className="create-token__upload" {...getRootProps()}>
//                   {isDragActive ? (
//                       <div>Drop the files here ...</div>
//                   ) : (
//                       <>
//                         <img src={upload_icon} />
//                         <h6>Upload your file here</h6>
//                         <span>JPG, PNG, MP4, PDF or HTML videos accepted.</span>
//                         <UploadInput {...getInputProps()} onChange={setFile}>
//                           Click to upload
//                         </UploadInput>
//                       </>
//                   )}
//                 </div>
//             )}
//           </div>
//           <div className="create-token__section">
//             <Form noValidate validated={false} onSubmit={handleSave}>
//               <Input
//                   type="text"
//                   label="Enter the title of your NFT"
//                   placeholder="Title"
//                   className="create-token__input"
//                   required
//                   success="Looks good!"
//                   error="Please provide a valid title."
//               />
//               <Input
//                   type="textarea"
//                   label="Add your NFT description or write the story behind your NFT"
//                   placeholder="Description"
//                   className="create-token__input"
//                   required
//               />
//               <Input
//                   type="number"
//                   label="Set your royalty percentage. Minimum 1, max 5"
//                   placeholder="Royalty"
//                   className="create-token__input"
//                   RightIcon={() => "%"}
//                   required
//                   step={0.01}
//                   min="1"
//                   max="5"
//               />
//               <Input
//                   type="number"
//                   label="Set the NFT price"
//                   placeholder="Price"
//                   className="create-token__input"
//                   step={0.00001}
//                   RightIcon={() => "INR"}
//                   required
//
//               />
//               <CheckBox type="checkbox" label="List NFT for sale" />
//               <div className="create-token__section--actions">
//                 <Input type="submit"/>
//               </div>
//             </Form>
//           </div>
//         </div>
//       </div>
//   );
// };
//
// const AssetView = ({ isVideo, url, onCancel }: any) => {
//   return (
//       <div className="asset-view" onClick={onCancel}>
//         {isVideo ? (
//             <video muted loop autoPlay playsInline src={url} width="100%" />
//         ) : (
//             <img src={url} />
//         )}
//         <span>✕</span>
//       </div>
//   );
// };
//
// export default CreateToken2;

import React from "react";

const MyComponent = () => {
  return <div></div>
}

export default MyComponent
