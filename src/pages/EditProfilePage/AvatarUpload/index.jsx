import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { GroupWrapper, FormError } from 'layout';
import {
  UploadButton,
  FileInput,
  FileInputLabel,
  ButtonGroupWrapper,
  Avatar,
} from './style';

const AvatarUpload = ({
  handleFileSelect,
  handleFileUpload,
  avatarSrc,
  uploadErrors,
}) => {
  const [fileInputFocused, setFileInputFocused] = useState(false);

  return (
    <>
      <GroupWrapper>
        <Avatar src={avatarSrc} alt="User avatar" />
      </GroupWrapper>

      <ButtonGroupWrapper>
        <FileInputLabel htmlFor="file-upload" focused={fileInputFocused}>
          Choose Image...
        </FileInputLabel>
        <FileInput
          type="file"
          id="file-upload"
          onChange={handleFileSelect}
          onFocus={() => setFileInputFocused(true)}
          onBlur={() => setFileInputFocused(false)}
        />

        <UploadButton type="button" onClick={handleFileUpload} color="blue">
          Upload
        </UploadButton>
      </ButtonGroupWrapper>

      {uploadErrors && <FormError>{uploadErrors[0]}</FormError>}
    </>
  );
};

AvatarUpload.propTypes = {
  uploadErrors: PropTypes.arrayOf(PropTypes.string),
  avatarSrc: PropTypes.string.isRequired,
  handleFileSelect: PropTypes.func.isRequired,
  handleFileUpload: PropTypes.func.isRequired,
};

AvatarUpload.defaultProps = {
  uploadErrors: null,
};

export default AvatarUpload;
