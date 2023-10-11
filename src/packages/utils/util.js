import _ from 'loadsh'
import { v4 as uuidv4 } from 'uuid';

export const cloneDeep = (value) => {
  return _.cloneDeep(value)
  // return window.structuredClone(value)
}

export const createUuid = uuidv4

export const createZIndex = () => {
  let zIndex = 1
  return () => {
    return ++zIndex
  }
}

 // 找到的某一条数据
export const findOneBlock = (parent = [], arr, callback) => {
  let block = null
  if (!parent.length) return block
  parent.reduce((acur, cur, index, arr) => {
    let obj = acur.find(block => block.uuid === cur)
    callback && callback(obj)
    if (index === arr.length - 1) {
      block = obj
      return obj
    } else {
      return obj.children
    }
  },arr)
  return block
}

