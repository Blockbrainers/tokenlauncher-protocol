const fs = require('fs')
import { TokenFactoryNetwork } from './hardhat.config'

export enum TokenFactoryConfigProperty {
  TokenFactoryAddress = 'TokenFactoryAddress',
}

const loadJSON = (network: TokenFactoryNetwork) => {
  const filename = getFilename(network)
  return fs.existsSync(filename) ? fs.readFileSync(filename).toString() : '{}'
}

const saveJSON = (network: TokenFactoryNetwork, json = '') => {
  const filename = getFilename(network)
  return fs.writeFileSync(filename, JSON.stringify(json, null, 2))
}

export const get = (network: TokenFactoryNetwork, property: TokenFactoryConfigProperty) => {
  const obj = JSON.parse(loadJSON(network))
  return obj[property] || 'Not found'
}

export const set = (network: TokenFactoryNetwork, property: TokenFactoryConfigProperty, value: string) => {
  const obj = JSON.parse(loadJSON(network) || '{}')
  obj[property] = value
  saveJSON(network, obj)
}

export const remove = (network: TokenFactoryNetwork, property: TokenFactoryConfigProperty) => {
  const obj = JSON.parse(loadJSON(network) || '{}')
  delete obj[property]
  saveJSON(network, obj)
}

const getFilename = (network: TokenFactoryNetwork) => `${__dirname}/tokenFactory.config_${network}.json`
