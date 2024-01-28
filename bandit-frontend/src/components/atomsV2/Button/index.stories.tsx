import capitalize from "lodash/capitalize";
import Button from "./Button";
import { scales, variants } from "./types";
import { Box } from "../../atoms/StyledSystem";

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {},
}

export const Default: React.FC = () => {
  return (
    <>
      <Box mb="32px">
        {Object.values(variants).map((variant) => {
          return (
            <Box key={variant} mb="32px">
              {Object.values(scales).map((scale) => {
                return (
                  <Button key={scale} variant={variant} scale={scale} mr="8px">
                    {`${capitalize(variant)} ${scale.toUpperCase()}`}
                  </Button>
                )
              })}
            </Box>
          )
        })}
      </Box>
    </>
  )
}
