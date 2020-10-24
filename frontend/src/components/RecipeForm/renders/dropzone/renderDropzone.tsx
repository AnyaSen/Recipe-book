import React from "react";

import Styles from "./renderDropzone.module.scss";

import Dropzone from "react-dropzone";
import AdditionalButton from "../../../shared/Buttons/AdditionalButton";

export const renderDropzoneField = (field: any) => {
  const maxSize = 1000000;

  return (
    <div>
      <Dropzone
        onDrop={(filesToUpload, e) => field.input.onChange(filesToUpload)}
        accept="image/jpeg, image/jpg, image/png"
        minSize={0}
        maxSize={maxSize}
      >
        {({
          getRootProps,
          getInputProps,
          isDragActive,
          isDragReject,
          acceptedFiles,
          fileRejections
        }) => {
          const isFileTooLarge = fileRejections.length > 0;

          const isFileAccepted = acceptedFiles.length > 0;

          return (
            <div {...getRootProps()} className={Styles.dropzone}>
              <input {...getInputProps()} />
              <AdditionalButton type="button" />

              {isDragActive && !isDragReject && <h3>Drop a file</h3>}
              {isDragReject && (
                <h3>
                  The file must be <span>jpeg, jpg or png</span>
                </h3>
              )}
              {isFileAccepted && <h3>{acceptedFiles[0].name}</h3>}
              {isFileTooLarge && <p>The file is too large</p>}
            </div>
          );
        }}
      </Dropzone>
    </div>
  );
};
