export const DEFAULT_META = {
  title: 'Bandit - NFT Mint Aggregator',
  description: 'NFT mint aggregator. Never miss a mint',
  image: 'https://bandit.infura-ipfs.io/ipfs/QmSrknxmNVxZ6cAc76PpsV99SxXoiL8HjDNJyRbnRGerXk',
}

export const getCustomMeta = (path: string, props?: any) => {
  // console.log('getCustomMeta', path, props)
  const defaultTitle = 'Bandit - NFT Mint Aggregator'
  let basePath
  if (path.startsWith('/explore')) {
    basePath = '/explore'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/': {
      return {
        title: `${defaultTitle}`,
      }
    }
    case '/launchpad': {
      return {
        title: `Launchpad | ${defaultTitle}`,
      }
    }
    case '/[username]': {
      const { name, description, image } = props
      return {
        title: name ? `${name} | ${defaultTitle}` : defaultTitle,
        description,
        image,
      }
    }
    case '/assets/[contractAddress]/[id]': {
      const { tokenName, collectionName, description, image } = props
      return {
        title: tokenName ? `${tokenName}(@${collectionName}) | ${defaultTitle}` : defaultTitle,
        description,
        image,
      }
    }
    case '/collection/[chain]/[username]': {
      const { collectionName, description, image } = props
      return {
        title: collectionName ? `${collectionName} | ${defaultTitle}` : defaultTitle,
        description,
        image,
      }
    }
    case '/explore': {
      return {
        title: `NFTs | ${defaultTitle}`,
      }
    }
    case '/collections': {
      return {
        title: `Collections | ${defaultTitle}`,
      }
    }
    case '/profiles': {
      return {
        title: `Profiles | ${defaultTitle}`,
      }
    }
    case '/activity': {
      return {
        title: `Activity | ${defaultTitle}`,
      }
    }
    case '/rankings': {
      return {
        title: `Rankings | ${defaultTitle}`,
      }
    }
    case '/stats': {
      return {
        title: `Stats | ${defaultTitle}`,
      }
    }
    case '/feed': {
      return {
        title: `Feed | ${defaultTitle}`,
      }
    }
    case '/creators': {
      return {
        title: `Creators | ${defaultTitle}`,
      }
    }
    case '/collectors': {
      return {
        title: `Collectors | ${defaultTitle}`,
      }
    }
    case '/create-nft': {
      return {
        title: `Create NFT | ${defaultTitle}`,
      }
    }
    case '/create-collection': {
      return {
        title: `Create Collection | ${defaultTitle}`,
      }
    }
    case '/assets/[contractAddress]/[id]/buy': {
      const { name, description, image } = props
      return {
        title: name ? `Buy NFT ${name} | ${defaultTitle}` : defaultTitle,
        description,
        image,
      }
    }
    case '/edit-profile': {
      return {
        title: `Edit Profile | ${defaultTitle}`,
      }
    }
    case '/edit-collection/[username]': {
      return {
        title: `Edit Collection | ${defaultTitle}`,
      }
    }
    case '/list-for-sale/[contractAddress]/[id]': {
      const { name, description, image } = props
      return {
        title: name ? `List for Sale ${name} | ${defaultTitle}` : defaultTitle,
        description,
        image,
      }
    }
    case '/assets/[contractAddress]/[id]/bid': {
      const { name, description, image } = props
      return {
        title: name ? `Bid on NFT ${name} | ${defaultTitle}` : defaultTitle,
        description,
        image,
      }
    }
    case '/assets/[contractAddress]/[id]/settle': {
      const { name, description, image } = props
      return {
        title: name ? `Settle Auction ${name} | ${defaultTitle}` : defaultTitle,
        description,
        image,
      }
    }
    case '/assets/[contractAddress]/[id]/settle-offer': {
      const { name, description, image } = props
      return {
        title: name ? `Settle Offer ${name} | ${defaultTitle}` : defaultTitle,
        description,
        image,
      }
    }
    case '/notification': {
      return {
        title: `Notifications | ${defaultTitle}`,
      }
    }
    default:
      return null
  }
}
