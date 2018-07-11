import stdrpc from 'stdrpc'

import getStore from 'state/getStore'

const errorf = (err) => {
  console.warn(err)
  return err
}

class Client {
  constructor() {
    this.store = getStore()
    const { client_config, auth } = this.store.getState()
    this.rpc = stdrpc({
      ...auth,
      ...client_config,
    })
  }

  start() {
    this.z_gettotalbalance()
    this.z_listaddresses()
  }

  z_gettotalbalance() {
    return this.rpc.z_gettotalbalance().then((info) => {
      this.store.dispatch({
        type: 'Z_GETTOTALBALANCE',
        info
      })
    }).catch(errorf)
  }

  z_listaddresses() {
    return this.rpc.z_listaddresses().then((addresses) => {
      this.store.dispatch({
        type: 'Z_LISTADDRESSES',
        addresses
      })
    }).catch(errorf)
  }

  z_getbalance(address) {
    return this.rpc.z_getbalance(address).then((amount) => {
      this.store.dispatch({
        type: 'Z_GETBALANCE',
        address,
        amount
      })
    }).catch(errorf)
  }

  z_sendmany(from, amounts, minconf=1, fee=0.0001) {
    // console.warn(from, amounts, minconf, fee)
    return this.rpc.z_sendmany(
      from, amounts, minconf, fee
    ).catch(errorf)
  }

  z_shieldcoinbase(from, to) {
    return this.rpc.z_shieldcoinbase(from, to).then((result) => {
      store.dispatch({
        type: 'Z_SHIELDCOINBASE',
        result
      })
    }).catch(errorf)
  }
}

// export default new Client()
export default Client
