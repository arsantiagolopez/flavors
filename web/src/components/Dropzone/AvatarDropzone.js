import { Flex } from "@chakra-ui/react";
import Compressor from "compressorjs";
import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "../../axios";

const AvatarDropzone = forwardRef(
  ({ children, user, mutate, setPicture, ...props }, ref) => {
    const [file, setFile] = useState(null);

    // Upload image securely to s3 bucket
    const uploadImageToS3 = async () => {
      // Get secure URL from server
      const { status, data } = await axios.get("/api/s3/url");
      if (status !== 200) return;
      const { url } = data;
      // Remove preview from file
      delete file.preview;
      // Post image to S3 Bucket
      await axios.put(url, file, {
        headers: { "Content-type": file.type },
      });
      const imageURL = url.split("?")[0];
      return imageURL;
    };

    // Delete old image object from s3 bucket
    const deleteImageFromS3 = async (url) => {
      await axios.post("/api/s3/delete", { url });
    };

    // Handle drop
    const onDrop = useCallback(async ([file]) => {
      if (file) {
        // Create preview
        file["preview"] = URL.createObjectURL(file);

        // Temporarily update user's avatar for better UX
        setPicture(file.preview);

        // Compress image
        new Compressor(file, {
          quality: 0.1,
          // Convert PNG to JPEG if over 1MB
          converstSize: 1000000,
          success(result) {
            // Store file in state
            setFile(result);
          },
        });
      } else {
        // Clear image
        setPicture(null);
      }
    }, []);

    // Further image limitations
    const { getRootProps, getInputProps } = useDropzone({
      accept: "image/*",
      multiple: false,
      minSize: 1024,
      maxSize: 5072000,
      onDrop,
    });

    // Handle newly updated file
    useEffect(async () => {
      if (file) {
        // Delete previous image object from s3 if exists
        if (user?.image?.includes(".amazonaws.com/")) {
          await deleteImageFromS3(user?.image);
        }
        // Upload image to bucket
        const image = await uploadImageToS3();

        // Update user profile with new image link
        if (image) {
          await axios.put("/api/user/profile", { image });
          mutate({ ...user, image });
        }
      }

      return () => {
        if (file) {
          // Revoke the data uris to avoid memory leaks
          URL.revokeObjectURL(file.preview);
        }
      };
    }, [file]);

    return (
      <Flex {...getRootProps()} {...styles.wrapper} {...props} ref={ref}>
        {children}
        <input {...getInputProps()} />
      </Flex>
    );
  }
);

export { AvatarDropzone };

// Styles

const styles = {
  wrapper: {
    direction: "column",
    justify: "center",
    align: "center",
  },
};
