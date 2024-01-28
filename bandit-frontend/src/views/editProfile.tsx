import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'

import { Mixpanel, MixpanelEvents } from '../analytics/Mixpanel'
import { refreshUser, setUser } from '../state/Auth/actions'
import { notify } from '../components/atoms/Notification/Notify'
import { PageMeta } from '../components/molecules/AppLayout/PageMeta'
import { uploadFile } from 'state/source'

import EditProfile from '../components/templates/Profile/EditProfile'
import useActiveWeb3React from '../hooks/useActiveWeb3React'
import useSignature from 'hooks/useSignature'
import API from '../services/API'
import { updateProfile } from 'state/Profile/source'

const EditProfileView = () => {
  const { user } = useSelector((state: any) => state.auth)
  const [signature, getSignature] = useSignature()
  const dispatch = useDispatch()
  const router = useRouter()

  const { account } = useActiveWeb3React()

  useEffect(() => {
    if (user?.username) {
      _refreshUser()
    }
  }, [user])

  const _refreshUser = async () => {
    try {
      let _signature = signature || (await getSignature())
      dispatch(refreshUser(user?.walletAddress, _signature))
    } catch (error) {
      notify.error('Failed to get profile details', '')
    }
  }

  async function onClickSubmit(body, default_user_page) {
    try {
      let _signature = signature
      if (!_signature) _signature = await getSignature()
      // await API.updateProfileDefaultPage(user?.username, _signature, default_user_page)
      await updateProfile(account, _signature, body, body?.email, user?.username)
      dispatch(
        setUser({
          ...user,
          ...body,
          default_user_page,
        }),
      )
      localStorage.setItem('user', JSON.stringify({ ...user, ...body, default_user_page }))
      Mixpanel.track(MixpanelEvents.PROFILE_UPDATED, {
        ...user,
        ...body,
        default_user_page,
      })

      notify.success('Profile details updated successfully', '')

      router.push(`/${body?.username}`)
    } catch (e) {
      notify.error('Failed to update profile details', '')
    }
  }

  async function uploadCoverImage(coverImage) {
    try {
      let _signature = signature
      if (!_signature) _signature = await getSignature()
      Mixpanel.track(MixpanelEvents.UPLOAD_COVER_PHOTO, {
        account,
        coverImage,
        type: 'cover',
      })
      const data = await uploadFile(account, _signature, coverImage, 'cover')

      await API.updateProfile(
        account,
        _signature,
        {
          ...user,
          coverImage: data,
        },
        user.email,
      )
      dispatch(
        setUser({
          ...user,
          coverImage: data,
        }),
      )

      localStorage.setItem('user', JSON.stringify({ ...user, coverImage: data }))
      notify.success('Cover photo updated successfully', '')
    } catch (e) {
      notify.error('Failed to update cover photo ', '')
    }
  }
  async function uploadProfileImage(coverImage) {
    try {
      let _signature = signature
      if (!_signature) _signature = await getSignature()
      Mixpanel.track(MixpanelEvents.UPLOAD_PROFILE_PHOTO, {
        account,
        coverImage,
        type: 'profile',
      })
      const data = await uploadFile(account, _signature, coverImage, 'profile')
      await API.updateProfile(
        account,
        _signature,
        {
          ...user,
          profileImage: data,
        },
        user.email,
      )

      dispatch(
        setUser({
          ...user,
          profileImage: data,
        }),
      )
      localStorage.setItem('user', JSON.stringify({ ...user, profileImage: data }))
      notify.success('Profile photo updated successfully', '')
    } catch (e) {
      notify.error('Failed to update profile photo ', '')
    }
  }

  return (
    <div>
      <PageMeta />
      <EditProfile
        profileInfo={user}
        onClickSubmit={onClickSubmit}
        uploadCoverImage={uploadCoverImage}
        uploadProfileImage={uploadProfileImage}
      />
    </div>
  )
}

export default EditProfileView
