import React, { useEffect, useState } from 'react'
import Interweave from 'interweave'
import styed from 'styled-components'
import { useSelector } from 'react-redux'
import { notify } from '../../components/atoms/Notification/Notify'
import { Box, Flex } from '../../components/atoms/StyledSystem'
import { Button } from '../../components/atomsV2/Button'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import API from '../../services/API'
import Loader from '../../components/atoms/Loader/Loader'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import useSignature from 'hooks/useSignature'
import { uploadFile } from 'state/source'
import { NavigationTabs } from '../../components/molecules/AppLayout/DiscoverLayout'
import { useGetCollectionRankings } from '../../state/collections/hooks'
import { updateCollectionRoadmap } from '../../state/collections/source'

const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false,
})

const DEFAULT_ROADMAP = `<p style="text-align: center;"><strong><br>
</strong></p>
<p style="text-align: center;"><strong><br>
</strong></p>

<p style="text-align: center;"><strong><br>
</strong></p>

<p style="text-align: center;"><strong><br>
</strong></p>

<p style="text-align: center;"><strong><br>
</strong></p>

<p style="text-align: center;"><span style="font-size: 16px;">​<span style="color: rgb(42, 46, 52);">No roadmap to display</span></span><br>
</p>
`

const CollectionRoadmap = ({ username, tabsList, ownerWalletAddress = '' }) => {
  const [signature, getSignature] = useSignature()
  const [isPrivate, setIsPrivate] = useState(false)
  const [view, setView] = useState('')
  // const [saveView, setSaveView] = useState(DEFAULT_ROADMAP)
  const [isEdit, setIsEdit] = useState(false)

  const router = useRouter()
  const { query, isReady } = router
  const { account } = useActiveWeb3React()
  const { user } = useSelector((state: any) => state.auth)

  const { roadmap, isLoading }: any = useGetCollectionRankings(query?.username, { enabled: isReady })

  useEffect(() => {
    if (isLoading) {
      return
    }
    if (roadmap) {
      setView(roadmap)
    } else {
      setView(DEFAULT_ROADMAP)
    }
  }, [roadmap, isLoading])

  // useEffect(() => {
  //   handleFetchRoadmap()
  // }, [])

  useEffect(() => {
    if (ownerWalletAddress && account) {
      setIsPrivate(ownerWalletAddress.toLowerCase() === account.toLowerCase())
    }
  }, [account, ownerWalletAddress])

  const handleChange = (e) => {
    setView(e)
  }

  const handleSave = async () => {
    setView(view)
    setIsEdit(false)
    let _signature = signature || (await getSignature())
    let response = await updateCollectionRoadmap(user?.username, {
      signature: _signature,
      walletAddress: account,
      roadmap: view,
    })
    notify.success('Roadmap update successful', '')
  }

  const handleCancel = () => {
    setView(roadmap)
    setIsEdit(false)
  }

  const onImageUploadBefore = (files, info, uploadHandler) => {
    try {
      addPhoto(files, uploadHandler).catch((error) => {
        console.log(error)
      })
    } catch (err) {
      uploadHandler(err.toString())
    }
  }

  const addPhoto = async (files, uploadHandler) => {
    const maxSize = 5
    if (!files.length) {
      notify.error(`There was an error uploading your photo`, '')
      return
    }
    var file = files[0]
    if (file.size / 1024 / 1024 > maxSize) {
      notify.error(`File size cannot be greater than ${maxSize}mb`, '')
      uploadHandler()
      return
    }
    let _signature = signature || (await getSignature())
    try {
      let url = await uploadFile(account, _signature, file, 'roadmap')
      const response = {
        result: [
          {
            url: `${url}?auto=format`,
            name: file?.name,
            size: file?.size,
          },
        ],
      }
      uploadHandler(response)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Box>
      <NavigationTabs tabsList={tabsList} />
      {!isLoading ? (
        <MainWrapper disabled={!isPrivate || !isEdit} isEdit={isEdit}>
          {isPrivate && (
            <ButtonWrapper>
              {isEdit ? (
                <>
                  <Button variant="secondary" scale="sm" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button variant="primary" scale="sm" onClick={handleSave} ml={10}>
                    Save
                  </Button>
                </>
              ) : (
                <Button variant="primary" scale="sm" onClick={() => setIsEdit(!isEdit)}>
                  Edit
                </Button>
              )}
            </ButtonWrapper>
          )}
          <SunEditor
            setAllPlugins={isPrivate && isEdit}
            setOptions={{
              buttonList: [
                ['undo', 'redo', 'fontSize', 'formatBlock'],
                ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'removeFormat'],
                ['fontColor', 'hiliteColor', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'table'],
                ['link', 'image', 'video', 'fullScreen', 'showBlocks', 'codeView'],
              ],
              height: 'auto',
            }}
            disable={!isPrivate || !isEdit}
            setContents={view}
            onChange={handleChange}
            onImageUploadBefore={onImageUploadBefore}
          />
        </MainWrapper>
      ) : (
        <Flex alignItems="center" justifyContent="center" minHeight="500px">
          <Loader />
        </Flex>
      )}
    </Box>
  )
}

const MainWrapper = styed(Box)`
  margin-top: 20px;
.sun-editor .se-toolbar {
  display: ${(p) => (p.isEdit ? 'block' : 'none !important')};
}
.se-resizing-bar{
  display: ${(p) => (p.disabled ? 'none' : 'block')};
}
.sun-editor{
  border: ${(p) => (p.disabled ? 'none' : `1px solid ${p.theme.colors.grey400}`)};
}

.sun-editor-editable{
  background-color: ${(p) => p.theme.colors.background};
  color: ${(p) => p.theme.colors.foreground};
  padding: 0 !important;
}


`

const ButtonWrapper = styed(Box)`
  margin-bottom: 20px;
  text-align: right;
`

export default CollectionRoadmap
