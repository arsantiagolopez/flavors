import { Flex } from "@chakra-ui/react";
import Compressor from "compressorjs";
import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useController } from "react-hook-form";

const ListingDropzone = ({
  children,
  setPhoto,
  setPhotoPreview,
  setError,
  name,
  control,
  ...props
}) => {
  const [rejectedError, setRejectedError] = useState(null);

  const {
    field: { ref, onChange, ...controllerProps },
  } = useController({
    name,
    control,
    rules: { required: true },
    defaultValue: "",
  });

  const controllerRef = useRef(null);

  // Further image limitations
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: "image/*",
      multiple: false,
      minSize: 1024,
      maxSize: 500000,
    });

  // Handle successfully updated files
  useEffect(() => {
    if (acceptedFiles.length) {
      const [file] = acceptedFiles;

      // Create preview
      file["preview"] = URL.createObjectURL(file);

      // Temporarily update listing's photo for better UX
      setPhotoPreview(file.preview);

      // Compress image
      new Compressor(file, {
        quality: 0.1,
        // Convert PNG to JPEG if over 1MB
        converstSize: 1000000,
        success(result) {
          // Store compressed image file readdy for form submit
          setPhoto(result);
        },
      });

      // Revoke the data uris to avoid memory leaks
      return () => {
        if (file) URL.revokeObjectURL(file.preview);
      };
    }
  }, [acceptedFiles]);

  // Handle file rejection errors
  useEffect(() => {
    if (fileRejections.length) {
      const [file] = fileRejections;
      setPhotoPreview(null);
      setRejectedError(file.errors);
    }
  }, [fileRejections]);

  // Handle errors and pass them back to parent form
  useEffect(() => {
    if (rejectedError) {
      const { message } = rejectedError[0];
      setError("photo", { type: "manual", message: message });
    }
  }, [rejectedError]);

  return (
    <Flex
      {...getRootProps()}
      {...styles.wrapper}
      {...props}
      ref={controllerRef}
    >
      {children}
      <input {...getInputProps()} {...controllerProps} />
    </Flex>
  );
};

export { ListingDropzone };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    justify: "center",
    align: "center",
  },
};
