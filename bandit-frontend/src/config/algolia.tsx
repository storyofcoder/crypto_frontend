const getConfig = () => {
  let config = {
    nft: '',
    users: '',
    collection: '',
    apiKey: '',
  }

  if (process.env.NEXT_PUBLIC_NODE_ENV === 'qa') {
    config = {
      nft: '',
      users: '',
      collection: '',
      apiKey: '',
    }
  }

  if (process.env.NEXT_PUBLIC_NODE_ENV === 'production') {
    config = {
      nft: '',
      users: '',
      collection: '',
      apiKey: '',
    }
  } else if (process.env.NEXT_PUBLIC_NODE_ENV === 'staging') {
    config = {
      nft: '',
      users: '',
      collection: '',
      apiKey: '',
    }
  }

  return config
}

export default getConfig()
