import React from "react";
import { VerifiedIcon } from "../../../components/atoms/svg";
import { isDefaultImage, truncateUsername } from "../../../utils";
import BoringAvatar from "./BoringAvatar";
import { NextLinkFromReactRouter } from "../NextLink";

const Avatar2 = ({ avatarImage, userName, role, navTo, verified }: any) => {
  return (
    <NextLinkFromReactRouter to={navTo} className="avatar2">
      <p>{role}</p>

      <div className="avatar2__info">
        {!isDefaultImage(avatarImage) ? (
          <img src={avatarImage} className="avatar__img" alt="profile" />
        ) : (
          <BoringAvatar size={40} name={userName} />
        )}
        <h4>
          @{truncateUsername(userName)}
          {verified && <VerifiedIcon />}
        </h4>
      </div>
    </NextLinkFromReactRouter>
  )
}

export default Avatar2
