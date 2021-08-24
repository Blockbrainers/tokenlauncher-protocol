import { task } from 'hardhat/config'
import { get, set, TokenFactoryConfigProperty } from '../configManager'
import { TokenFactoryNetwork } from '../hardhat.config'
// import { getLogParameter } from '../utils/transactions'

// CREATE TOKEN
task('createToken', 'Deploy Token Token')
  .addParam('name', 'Token name')
  .addParam('symbol', 'Token symbol')
  .addParam('decimals', 'Token decimals')
  .addParam('supply', 'Token initial supply')
  .addFlag('verify', 'verify contracts on etherscan')
  .setAction(async (args, { ethers, run, network }) => {
    try {
      console.log('Creating Token...')

      const { name, symbol, decimals, supply } = args
      const factoryAddress = get(network.name as TokenFactoryNetwork, TokenFactoryConfigProperty.TokenFactoryAddress)

      const signer = (await ethers.getSigners())[0]
      console.log('Signer:', signer.address)

      const tokenFactory = await ethers.getContractAt('TokenFactory', factoryAddress, signer)

      const tx = await tokenFactory.create(name, symbol, decimals, supply)
      // console.log(await ethers.provider.getNetwork())
      const receip = await tx.wait()
      // const event = receip.events.find((e: any) => e.event === 'TokenCreated');
      // console.log(getLogParameter(receip, 'TokenCreated', 'tokenAddress'))
      // const newTokenAddress = 'dadas'
      // const filter = tokenFactory.filters.TokenCreated()
      const logs = await tokenFactory.queryFilter(receip.logs, 'latest')
      // // console.log({logs})
      const log = logs.find((e) => e.transactionHash === tx.hash && e.args?.owner === signer.address)
      const newTokenAddress = log?.args?.tokenAddress

      console.log('----------------------')
      console.log('SUCCESSFULLY DEPLOYED AT:')
      console.log(newTokenAddress)
      console.log('----------------------')

      // verify source
      // if (args.verify) {
      //   console.log('Verifying source on etherscan')

      //   await TokenFactory.deployTransaction.wait(5)

      //   await run('verify:verify', {
      //     address: TokenFactory.address,
      //   })
      // }
    } catch (e) {
      console.log('----------------------')
      console.log('FAILED TO DEPLOY')
      console.error(e)
      console.log('----------------------')
    }
  })
