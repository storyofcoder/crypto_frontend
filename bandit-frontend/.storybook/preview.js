import { withThemesProvider } from "themeprovider-storybook";
import { light, dark } from "../src/components/atomsV2/Theme";


const globalDecorator = (StoryFn) => (
  <>
    <StoryFn />
  </>
);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

const themes = [
  {
    name: "Light",
    backgroundColor: light.colors.background,
    ...light,
  },
  {
    name: "Dark",
    backgroundColor: dark.colors.background,
    ...dark,
  },
];

export const decorators = [globalDecorator, withThemesProvider(themes)];