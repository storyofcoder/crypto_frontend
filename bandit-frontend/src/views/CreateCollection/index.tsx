import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import API from '../../services/API'
import { useSelector } from 'react-redux'
import { notify } from '../../components/atoms/Notification/Notify'
import { Mixpanel, MixpanelEvents } from '../../analytics/Mixpanel'
import { getWebsiteRegex, isValidAddress, stringifyErrorJson } from '../../utils'
import validateIpfsFormat from '../../utils/ipfsValidation'
import { useRouter } from 'next/router'
import { PageMeta } from '../../components/molecules/AppLayout/PageMeta'
import Page from '../../components/atomsV2/Page'
import DeployCollection from './DeployCollection'
import CollectionDetails from './CollectionDetails'
import { useGetCollectionDetails } from '../../state/collections/hooks'
import { uploadFile } from '../../state/source'
import { createOrUpdateCollection } from '../../state/collections/helpers'
import useSignature from '../../hooks/useSignature'
import { useWeb3React } from '@web3-react/core'

const contractGuidelines = ''

const FormSchema = ({ collectionName, isEdit }) => {
  return Yup.object().shape({
    name: Yup.string()
      .required('Collection name is must.')
      .matches(/^[a-zA-Z0-9_ ]*$/, 'Collection name can only be alphanumeric.')
      .test('unique', 'Collection name exists', async function (value, context) {
        try {
          if (!value) return
          const trimmed = value.trim()

          if (isEdit && collectionName === value) {
            return true
          } else {
            const res = await API.checkCollectionUsername(trimmed)
            return !res.usernameExist
          }
        } catch (e) {
          return true
        }
      }),
    description: Yup.string().required('Collection Description is must.'),

    discord: Yup.string(),
    instagram: Yup.string(),
    twitter: Yup.string(),
    website: Yup.string().matches(getWebsiteRegex(), 'Please Enter valid website link'),
    contractSupply: Yup.number()
      .integer()
      .strict()
      .min(1, 'Minimum contract supply is 1')
      .required('Contract supply is must.'),
    contractName: Yup.string().required('Contract name is must.'),
    contractSymbol: Yup.string().required('Contract symbol is must.'),
    contractURL: Yup.string().required('Contract url is must.'),
    contractPrice: Yup.number().min(0.0001, 'Price must more than 0.0001').required('Minting price is must.'),
    contractRoyalty: Yup.number()
      .min(0, 'Royalty must more than or equal to 0')
      .max(15, 'Royalty must less than or equal to 15')
      .required('Invalid Royalty'),
    maxMint: Yup.string()
      .min(1, 'Value should be more than or equal to 1')
      .test({
        name: 'max',
        exclusive: false,
        params: {},
        message: '${path} must be less than total supply',
        test: function (value) {
          return Number(value) <= parseFloat(this.parent.contractSupply)
        },
      })
      .required('Required'),
  })
}

const CreateCollection = ({ isEdit }) => {
  const [collectionInitialDetails, setCollectionInitialDetails] = useState({
    name: '',
    description: '',
    discord: '',
    instagram: '',
    twitter: '',
    website: '',
  })
  const [profileImage, setProfileImage] = useState({
    file: null,
    fileUrl: null,
  })
  const [coverImage, setCoverImage] = useState({ file: null, fileUrl: null })
  const [launchDate, setLaunchDate] = useState(null)
  const [loading, setLoading] = useState(false)
  const [currentPage, setcurrentPage] = useState(1)

  const { user } = useSelector((state: any) => state.auth)

  const router: any = useRouter()

  const [signature, getSignature] = useSignature()

  const { account } = useWeb3React()

  const { query, isReady } = router
  const { username } = query

  const { collectionDetails }: any = useGetCollectionDetails({username}, {
    enabled: isReady,
  })

  useEffect(() => {
    const { name, bio, socialMedia, coverImage, profileImage } = collectionDetails
    const { discord, instagram, twitter, website } = socialMedia || {}

    setCollectionInitialDetails({
      name,
      description: bio,
      discord,
      instagram,
      twitter,
      website,
    })

    setCoverImage({
      file: null,
      fileUrl: coverImage,
    })
    setProfileImage({
      file: null,
      fileUrl: profileImage,
    })
  }, [collectionDetails])

  const formik = useFormik({
    initialValues: collectionInitialDetails,
    enableReinitialize: true,
    validationSchema: () =>
      FormSchema({
        collectionName: collectionDetails?.name,
        isEdit,
      }),
    onSubmit: (values) => {
      // handleSubmit()
    },
  })

  const uploadFile = async (signature, file, type) => {
    const url = await API.uploadImage(account, signature, file, type)

    return url
  }

  const onChangeProfileImage = (file) => {
    setProfileImage({
      file,
      fileUrl: URL.createObjectURL(file),
    })
  }
  const onChangeCoverImage = (file) => {
    setCoverImage({
      file,
      fileUrl: URL.createObjectURL(file),
    })
  }
  const continueToDeploy = () => {
    if (!profileImage.file && !profileImage.fileUrl) return notify.error('Please upload profile image', '')
    if (!coverImage.file && !coverImage.fileUrl) return notify.error('Please upload cover image', '')

    if (currentPage === 1) {
      setcurrentPage(2)
    }
  }

  const saveBasicDetails = async () => {
    const { description, instagram, discord, twitter, website } = formik.values
    const { name, contractAddress } = collectionDetails
    let coverImageUrl = coverImage.fileUrl
    let profileImageUrl = profileImage.fileUrl

    try {
      let _signature = signature

      if (!signature) {
        _signature = await getSignature()
      }
      if (coverImage.file) {
        coverImageUrl = await uploadFile(_signature, coverImage.file, 'collection-cover')
      }

      if (profileImage.file) {
        profileImageUrl = await uploadFile(_signature, profileImage.file, 'collection-profile')
      }

      const username = name.trim().replaceAll(' ', '-')
      let params = {
        walletAddress: account,
        signature: _signature,
        collection: {
          name: name,
          username,
          bio: description,
          coverImage: coverImageUrl,
          profileImage: profileImageUrl,
          contractAddress,
          socialmedia: {
            instagram,
            discord,
            twitter,
            website,
          },
        },
      }
      await createOrUpdateCollection(username, params)

      notify.success('Collection details saved', '')
    } catch (e) {
      notify.error('Failed to save collection details', '')
    }
  }

  const isDeployed = isValidAddress(collectionDetails?.contractAddress)

  return (
    <>
      <PageMeta />
      <Page scale="sm">
        <CollectionDetails
          isEdit={isEdit}
          isDeployed={isDeployed}
          hide={currentPage === 2}
          formik={formik}
          continueToDeploy={isDeployed ? saveBasicDetails : continueToDeploy}
          onChangeCoverImage={onChangeCoverImage}
          onChangeProfileImage={onChangeProfileImage}
          coverImage={coverImage}
          profileImage={profileImage}
        />

        <DeployCollection
          collectionDetails={collectionDetails}
          collectionDetailsFormik={formik}
          hide={currentPage === 1}
          launchDate={launchDate}
          setLaunchDate={setLaunchDate}
          setcurrentPage={setcurrentPage}
          coverImage={coverImage}
          profileImage={profileImage}
        />
      </Page>
    </>
  )
}

export default CreateCollection
