import axios from 'axios'
import _ from 'lodash'
import moment from 'moment'
export function Cache({ store, timeout }) {
  async function _get(url) {
    let res = await axios.get(url)
    return res.data
  }
  async function getAndSet(url, format, time) {
    let res = await _get(url)
    await store.setItem(url, {
      expire: parseInt(moment().format('x')) + parseInt(timeout),
      data: format(res)
    })
    await delay(time)
    return store.getItem(url)
  }
  function delay(t) {
    console.log('waiting for: ' + t)
    return new Promise(function(resolve) {
      setTimeout(resolve, t)
    })
  }
  return {
    async get(url, format, time = 50) {
      try {
        let value = await store.getItem(url)
        if (value !== null) {
          if (value.expire > parseInt(moment().format('x'))) {
            return value.data
          } else {
            let newSet = await getAndSet(url, format, time)
            return newSet.data
          }
        } else {
          let newSet = await getAndSet(url, format, time)
          return newSet.data
        }
      } catch (error) {
        return console.log(error)
      }
    },

    async getFromStore(url) {
      return store.getItem('[all]' + url)
    },
    async getFollow(url, urlField, urlCheckField, format, time) {
      let initial = await this.get(url, format)
      let collect = async (prev, total) => {
        total = total || []
        total.push(prev.data)
        if (!prev[urlCheckField]) {
          return _.flatten(total)
        }
        let res = await this.get(prev[urlField], format, time)
        return collect(res, total)
      }
      return collect(initial)
    }
  }
}
