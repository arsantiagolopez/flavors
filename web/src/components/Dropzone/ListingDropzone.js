import { Flex } from "@chakra-ui/react";
import Compressor from "compressorjs";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useController } from "react-hook-form";

const ListingDropzone = ({
  children,
  setPhotoPreview,
  setError,
  clearErrors,
  name,
  control,
  ...props
}) => {
  const [rejectedError, setRejectedError] = useState(null);

  const {
    field: { ref, value, onChange, ...controllerProps },
  } = useController({
    name,
    control,
    rules: { required: "You need to add a photo for your plate." },
    defaultValue: "",
  });

  // Further image limitations
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: "image/*",
      multiple: false,
      minSize: 1024,
      maxSize: 5000000,
    });

  // Handle successfully updated files
  useEffect(() => {
    if (acceptedFiles.length) {
      const [file] = acceptedFiles;

      // Clear previous errors
      clearErrors("photo");

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
          // Store compressed image file ready for form submit
          onChange(result);
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
    <Flex {...getRootProps()} {...styles.wrapper} {...props}>
      {children}
      <input onChange={onChange} {...getInputProps()} {...controllerProps} />
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
