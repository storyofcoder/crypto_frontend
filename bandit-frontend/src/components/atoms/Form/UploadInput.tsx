import React from "react";
import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { Box, Text } from "../StyledSystem";
import { notify } from "../Notification/Notify";

const UploadInput = ({
  accept = 'image/*, video/*',
  caption,
  onChange,
  customButton,
  label,
  helperText,
  onRemove,
  maxSize = 1,
}: any) => {
  const props = {
    name: 'file',
    accept: accept,
    showUploadList: !customButton,
    maxCount: 1,
    customRequest(options) {
      const { onSuccess } = options
      onSuccess('Ok')
    },
    beforeUpload(file) {
      if (file.size / 1024 / 1024 > maxSize) {
        notify.error(`File size cannot be greater than ${maxSize}mb`, '')
        return Upload.LIST_IGNORE
      }

      if (!accept.includes(file.type)) {
        notify.error(`Invalid file type`, '')
        return Upload.LIST_IGNORE
      }

      return true
    },
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
      }
      if (info.file.status === 'done') {
        if (onChange) onChange(info.file.originFileObj)
      }
      if (info.file.status === 'removed') {
        if (onRemove) onRemove()
      }
    },
  }

  return (
    <Box>
      {label && (
        <Text fontSize={[14]} mb={10} fontWeight={[600]}>
          {label}
        </Text>
      )}
      <Upload {...props}>
        {!customButton ? <Button icon={<UploadOutlined />}>{caption || 'Click to Upload'}</Button> : customButton()}
      </Upload>
      {helperText && (
        <Text fontSize={[13]} mt={'8px'}>
          {helperText}
        </Text>
      )}
    </Box>
  )
}

export default UploadInput
