import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import Input from "../../components/atoms/Form/CustomInput";
import Button from "../../components/atoms/Button/Button";
import SearchCollection from "../CreateToken/SearchCollection";
import { Box, Flex, Text } from "../../components/atoms/StyledSystem";
import { PropertyCard } from "../../views/createToken";
import { notify } from "../../components/atoms/Notification/Notify";
import API from "../../services/API";
import { useSelector } from "react-redux";

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

const MoveTokenToCollection = ({ token, close, refresh }) => {
  const [collectionUsername, setCollectionUsername] = useState<any>(null)
  const [properties, setProperties] = useState<any>({})
  const [freezeProperties, setFreezeProperties] = useState<any>(false)
  const [proceedToContinue, setProceedToContinue] = useState<any>(false)

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
  function onClear() {
    setCollectionUsername(null)
  }

  async function moveToken() {
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
      notify.success('NFT moved to collection', '')
    } catch (e) {
      console.log(e)
      notify.error('Failed to move NFT to collection', '')
    }
  }

  function onChangeFreezeProperties() {
    setFreezeProperties(!freezeProperties)
  }

  function onClickContinue() {
    setProceedToContinue(!proceedToContinue)
  }

  const creatorEditing = token.tokenCreator === user?.username && token.editable

  return creatorEditing && !proceedToContinue ? (
    <Flex flexDirection="column" alignItems="center">
      <Text fontSize={18} textAlign="center">
        Because you are not the owner of this token, <br />
        you can only add it to a collection once.
      </Text>
      <Button variant="solid" onClick={onClickContinue} mt={10}>
        Continue
      </Button>
    </Flex>
  ) : (
    <div>
      <Box mb={20}>
        <Text fontSize={22} mb={10} fontWeight={[600]} color="text">
          Add this NFT to a collection
        </Text>

        <SearchCollection onSelect={(c) => setCollectionUsername(c.username)} onClear={onClear} />
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
      {/*        Freezing your properties will allow you to permanently lock and*/}
      {/*        wont be able to edit later.*/}
      {/*      </Text>*/}
      {/*    </Box>*/}
      {/*    <Box>*/}
      {/*      <Switch onChange={onChangeFreezeProperties} />*/}
      {/*    </Box>*/}
      {/*  </Flex>*/}
      {/*</Box>*/}

      <Flex justifyContent="flex-end">
        <Button variant="solid" padding="12px 20px" onClick={moveToken}>
          Move
        </Button>
      </Flex>
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

export default MoveTokenToCollection
