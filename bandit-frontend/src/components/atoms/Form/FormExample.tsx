import React from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";

import { Box } from "../StyledSystem";
import CustomInput from "./CustomInput";

const FormSchema = Yup.object().shape({
  title: Yup.string().required('Title must required.'),
  description: Yup.string().required('Description must required.'),
  royalty: Yup.number()
    .positive('Only positive number allowed')
    .min(0, 'Value must more than 0')
    .max(16, 'Value must less than or equals to 15')
    .required('Royalty must required'),
})

const CustomForm = ({}: any) => {
  const getInitialForm = () => {
    return {
      title: '',
      description: '',
      royalty: null,
    }
  }

  const handleSubmit = () => {}

  return (
    <Box>
      <Formik initialValues={getInitialForm} validationSchema={FormSchema} onSubmit={handleSubmit}>
        {(props) => {
          const { values, touched, errors, handleChange, handleBlur } = props
          return (
            <Form>
              <CustomInput
                type="text"
                label="NFT Title"
                placeholder="Enter your NFT title here"
                name="title"
                errors={errors}
                touched={touched}
                value={values['title']}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={50}
              />
              <CustomInput
                type="textarea"
                label="Description"
                placeholder="Add your NFT description or write the story brhind your NFT or IPR giveways"
                name="description"
                errors={errors}
                touched={touched}
                value={values['description']}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <CustomInput
                type="number"
                label="Royalty (Max 15%)"
                placeholder="Set your royalty percentage. Min 1, Max 15"
                name="royalty"
                errors={errors}
                touched={touched}
                value={values['royalty']}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={50}
              />
            </Form>
          )
        }}
      </Formik>
    </Box>
  )
}

export default CustomForm
