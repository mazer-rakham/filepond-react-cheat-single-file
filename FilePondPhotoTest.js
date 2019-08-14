import React, { useState } from "react";

import { connect } from "react-redux";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
// Import FilePond styles
import "filepond/dist/filepond.min.css";

import { photoTestUpload } from "../../Redux/Actions/ticketActions";
registerPlugin(FilePondPluginImagePreview);

const FilePondPhotoTest = ({ photoTestUpload }) => {
  const [picture, addAttachment] = useState({
    attachments: ""
  });
  const onSubmit = async e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("attachment", attachments);
    console.log(fd);
    photoTestUpload(fd);
  };
  const { attachments } = picture;
  const handleFilepondUpdate = fileItems => {
    console.log(fileItems);
    if (fileItems.length === 0) {
      addAttachment({
        ...picture,
        attachments: null
      });
      console.log(attachments)
    } else {
      addAttachment({
        ...picture,
        attachments: fileItems[0].file
      });
      console.log(attachments)
    }
  };
  return (
    <div>
      <h1>File pond photo test</h1>
      <form onSubmit={onSubmit}>
        <FilePond       
          onupdatefiles={fileItems => handleFilepondUpdate(fileItems)}
          allowMultiple={true}
          maxFiles={3}
        />        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  { photoTestUpload }
)(FilePondPhotoTest);
