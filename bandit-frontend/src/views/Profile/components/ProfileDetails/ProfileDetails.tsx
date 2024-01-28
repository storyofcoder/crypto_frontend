import React from 'react'

import ProfileDescriptionSection from '../Components/ProfileDescriptionSection'

const ProfileDetails = (props) => {
  const { showChat, socialmedia } = props

  return <ProfileDescriptionSection socialmedia={socialmedia} showChat={showChat} profileInfo={props} isEdit={false} />
}

export default ProfileDetails
