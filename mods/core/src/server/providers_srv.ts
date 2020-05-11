export {}

const { FonosAuthError } = require('@fonos/errors')
const AppManagerPB = require('./protos/appmanager_pb')
const routr = require('./routr')
const redis = require('./redis')
const grpc = require('grpc')
const logger = require('../common/logger')
const providerDecoder = require('../common/decoders/provider_decoder')
const { Empty } = require('./protos/common_pb')
const { ListProvidersResponse } = require('./protos/providers_pb')
const { REncoder, Kind } = require('../common/resource_encoder')
const { auth } = require('../common/trust_util')

const listProviders = async (call, callback) => {
  if (!auth(call)) return callback(new FonosAuthError())
 
  if (!call.request.getPageToken()) {
    // Nothing to send
    callback(null, new ListProvidersResponse())
    return
  }

  const page = parseInt(call.request.getPageToken()) + 1
  const itemsPerPage = call.request.getPageSize()

  await routr.connect()
  const result = await routr
    .resourceType('gateways')
    .list({ page, itemsPerPage })
  const providers = result.data

  const response = new ListProvidersResponse()

  for (const jsonObj in providers) {
    const provider = providerDecoder(jsonObj)
    response.addProviders(provider)
  }

  if (providers.length > 0) response.setNextPageToken('' + (page + 1))

  callback(null, response)
}

const createProvider = async (call, callback) => {
  if (!auth(call)) return callback(new FonosAuthError())

  const provider = call.request.getProvider()

  logger.info(
    'verbose',
    `@fonos/core createProvider [entity ${provider.getName()}]`
  )

  let encoder = new REncoder(Kind.GATEWAY, provider.getName())
    .withCredentials(provider.getUsername(), provider.getSecret())
    .withHost(provider.getHost())
    .withTransport(provider.getTransport())
    .withExpires(provider.getExpires())

  const resource = encoder.build()

  logger.log(
    'debug',
    `@fonos/core createProvider [resource: ${JSON.stringify(resource)}]`
  )

  try {
    await routr.connect()
    const ref = await routr.resourceType('gateways').create(resource)
    // We do this to get updated metadata from Routr
    const jsonObj = await routr.resourceType('gateways').get(ref)
    callback(null, providerDecoder(jsonObj))
  } catch (err) {
    return callback(err)
  }
}

const getProvider = async (call, callback) => {
  if (!auth(call)) return callback(new FonosAuthError())

  const providerRef = call.request.getRef()

  logger.info('verbose', `@fonos/core getProvider [ref ${providerRef}]`)

  try {
    await routr.connect()
    const jsonObj = await routr.resourceType('gateways').get(providerRef)
    callback(null, providerDecoder(jsonObj))
  } catch (err) {
    return callback(err)
  }
}

const updateProvider = async (call, callback) => {
  if (!auth(call)) return callback(new FonosAuthError())

  const provider = call.request.getProvider()

  logger.info(
    'verbose',
    `@fonos/core updateProvider [entity ${provider.getName()}]`
  )

  let encoder = new REncoder(
    Kind.GATEWAY,
    provider.getName(),
    provider.getRef()
  )
    .withMetadata({
      createdOn: provider.getCreateTime(),
      modifiedOn: provider.getUpdateTime()
    })
    .withCredentials(provider.getUsername(), provider.getSecret())
    .withHost(provider.getHost())
    .withTransport(provider.getTransport())
    .withExpires(provider.getExpires())

  const resource = encoder.build()

  logger.log(
    'debug',
    `@fonos/core updateProvider [resource: ${JSON.stringify(resource)}]`
  )

  try {
    await routr.connect()
    const ref = await routr.resourceType('gateways').update(resource)
    // We do this to get updated metadata from Routr
    const jsonObj = await routr.resourceType('gateways').get(ref)
    callback(null, providerDecoder(jsonObj))
  } catch (err) {
    return callback(err)
  }
}

const deleteProvider = async (call, callback) => {
  if (!auth(call)) return callback(new FonosAuthError())

  const providerRef = call.request.getRef()

  logger.info('verbose', `@fonos/core deleteProvider [ref ${providerRef}]`)

  try {
    await routr.connect()
    await routr.resourceType('gateways').delete(providerRef)
    callback(null, new Empty())
  } catch (err) {
    return callback(err)
  }
}

module.exports.listProviders = listProviders
module.exports.createProvider = createProvider
module.exports.getProvider = getProvider
module.exports.deleteProvider = deleteProvider
module.exports.updateProvider = updateProvider