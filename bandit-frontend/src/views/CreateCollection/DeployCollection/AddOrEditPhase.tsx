import React from 'react'
import { InputHybrid } from '../../../components/atomsV2/Input'
import moment from 'moment'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button } from '../../../components/atomsV2/Button'
import DatePicker from '../../../components/atoms/DatePicker/DatePicker'
import { isValidAddress } from "../../../utils";

const getFormSchema = (contractSupply, totalPhaseSupply) => {
  return Yup.object().shape({
    phase: Yup.object({
      startDate: Yup.string(),
      price: Yup.string().required(),
      supply: Yup.number()
        .integer()
        .strict()
        .min(1, 'Minimum phase supply is 1')
        .max(contractSupply, `Maximum phase supply is ${totalPhaseSupply}`)
        .max(contractSupply - totalPhaseSupply, `Maximum phase supply is ${contractSupply - totalPhaseSupply}`)
        .required('Contract supply is must.'),
      baseURI: Yup.string().required(),
      whitelists: Yup.string().test({
        name: 'OnlyAddress',
        exclusive: false,
        params: {},
        message: '${path} must be comma separated wallet addresses',
        test: function (value) {
          if(!value) return true
          const hasInvalidAddress = value.split(",").find((item)=> !isValidAddress(item))
          return !hasInvalidAddress
        },
      }),
      maxMint: Yup.number()
        .min(1, 'Value should be more than or equal to 1')
        .test({
          name: 'max',
          exclusive: false,
          params: {},
          message: '${path} must be less than total supply',
          test: function (value) {
            return Number(value) <= parseFloat(this.parent.supply)
          },
        })
        .required('Required'),
    }),
  })
}

const getDefaultValues = (values) =>{
  let defaultValues = {
    startDate: '',
    price: 0,
    baseURI: '',
    supply: 0,
    maxMint: 1,
    whitelists: '',
  }
  if(values){
    defaultValues = {
      ...values
    }
  }

  return defaultValues
}



const AddOrEditPhase = ({ close, onClickConfirm, contractSupply, totalPhaseSupply, initialValues=null }) => {
  const formik = useFormik({
    initialValues: {
      phase: getDefaultValues(initialValues),
    },
    validationSchema: getFormSchema(contractSupply, totalPhaseSupply),
    onSubmit: (values) => {
      onClickConfirm(formik.values.phase)
      close()
    },
  })
  const { errors, touched, values, handleChange, handleBlur } = formik

  return (
    <form onSubmit={formik.handleSubmit}>
      <InputHybrid
        type="number"
        label="Phase Supply"
        placeholder={'Enter Phase Supply'}
        name="phase.supply"
        error={errors.phase && errors.phase.supply}
        touched={touched.phase && touched.phase.supply}
        value={values.phase && values.phase.supply}
        onChange={handleChange}
        onBlur={handleBlur}
        maxLength={50}
        required
        popover={() => <div style={{ padding: '10px' }}>Total number of NFTs on the blockchain</div>}
        space={{
          mb: 10,
        }}
      />

      <InputHybrid
        type="number"
        label="Minting Price (ETH)"
        placeholder="Enter Price"
        name="phase.price"
        error={errors.phase && errors.phase.price}
        touched={touched.phase && touched.phase.price}
        value={values.phase && values.phase.price}
        onChange={handleChange}
        onBlur={handleBlur}
        required
        popover={() => <div style={{ padding: '10px' }}>Minting price for each NFT</div>}
        space={{
          mb: 10,
        }}
      />

      <InputHybrid
        type="text"
        label={false ? 'IPFS /CID prior reveal' : 'IPFS /CID'}
        placeholder="CID URL"
        name="phase.baseURI"
        error={errors.phase && errors.phase.baseURI}
        touched={touched.phase && touched.phase.baseURI}
        value={values.phase && values.phase.baseURI}
        onChange={handleChange}
        onBlur={handleBlur}
        required
        popover={() => (
          <div style={{ padding: '10px' }}>
            The hash can be obtained from <br />
            the path in IPFS where you <br /> upload your content{' '}
            <a href={'contractGuidelines'} target="_blank" style={{ color: '#000000', fontWeight: 600 }}>
              Know more
            </a>
          </div>
        )}
        space={{
          mb: 10,
        }}
      />
      <InputHybrid
        type="text"
        label="Maximum NFTs per user"
        placeholder="Maximum NFTs per user"
        name="phase.maxMint"
        error={errors.phase && errors.phase.maxMint}
        touched={touched.phase && touched.phase.maxMint}
        value={values.phase && values.phase.maxMint}
        onChange={handleChange}
        onBlur={handleBlur}
        required
        popover={() => (
          <div style={{ padding: '10px' }}>
            Maximum number of NFTs can be <br /> minted by a single user
          </div>
        )}
        space={{
          mb: 10,
        }}
      />
      <InputHybrid
        type="text"
        label="Whitelists"
        placeholder="whitelists"
        name="phase.whitelists"
        error={errors.phase && errors.phase.whitelists}
        touched={touched.phase && touched.phase.whitelists}
        value={values.phase && values.phase.whitelists}
        onChange={handleChange}
        onBlur={handleBlur}
        popover={() => (
          <div style={{ padding: '10px' }}>
            Maximum number of NFTs can be <br /> minted by a single user
          </div>
        )}
        space={{
          mb: 10,
        }}
      />

      <InputHybrid
        type="datetime"
        label={`Launch date (UTC${moment().format('Z')})`}
        error={errors.phase && errors.phase.startDate}
        touched={touched.phase && touched.phase.startDate}
        required={true}
        popover={() => (
          <div style={{ padding: '10px' }}>
            Launch date can only be set once. Please contact support to update the date once it has been set.
          </div>
        )}
        space={{
          mb: 10,
        }}
        customInput={
          <DatePicker
            name="phase.startDate"
            value={values.phase && values.phase.startDate}
            onChange={(value) => formik.setFieldValue('phase.startDate', value)}
            minDate={new Date().getTime()}
          />
        }
      />
      <Button type="submit" variant="primary" scale="md" disabled={Object.keys(errors).length > 0}>
        Done
      </Button>
    </form>
  )
}

export default AddOrEditPhase
