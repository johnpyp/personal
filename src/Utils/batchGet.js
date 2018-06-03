import axios from 'axios'
import _ from 'lodash'
import moment from 'moment'
export function Cache({ store, timeout }) {
  async function _get(url) {
    let res = await axios.get(url)
    return res.data
  }
  async function getAndSet(url, format) {
    let res = await _get(url)
    await store.setItem(url, {
      expire: parseInt(moment().format('x')) + parseInt(timeout),
      data: format(res)
    })
    return store.getItem(url)
  }

  async function asyncIterate(promises, myDelay) {
    function delay(t) {
      return new Promise(function(resolve) {
        setTimeout(resolve, t)
      })
    }
    let funcs = _.map(promises, promise => () =>
      Promise.all([promise, delay(myDelay)])
    )
    return funcs.reduce(
      (promise, func) =>
        promise.then(result => {
          console.log('we goin bois')
          return func().then(Array.prototype.concat.bind(result))
        }),
      Promise.resolve([])
    )
  }
  return {
    async get(url, format, optionalTimeout) {
      try {
        let value = await store.getItem(url)
        if (value !== null) {
          if (value.expire > parseInt(moment().format('x'))) {
            return value.data
          } else {
            let newSet = await getAndSet(url, format)
            return newSet.data
          }
        } else {
          let newSet = await getAndSet(url, format)
          return newSet.data
        }
      } catch (error) {
        return console.log(error)
      }
    },
    async batchGet(urls, format, flatten, time = 50) {
      let res = await asyncIterate(
        _.map(urls, url => this.get(url, format)),
        time
      )
      res = res.filter(x => x)
      console.log(res, flatten)
      if (flatten) {
        console.log(_.flatten(res))
        await store.setItem('[all]' + urls[0], _.flatten(res))
        return store.getItem('[all]' + urls[0])
      } else {
        await store.setItem('[all]' + urls[0], res)
        return store.getItem('[all]' + urls[0])
      }
    }
  }
}
