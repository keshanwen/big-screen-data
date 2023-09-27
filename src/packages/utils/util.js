import _ from 'loadsh'
import { v4 as uuidv4 } from 'uuid';

export const cloneDeep = (value) => {
  return _.cloneDeep(value)
}

export const createUuid = uuidv4