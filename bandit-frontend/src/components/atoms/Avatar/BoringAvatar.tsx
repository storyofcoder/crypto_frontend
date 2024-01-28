import React from "react";
import Avatar from "boring-avatars";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

const BoringAvatar = ({ size = 40, name }) => {
  return (
    <Jazzicon
      diameter={size}
      seed={jsNumberForAddress(name)}
      svgStyles={{
        display: 'block',
        verticalAlign: 'middle',
      }}
    />
  )

  return (
    <Avatar
      size={size}
      name={name}
      variant="beam"
      // colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
      // colors={["#8BA6AC", "#D7D7B8", "#E5E6C9", "#F8F8EC", "#BDCDD0"]}
      colors={['#F2385B', '#3AA2BF', '#F5A502', '#57D9CD', '#C7EFBB']}
    />
  )
}

export default BoringAvatar
