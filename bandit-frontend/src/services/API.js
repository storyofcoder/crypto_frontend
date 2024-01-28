import axios from "axios";
import locale from "../constant/locale";
import { Mixpanel, MixpanelEvents } from "../analytics/Mixpanel";

const api = locale.API_END_POINT

class API {
  /**
   * Signin using metamask
   * @param {string} walletAddress
   * @param {string} signature
   * @param {string} referrer_code
   */
  static signin(walletAddress, signature, referrer_code) {
    const params = {
      walletAddress,
      signature,
      referrer_code,
      action: 'signin',
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * Signup using metamask
   * @param {string} walletAddress
   * @param {string} username
   * @param {string} email
   * @param {string} name
   * @param {string} referrer_code
   */
  static signUp(walletAddress, username, email, name, referrer_code) {
    const params = {
      walletAddress,
      email,
      name,
      username,
      referrer_code,
      action: 'signup',
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  /**
   * Get user profile
   * @param {string} walletAddress
   * @param {object} profile
   */
  static getProfile(walletAddress, signature) {
    const params = {
      walletAddress,
      signature,
      action: 'getProfileFromWalletAddress',
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => {
          Mixpanel.identify(response?.data?.username)
          Mixpanel.people.set({ $email: response?.data?.email })
          resolve(response.data)
        })
        .catch((error) => reject(error))
    })
  }

  /**
   * Updtae user profile
   * @param {string} walletAddress
   * @param {object} profile
   */
  static updateProfile(walletAddress, signature, profile, email) {
    const params = {
      walletAddress,
      profile,
      signature,
      email,
      action: 'updateProfile',
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * Update user default profile
   */
  static updateProfileDefaultPage(username, signature, default_user_page) {
    const params = {
      username,
      default_user_page,
      signature,
      action: 'UpdateDefaultPage',
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  /**
   * Upload an image to server
   * @param {string} walletAddress
   * @param {object} image
   */
  static uploadImage(walletAddress, signature, image, type) {
    const formData = new FormData()
    formData.append('file', image)
    formData.append('action', 'uploadImage')
    formData.append('imageFor', type)
    formData.append('walletAddress', walletAddress)
    formData.append('signature', signature)
    const headers = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, formData, headers)
        .then((response) => resolve(response.data.data))
        .catch((error) => reject(error))
    })
  }

  /**
   * Fetch all tokens
   */
  static fetchAllNFT(offset, limit) {
    const params = {
      action: 'getAllTokens',
      offset,
      limit,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * Fetch all bids
   */
  static fetchAllBids(offset, limit, username, signature) {
    const params = {
      action: 'getUserBiddedTokens',
      offset,
      limit,
      username,
      signature,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * Fetch all bids
   */
  static fetchSingleBids(tokenId, contractAddress, username, signature) {
    const params = {
      action: 'getUserBiddedTokenDetails',
      tokenId,
      contractAddress,
      username,
      signature,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * Fetch all tokens
   */
  static fetchNftWithFilter(offset, limit, sort, filter) {
    const params = {
      action: 'getFilteredAndSortedToken',
      offset,
      limit,
      sort,
      filter,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * Fetch all tokens
   */
  static fetchTrendingAuctions(limit) {
    const params = {
      action: 'getTrendingAuctions',
      limit,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * Fetch genesis tokens
   */
  static fetchGenesisNft(limit, offset) {
    const params = {
      action: 'getGenesisNft',
      limit,
      offset,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * Fetch trending collections
   */
  static fetchTrendingCollections(pagination) {
    const params = {
      action: 'getTrendingCollections',
      pagination,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * Fetch all tokens
   */
  static fetchFeaturedNft(limit) {
    const params = {
      action: 'getTrendingNft',
      limit,
      offset: 0,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  /**
   * Fetch token
   */
  static fetchNFT(tokenId, contractAddress, username, signature) {
    const params = {
      action: 'getTokenDetails',
      tokenId,
      contractAddress,
      username,
      signature,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  /**
   * Fetch token history
   */
  static fetchNFTHistory(tokenId, contractAddress, offset) {
    const params = {
      action: 'getTokenHistory',
      tokenId,
      contractAddress,
      offset,
      limit: 20,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  /**
   * Fetch categories
   */
  static fetchCategories() {
    const params = {
      action: 'getCategories',
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  /**
   * Fetch User profile
   */
  static fetchUserProfile(username) {
    const params = {
      action: 'getProfile',
      username,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  /**
   * check if username exist
   */
  static checkUsername(username) {
    const params = {
      action: 'checkUsername',
      username,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  /**
   * Fetch collected tokens
   */
  static fetchMyCollections(username, offset, limit, sort, filter) {
    const params = {
      action: 'getMyCollectedTokens',
      username,
      offset,
      limit,
      sort,
      filter,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  /**
   * Fetch created tokens
   */
  static fetchMyCreations(username, offset, limit, sort, filter) {
    const params = {
      action: 'getMyCreatedTokens',
      username,
      offset,
      limit,
      sort,
      filter,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * Fetch hidden tokens
   */
  static fetchHiddenTokens(username, signature, offset, limit) {
    const params = {
      action: 'getHiddenTokens',
      username,
      signature,
      offset,
      limit,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * Fetch splited tokens
   */
  static fetchMySplits(username, offset, limit, sort, filter) {
    const params = {
      action: 'getSplits',
      username,
      offset,
      limit,
      sort,
      filter,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  /**
   * Upload an image to server
   * @param {string} walletAddress
   * @param {object} image
   */
  static createNFT(walletAddress, name, description, image, cryptoType, signature, properties) {
    const formData = new FormData()
    formData.append('file', image)
    formData.append('action', 'createNFT')
    formData.append('name', name)
    formData.append('description', description)
    formData.append('walletAddress', walletAddress)
    // formData.append("price", price.toString());
    // formData.append("royalty", royalty);
    // formData.append("isOnBuy", isOnBuy);
    formData.append('cryptoType', cryptoType)
    formData.append('signature', signature)
    formData.append('properties', properties)

    const headers = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, formData, headers)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  /**
   * Fetch drops NFT
   */
  static fetchNFTDrop(limit, tokenIds) {
    const params = {
      action: 'getDrops',
      limit,
      tokenIds,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => reject(error))
    })
  }

  /**
   * check if email id exist
   */
  static checkEmail(email) {
    const params = {
      action: 'checkEmail',
      email,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  /**
   * saves the nft
   */
  static saveNFT(username, tokenId, transactionId, signature, walletSource, hash) {
    const params = {
      action: 'saveNFT',
      username,
      tokenId,
      transactionId,
      signature,
      walletSource,
      hash,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  /**
   * saves minting transaction
   */
  static saveMintingTransaction(
    username,
    metadata,
    transactionId,
    tokenType,
    signature,
    hash,
    category,
    splits,
    collectionUsername,
    properties,
  ) {
    const params = {
      action: 'saveMintingTransaction',
      username,
      metadata,
      transactionId,
      tokenType,
      signature,
      hash,
      category,
      splits,
      collectionUsername,
      properties,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * list the token on sale
   */
  static listTokenOnSale(tokenId, contractAddress, price, currencyId, username, signature, royalty, walletSource) {
    const params = {
      action: 'putOnSale',
      tokenId,
      contractAddress,
      price: price.toString(),
      currencyId,
      username,
      signature,
      royalty: royalty.toString(),
      walletSource,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * list the token on sale
   */
  static listTokenOnAuction(tokenId, contractAddress, price, currencyId, username, signature, royalty, walletSource) {
    const params = {
      action: 'putOnAuction',
      tokenId,
      contractAddress,
      currencyId,
      price: price.toString(),
      username,
      signature,
      royalty: royalty.toString(),
      walletSource,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  /**
   * store the buy record
   */
  static buyToken(tokenId, contractAddress, price, username, signature, walletSource, transactionId) {
    const params = {
      action: 'buyToken',
      tokenId,
      contractAddress,
      price: price.toString(),
      username,
      signature,
      walletSource,
      transactionId,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * Place a bid
   */
  static placeBid(tokenId, contractAddress, price, username, signature, walletSource, transactionId) {
    const params = {
      action: 'placeBid',
      tokenId,
      contractAddress,
      price: price.toString(),
      username,
      signature,
      walletSource,
      transactionId,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * Check user bid status
   */
  static checkUserBidStatus(tokenId, username) {
    const params = {
      action: 'checkUserBidStatus',
      tokenId,
      username,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * claim token
   */
  static claimToken(tokenId, contractAddress, username, signature, walletSource) {
    const params = {
      action: 'claimAuction',
      tokenId,
      contractAddress,
      username,
      signature,
      walletSource,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * follow an user the buy record
   */
  static followUser(username, following, signature) {
    Mixpanel.track(MixpanelEvents.FOLLOW_USER, {
      username,
      following,
      signature,
    })
    const params = {
      action: 'followUser',
      username,
      following,
      signature,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  /**
   * un follow an user the buy record
   */
  static unFollowUser(username, following, signature) {
    Mixpanel.track(MixpanelEvents.UN_FOLLOW_USER, {
      username,
      following,
      signature,
    })
    const params = {
      action: 'unFollowUser',
      username,
      following,
      signature,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  /**
   * get list of all followers
   */
  static getUserFollowers(username) {
    const params = {
      action: 'getFollowers',
      username,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  static getMyOffers(username, offset, limit) {
    const params = {
      action: 'getMyOffers',
      username,
      offset,
      limit,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  static getReceivedOffer(username, offset, limit) {
    const params = {
      action: 'getReceivedOffer',
      username,
      offset,
      limit,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  static acceptOffer(offerId, tokenId, contractAddress, currencyId, username, signature, transactionId) {
    const params = {
      action: 'acceptOffer',
      offerId,
      tokenId,
      contractAddress,
      currencyId,
      username,
      signature,
      transactionId,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  static cancelOffer(offerId, username, signature) {
    const params = {
      action: 'cancelOffer',
      offerId: offerId,
      username: username,
      signature: signature,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  static settleOffer(offerId, tokenId, contractAddress, username, signature, price, walletSource) {
    const params = {
      action: 'settleOffer',
      offerId,
      contractAddress,
      username,
      tokenId,
      signature,
      price,
      walletSource,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  static cancelAcceptedOffer(offerId, tokenId, contractAddress, username, signature) {
    const params = {
      action: 'cancelAcceptedOffer',
      offerId: offerId,
      tokenId,
      contractAddress,
      username: username,
      signature: signature,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  /**
   * get list of all followers details
   */
  static getUserFollowersDetails(username, offset, limit) {
    const params = {
      action: 'getDetailsFollowers',
      username,
      offset,
      limit,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  /**
   * get list of all followings
   */
  static getUserFollowings(username) {
    const params = {
      action: 'getFollowings',
      username,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  /**
   * get list of all followers details
   */
  static getUserFollowingsDetails(username, offset, limit) {
    const params = {
      action: 'getDetailsFollowings',
      username,
      offset,
      limit,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  /**
   * get list of all Creator Referred Users
   */
  static getCreatorReferredUsers(username, signature, offset, limit) {
    const params = {
      action: 'getCreatorReferredUsers',
      username,
      signature,
      offset,
      limit,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * get list of all Collectors Referred Users
   */
  static getCollectorReferredUsers(username, signature, offset, limit) {
    const params = {
      action: 'getCollectorReferredUsers',
      username,
      signature,
      offset,
      limit,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  /**
   * get terms and conditions
   */
  static getTermsAndCondition() {
    const params = {
      action: 'getTermsAndConditions',
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  /**
   * get community guidelines
   */
  static getCommunityGuidelines() {
    const params = {
      action: 'getCommunityGuidelines',
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * get view count of token
   */
  static getViewCount(tokenId) {
    const params = {
      action: 'getNFTViews',
      tokenId,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * increase view count of token
   */
  static postViewCount(tokenId, contractAddress, username) {
    const params = {
      action: 'postNFTViews',
      tokenId,
      contractAddress,
      ...(!!username && { username }),
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * get all creators
   */
  static fetchCreators(offset, limit, username) {
    const params = {
      action: 'getCreators',
      offset,
      limit,
      ...(!!username && { username }),
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * get all feed
   */
  static fetchFeed(offset, limit, username, signature) {
    const params = {
      action: 'getNewsFeed',
      offset,
      limit,
      username,
      signature,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * get all  trending creators
   */
  static fetchTrendingCreators(offset, limit) {
    const params = {
      action: 'getTrendingCreators',
      offset,
      limit,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * get all  trending collectors
   */
  static fetchTrendingCollectors(offset, limit) {
    const params = {
      action: 'getTrendingCollectors',
      offset,
      limit,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * get all feed with filters
   */
  static fetchFeedWithFilters(offset, limit, username, signature, sort, filter) {
    Mixpanel.track(MixpanelEvents.FILTER_LISTING, {
      offset,
      limit,
      username,
      sort,
      filter,
      type: 'Feeds',
    })
    const params = {
      action: 'getFilteredAndSortedNewsFeed',
      offset,
      limit,
      username,
      signature,
      sort,
      filter,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  /**
   * get all creators with filters
   */
  static fetchCreatorsWithFilters(offset, limit, username, sort, filter) {
    Mixpanel.track(MixpanelEvents.FILTER_LISTING, {
      offset,
      limit,
      username,
      sort,
      filter,
      type: 'creators',
    })
    const params = {
      action: 'getSortedAndFilteredCreators',
      offset,
      limit,
      ...(!!username && { username }),
      sort,
      filter,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * get all profile
   */
  static fetchSortedANdFilteredPeople(offset, limit, sort, filter) {
    Mixpanel.track(MixpanelEvents.FILTER_LISTING, {
      offset,
      limit,
      sort,
      filter,
    })
    const params = {
      action: 'getSortedAndFilteredPeople',
      offset,
      limit,
      sort,
      filter,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  /**
   * get all collection for filter
   */
  static fetchCollectionsforFilter(offset, limit, collectionUsername, collectionUsernames) {
    Mixpanel.track(MixpanelEvents.COLLECTIONS_FILTER, {
      offset,
      limit,
      collectionUsername,
      collectionUsernames,
      type: 'collectionsFilter',
    })
    const params = {
      action: 'getCollectionWithUsername',
      offset,
      limit,
      collectionUsername,
      collectionUsernames,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  /**
   * get all collectors with filters
   */
  static getSortedAndFilteredCollectors(offset, limit, username, sort, filter) {
    const params = {
      action: 'getSortedAndFilteredCollectors',
      offset,
      limit,
      ...(!!username && { username }),
      sort,
      filter,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  /**
   * burn token
   */
  static burnToken(tokenId, contractAddress, username, signature) {
    Mixpanel.track(MixpanelEvents.BURN_TOKEN, {
      tokenId,
      username,
      signature,
    })
    const params = {
      action: 'burnToken',
      tokenId,
      contractAddress,
      username,
      signature,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * cancel sale
   */
  static cancelSale(tokenId, contractAddress, username, signature) {
    Mixpanel.track(MixpanelEvents.CANCEL_SALE, {
      tokenId,
      username,
      signature,
    })
    const params = {
      action: 'cancelSale',
      tokenId,
      contractAddress,
      username,
      signature,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * cancel auction
   */
  static cancelAuction(tokenId, contractAddress, username, signature) {
    Mixpanel.track(MixpanelEvents.CANCEL_AUCTION, {
      tokenId,
      username,
      signature,
    })
    const params = {
      action: 'cancelAuction',
      tokenId,
      contractAddress,
      username,
      signature,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * update price
   */
  static updateTokenSalePrice(tokenId, contractAddress, price, username, signature, walletSource) {
    Mixpanel.track(MixpanelEvents.UPDATE_TOKEN_SALE_PRICE, {
      tokenId,
      price,
      username,
      signature,
      walletSource,
    })
    const params = {
      action: 'updateTokenSalePrice',
      tokenId,
      contractAddress,
      price,
      username,
      signature,
      walletSource,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * update price
   */
  static updateTokenAuctionPrice(tokenId, contractAddress, price, username, signature, walletSource) {
    Mixpanel.track(MixpanelEvents.UPDATE_TOKEN_AUCTION_PRICE, {
      tokenId,
      price,
      username,
      signature,
      walletSource,
    })
    const params = {
      action: 'updateAuctionPrice',
      tokenId,
      contractAddress,
      price,
      username,
      signature,
      walletSource,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  static updateAllReadNotification(username, signature) {
    const params = {
      action: 'updateAllReadNotification',
      username,
      signature,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  static updateReadNotification(username, signature, id) {
    const params = {
      action: 'updateReadNotification',
      username: username,
      signature,
      id: id,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  static getNotification(username, signature, offset, limit) {
    const params = {
      action: 'getAllNotificationBasedOnUsername',
      username,
      signature,
      limit,
      offset,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  static makeOffer(username, signature, tokenId, contractAddress, price, currencyId) {
    const params = {
      action: 'makeOffer',
      username,
      signature,
      tokenId,
      contractAddress,
      price,
      currencyId,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  static getTokenOffers(tokenId, contractAddress) {
    const params = {
      action: 'getTokenOffers',
      tokenId,
      contractAddress,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  static getNotificationUnRead(username, signature) {
    const params = {
      action: 'getAllUnreadNotificationBasedOnUsername',
      username,
      signature,
      limit: 1000,
      offset: 0,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  static getNotificationCount(username, signature) {
    const params = {
      action: 'countNotification',
      username,
      signature,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  static getBanner() {
    const params = {
      action: 'getBanner',
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  static fetchCollectorGuideline() {
    const params = {
      action: 'getCollectorsGuideline',
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  static fetchCreatorGuideline() {
    const params = {
      action: 'getCreatorsGuideline',
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  static getUsername(username) {
    const params = {
      action: 'getUserWithUsername',
      username,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  static getBannerMessage() {
    const params = {
      action: 'getBannerMessage',
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  static transferNFT(tokenId, contractAddress, username, signature, walletAddress) {
    const params = {
      action: 'transferNFT',
      tokenId,
      contractAddress,
      username,
      signature,
      walletAddress,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  static acceptReferralInvite(username, signature, invite) {
    const params = {
      action: 'acceptInvite',
      username,
      signature,
      invite,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  static sendReferralInvite(username, signature, invites) {
    const params = {
      action: 'sendReferralInvite',
      username,
      signature,
      invites,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  /**
   * Create collection
   */
  static createCollection(body) {
    const params = {
      action: 'createCollection',
      ...body,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * Update collection
   */
  static updateCollection(body) {
    const params = {
      action: 'updateCollection',
      ...body,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * Delete collection
   */
  static deleteCollection(body) {
    const params = {
      action: 'deleteCollection',
      ...body,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * fetch collection
   */
  static fetchMyCollection(username, offset, limit) {
    const params = {
      action: 'getMyCollections',
      username,
      offset,
      limit,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * fetch  with username
   */
  static getAllCollectionsFromUsername(username) {
    const params = {
      action: 'getAllMyCollections',
      username,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * fetch collection profile
   */
  static getCollectionProfile(collectionUsername) {
    const params = {
      action: 'getCollection',
      collectionUsername,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * fetch collection properties
   */
  static getCollectionProperties(collectionUsername) {
    const params = {
      action: 'getCollectionProperty',
      collectionUsername,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * fetch collection tokens
   */
  static getCollectionTokens(collectionUsername, offset, limit, filter, sort, propertyFilter) {
    const params = {
      action: 'getCollectionTokens',
      collectionUsername,
      offset,
      limit,
      filter,
      sort,
      propertyFilter,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * check collection name
   */
  static checkCollectionUsername(collectionUsername) {
    const params = {
      action: 'checkCollectionUsername',
      collectionUsername: collectionUsername,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * Hide token
   */
  static hideToken(username, signature, tokenId, contractAddress) {
    const params = {
      action: 'hideToken',
      username,
      signature,
      tokenId,
      contractAddress,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * Un hide token
   */
  static unHideToken(username, signature, tokenId, contractAddress) {
    const params = {
      action: 'unHideToken',
      username,
      signature,
      tokenId,
      contractAddress,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * move NFT to collection token
   */
  static moveTokenToCollection(username, signature, tokenId, collectionUsername, properties) {
    const params = {
      action: 'moveTokenToCollection',
      username,
      signature,
      tokenId,
      collectionUsername,
      properties,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * fetch collection rankings
   */
  static fetchCollectionRankings(offset, limit, duration, badges) {
    const params = {
      action: 'getCollectionRankings',
      offset,
      limit,
      duration,
      badges,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * remove token from collection
   */
  static removeTokenFromCollection(username, signature, tokenId) {
    const params = {
      action: 'removeFromCollection',
      username,
      signature,
      tokenId,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * remove token from collection
   */
  static fetchCollectionActivity(limit, offset, filters) {
    const params = {
      action: 'getActivityHistory',
      limit,
      offset,
      filters,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * freeze token properties
   */
  static freezeTokenProperties(username, signature, tokenId) {
    const params = {
      action: 'freezeProperties',
      username,
      signature,
      tokenId,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * fetch Activity chart data
   */
  static fetchActivityChartData(filters) {
    const params = {
      action: 'statsCollectionActivity',
      filters,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  /**
   * fetch collection roadmap
   */
  static fetchCollectionRoadmap(collectionUsername) {
    const params = {
      action: 'getCollectionRoadmap',
      collectionUsername,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  /**
   * update collection roadmap
   */
  static updateCollectionRoadmap(username, signature, collectionUsername, roadmap) {
    const params = {
      action: 'updateCollectionRoadmap',
      username,
      signature,
      collectionUsername,
      roadmap,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  /**
   * update collection contract address
   */
  static updateCollectionContractAddress(username, signature, collectionUsername, contractAddress) {
    const params = {
      action: 'setCollectionContract',
      username,
      signature,
      collectionUsername,
      contractAddress,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }

  /**
   * get featured collection
   */
  static getFeaturedCollections() {
    const params = {
      action: 'getFeaturedCollections',
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * get External Collections List
   */
  static getExternalCollections(offset, limit, sort, filters) {
    const params = {
      action: 'getExternalCollections',
      offset,
      limit,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response?.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * get launchpad collections
   */
  static getLaunchpadCollections(offset, limit, filter) {
    const params = {
      action: 'getLaunchpadCollections',
      offset,
      limit,
      filter,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response?.data))
        .catch((error) => reject(error))
    })
  }
  /**
   * get all collections
   */
  static getAllCollections(offset, limit, sort, filter) {
    const params = {
      action: 'getAllCollections',
      offset,
      limit,
      sort,
      filter,
    }
    return new Promise((resolve, reject) => {
      axios
        .post(api, params)
        .then((response) => resolve(response?.data))
        .catch((error) => reject(error))
    })
  }
}

export default API
