import capitalize from "lodash/capitalize";
import Loader from "./Loader";
import { Box } from "../../../atoms/StyledSystem";
import { darkColors, lightColors } from "../../Theme/colors";

export default {
  title: 'SVG/Loader',
  component: Loader,
  argTypes: {},
}

export const Default: React.FC = () => {
  return (
    <>
      <Box mb="32px">
      <>
        <p>{capitalize('Small Default')}</p>
        <Loader 
          width="30" 
          height="30" 
          trackColor={darkColors.backgroundAlt}
          loaderColor={darkColors.primaryDark} />
        <p>{capitalize('Medium Default')}</p>
        <Loader 
          width="40" 
          height="40"
          trackColor={lightColors.backgroundDisabled}
          loaderColor={lightColors.primary} />
        <p>{capitalize('Large Default')}</p>
        <Loader width="56" height="56" />
      </>
      </Box>
    </>
  )
}
