import Head from "next/head";
import { useRouter } from "next/router";
import { DEFAULT_META, getCustomMeta } from "../../../constant/meta";

export const PageMeta: React.FC<any> = ({ ...data }) => {
  const { pathname, asPath } = useRouter()

  const pageMeta = getCustomMeta(pathname, data) || {}
  const { title, description, image } = { ...DEFAULT_META, ...pageMeta }
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`https://bandit.network${asPath}`} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={`https://bandit.network${asPath}`} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Head>
  )
}
