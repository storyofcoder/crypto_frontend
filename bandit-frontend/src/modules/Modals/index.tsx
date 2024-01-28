import React from 'react'
// import { initStore } from "../../config/store";
import { theme } from '../../config/styleSystem'
import SimplexModal from './Simplex'
import SignUpModal from './SignUpModal'
import ViewInvitiees from './ViewInvitees'
import WalletNotFound from './WalletNotFound'
import WrongNetwork from './WrongNetwork'
import { dialog } from '../../components/molecules/Dialog/Dialog'
import BurnConfirmation from './Burn'
import CancelSale from './CancelSale'
import Bidding from './Bidding'
import FollowingList from './FollowingList'
import ConnectWalletModal from './ConnectWallet/ConnectWalletModal'
import ListForSale from './ListForSale'
import UpdateTokenPrice from './UpdateTokenPrice'
import VideoPlayer from './VideoPlayer'
import NotEnoughBalanceModal from './NotEnoughBalanceModal'
import MakeAnOffer from './MakeAnOffer'
import TransferToken from './TransferToken'
import AccountChangeDetected from './AccountChangeDetected'
import TxLoading from './TxLoading'
import CancelAcceptedOffer from './CancelAcceptedOffer'
import InviteUser from './InviteUser'
import MoveTokenToCollection from './MoveTokenToCollection'
import EditNFT from './EditCollection'
import DeployCollection from './DeployCollection'
import RevealContract from './RevealContract'
import MintSuccess from './MintSuccess'
import WithdrawFundsFromContract from './WithdrawFundsFromContract'
import ConvertTokens from './ConvertTokens'
import { store } from '../../config/store'
import AddOrEditPhase from '../../views/CreateCollection/DeployCollection/AddOrEditPhase'
import MintConfirm from "./MintConfirm";

export const MODAL = {
  NOT_ENOUGH_BALANCE: 'NOT_ENOUGH_BALANCE',
  SIMPLEX: 'SIMPLEX',
  SIGNUP: 'SIGNUP',
  VIEW_INVITEES: 'VIEW_INVITEES',
  WALLET_NOT_FOUND: 'WALLET_NOT_FOUND',
  WRONG_NETWORK: 'WRONG_NETWORK',
  BURN_CONFIRMATION: 'BURN_CONFIRMATION',
  CANCEL_SALE: 'CANCEL_SALE',
  BIDDING: 'BIDDING',
  PROFILE_STATS: 'PROFILE_STATS',
  CONNECT_WALLET: 'CONNECT_WALLET',
  LIST_FOR_SALE: 'LIST_FOR_SALE',
  UPDATE_TOKEN_PRICE: 'UPDATE_TOKEN_PRICE',
  VIDEO_PLAYER: 'VIDEO_PLAYER',
  MAKE_OFFER: 'MAKE_OFFER',
  TRANSFER_TOKEN: 'TRANSFER_TOKEN',
  TX_LOADING: 'TX_LOADING',
  ACCOUNT_CHANGE_DETECTED: 'ACCOUNT_CHANGE_DETECTED',
  CANCEL_ACCEPTED_OFFER: 'CANCEL_ACCEPTED_OFFER',
  INVITE_USER: 'INVITE_USER',
  MOVE_TOKEN_TO_COLLECTION: 'MOVE_TOKEN_TO_COLLECTION',
  EDIT_NFT: 'EDIT_NFT',
  DEPLOY_COLLECTION: 'DEPLOY_COLLECTION',
  REVEAL_CONTRACT: 'REVEAL_CONTRACT',
  WITHDRAW_FUNDS: 'WITHDRAW_FUNDS',
  CONVERT_TOKENS: 'CONVERT_TOKENS',
  ADD_PHASE: 'ADD_PHASE',
  MINT_SUCCESS: 'MINT_SUCCESS',
  MINT_CONFIRM: 'MINT_CONFIRM',
}

// const { dispatch } = initStore();

export const showModal = (modal, props?, modalProps?) => {
  const dispatch = store.dispatch
  const { bodyStyle, ...restModalProps } = modalProps || {}
  let whichModal = null
  switch (modal) {
    case MODAL.NOT_ENOUGH_BALANCE:
      whichModal = NotEnoughBalanceModal
      break
    case MODAL.SIMPLEX:
      whichModal = SimplexModal
      break
    case MODAL.SIGNUP:
      whichModal = SignUpModal
      break
    case MODAL.WALLET_NOT_FOUND:
      whichModal = WalletNotFound
      break
    case MODAL.WRONG_NETWORK:
      whichModal = WrongNetwork
      break
    case MODAL.BURN_CONFIRMATION:
      whichModal = BurnConfirmation
      break
    case MODAL.CANCEL_SALE:
      whichModal = CancelSale
      break
    case MODAL.BIDDING:
      whichModal = Bidding
      break
    case MODAL.PROFILE_STATS:
      whichModal = FollowingList
      break
    case MODAL.CONNECT_WALLET:
      whichModal = ConnectWalletModal
      break
    case MODAL.LIST_FOR_SALE:
      whichModal = ListForSale
      break
    case MODAL.UPDATE_TOKEN_PRICE:
      whichModal = UpdateTokenPrice
      break
    case MODAL.VIDEO_PLAYER:
      whichModal = VideoPlayer
      break
    case MODAL.MAKE_OFFER:
      whichModal = MakeAnOffer
      break
    case MODAL.TRANSFER_TOKEN:
      whichModal = TransferToken
      break
    case MODAL.ACCOUNT_CHANGE_DETECTED:
      whichModal = AccountChangeDetected
      break
    case MODAL.TX_LOADING:
      whichModal = TxLoading
      break
    case MODAL.CANCEL_ACCEPTED_OFFER:
      whichModal = CancelAcceptedOffer
      break
    case MODAL.INVITE_USER:
      whichModal = InviteUser
      break
    case MODAL.VIEW_INVITEES:
      whichModal = ViewInvitiees
      break
    case MODAL.MOVE_TOKEN_TO_COLLECTION:
      whichModal = MoveTokenToCollection
      break
    case MODAL.EDIT_NFT:
      whichModal = EditNFT
      break
    case MODAL.DEPLOY_COLLECTION:
      whichModal = DeployCollection
      break
    case MODAL.REVEAL_CONTRACT:
      whichModal = RevealContract
      break
    case MODAL.WITHDRAW_FUNDS:
      whichModal = WithdrawFundsFromContract
      break
    case MODAL.CONVERT_TOKENS:
      whichModal = ConvertTokens
      break
    case MODAL.ADD_PHASE:
      whichModal = AddOrEditPhase
      break
    case MODAL.MINT_SUCCESS:
      whichModal = MintSuccess
      break
    case MODAL.MINT_CONFIRM:
      whichModal = MintConfirm
      break
    default:
      whichModal = null
  }

  dispatch(
    dialog.actions.show({
      Component: whichModal,
      componentProps: props,
      footer: null,
      bodyStyle: {
        backgroundColor: theme.colors.backgroundAlt,
        borderRadius: '10px',
        ...bodyStyle,
      },
      ...restModalProps,
    }),
  )
}

export const hideModal = () => {
  // @ts-ignore
  dispatch(dialog.actions.hide())
}
