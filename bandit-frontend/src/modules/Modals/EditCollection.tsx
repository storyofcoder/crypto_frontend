import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import SearchCollection from "../CreateToken/SearchCollection";
import Input from "../../components/atoms/Form/CustomInput";
import Button from "../../components/atoms/Button/Button";
import { PropertyCard } from "../../views/createToken";
import { Box, Flex, Text } from "../../components/atoms/StyledSystem";
import * as Yup from "yup";
import { notify } from "../../components/atoms/Notification/Notify";
import API from "../../services/API";
import { useQuery } from "react-query";
import Loader from "../../components/atoms/Loader/Loader";
import styled from "styled-components";

const PropertyFormSchema = Yup.object().shape({
  key: Yup.string()
    .matches(/^[a-zA-Z0-9_ ]*$/, 'Property key can only be alphanumeric.')
    .required('Property is must')
    .max(50),
  value: Yup.string()
    .matches(/^[a-zA-Z0-9_ ]*$/, 'Property value can only be alphanumeric.')
    .required('Property value is must')
    .max(50),
})

const EditNFT = ({ close, refresh, token }) => {
  const [properties, setProperties] = useState<any>({})
  const [collectionUsername, setCollectionUsername] = useState<any>(null)
  const [freezeProperties, setFreezeProperties] = useState<any>(false)

  const { user } = useSelector((state: any) => state.auth)

  const propertiesFormik = useFormik({
    initialValues: {
      key: '',
      value: '',
    },
    validationSchema: PropertyFormSchema,
    onSubmit: (values) => {
      alert('property')
    },
  })

  const {
    isLoading,
    error,
    data: tokenDetail = {},
    isFetched,
    isFetching: isTokenFetching,
    refetch: refetchTokenDetail,
  } = useQuery('token-detail', fetchTokenDetail, {
    refetchOnWindowFocus: false,
    cacheTime: 0,
  })

  function fetchTokenDetail() {
    return API.fetchNFT(token.id, token.contractAddress)
  }

  function addProperty() {
    const { key, value } = propertiesFormik.values

    const keysArr = Object.keys(properties)
    if (keysArr.includes(key)) return notify.error('Property already added', '')

    if (!key || !value) return

    setProperties({
      ...properties,
      [key]: value,
    })
    propertiesFormik.values.key = ''
    propertiesFormik.values.value = ''
  }

  function removePropertyItem(key) {
    const propertiesCopy = { ...properties }
    delete propertiesCopy[key]
    setProperties(propertiesCopy)
  }

  async function update() {
    try {
      if (!collectionUsername) return notify.error('Please select the collection', '')

      await API.moveTokenToCollection(user?.username, user?.signature, token.id, collectionUsername, properties)

      // if (freezeProperties) {
      //   await API.freezeTokenProperties(
      //     user.username,
      //     user?.signature,
      //     token.id
      //   );
      // }

      refresh()
      close()
      notify.success('NFT details updated successfully', '')
    } catch (e) {
      console.log(e)
      notify.error('Failed to update NFT details', '')
    }
  }

  function onChangeFreezeProperties() {
    setFreezeProperties(!freezeProperties)
  }

  function onClear() {
    setCollectionUsername(null)
  }

  useEffect(() => {
    const p = tokenDetail?.collection?.properties
    let properties = {}

    if (p) {
      p.map(({ key, value }) => {
        properties[key] = value
      })
    }

    setProperties(properties)
    setCollectionUsername(tokenDetail?.collection?.username)
  }, [Object.keys(tokenDetail)?.length])

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Box mb={20}>
            <Text fontSize={22} mb={10} fontWeight={[600]} color="text">
              Edit NFT
            </Text>

            <SearchCollection
              onSelect={(c) => setCollectionUsername(c.username)}
              defaultValue={tokenDetail?.collection?.username}
              onClear={onClear}
            />
          </Box>
          <Box mb={20}>
            <Text fontSize={[14]} mb={'5px'} fontWeight={[500]} color="text">
              Add properties
            </Text>

            <PropertiesFlex alignItems="baseline" justifyContent="space-between">
              <Box>
                <Input
                  type="text"
                  label=""
                  placeholder="Add property"
                  name="key"
                  errors={propertiesFormik.errors}
                  touched={propertiesFormik.touched}
                  value={propertiesFormik.values.key}
                  onChange={propertiesFormik.handleChange}
                  onBlur={propertiesFormik.handleBlur}
                />
              </Box>
              <Box>
                <Input
                  type="text"
                  label=""
                  placeholder="Add value"
                  name="value"
                  errors={propertiesFormik.errors}
                  touched={propertiesFormik.touched}
                  value={propertiesFormik.values.value}
                  onChange={propertiesFormik.handleChange}
                  onBlur={propertiesFormik.handleBlur}
                />
              </Box>

              <Button
                variant="solid"
                mb={10}
                padding="12px 20px"
                onClick={addProperty}
                disabled={!!Object.keys(propertiesFormik.errors).length}
              >
                Add
              </Button>
            </PropertiesFlex>

            <Flex flexWrap="wrap">
              {Object.keys(properties).map((c, i) => (
                <PropertyCard key={i} title={c} value={properties[c]} removeItem={removePropertyItem} />
              ))}
            </Flex>
          </Box>

          {/*<Box mt={20}>*/}
          {/*  <Flex justifyContent="space-between">*/}
          {/*    <Box>*/}
          {/*      <Text*/}
          {/*        fontSize={[14]}*/}
          {/*        mb={"5px"}*/}
          {/*        fontWeight={[500]}*/}
          {/*        color="text"*/}
          {/*      >*/}
          {/*        Freeze properties*/}
          {/*      </Text>*/}
          {/*      <Text fontSize={[12]} mb={10}>*/}
          {/*        Freezing your properties will allow you to permanently lock*/}
          {/*        and wont be able to edit later.*/}
          {/*      </Text>*/}
          {/*    </Box>*/}
          {/*    <Box>*/}
          {/*      <Switch onChange={onChangeFreezeProperties} />*/}
          {/*    </Box>*/}
          {/*  </Flex>*/}
          {/*</Box>*/}

          <Flex justifyContent="flex-end">
            <Button variant="solid" padding="12px 20px" onClick={update}>
              Update
            </Button>
          </Flex>
        </div>
      )}
    </div>
  )
}

const PropertiesFlex = styled(Flex)`
  grid-gap: 10px;
  ${(p) => p.theme.media.xxs} {
    grid-gap: 5px;
    flex-direction: column;

    div {
      width: 100%;
    }
  }
`

export default EditNFT
