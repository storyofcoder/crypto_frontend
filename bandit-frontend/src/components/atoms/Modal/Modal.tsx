import React from "react";
import { Modal } from "antd";

const CustomModal = ({ children, ...rest }: any) => {
  return <Modal {...rest}>{children}</Modal>
}

export default CustomModal
