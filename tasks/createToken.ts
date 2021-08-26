import { BigNumber } from 'ethers'
import { formatBytes32String } from 'ethers/lib/utils'
import { task } from 'hardhat/config'
import { get, set, TokenFactoryConfigProperty } from '../configManager'
import { TokenFactoryNetwork } from '../hardhat.config'
// import { getLogParameter } from '../utils/transactions'

// // CREATE TOKEN
// task('createToken', 'Deploy Token Token')
//   .addParam('name', 'Token name')
//   .addParam('symbol', 'Token symbol')
//   .addParam('decimals', 'Token decimals')
//   .addParam('supply', 'Token initial supply')
//   .addFlag('verify', 'verify contracts on etherscan')
//   .setAction(async (args, { ethers, run, network }) => {
//     try {
//       console.log('Creating Token...')

//       const { name, symbol, decimals, supply } = args
//       const factoryAddress = get(network.name as TokenFactoryNetwork, TokenFactoryConfigProperty.TokenFactoryAddress)

//       const signer = (await ethers.getSigners())[0]
//       console.log('Signer:', signer.address)

//       const tokenFactory = await ethers.getContractAt('TokenFactory', factoryAddress, signer)

//       const bytecode = await tokenFactory.getBytecode(name, symbol, decimals, supply)
//       console.log({bytecode})
//       const salt = formatBytes32String('777')
//       const determinedAddress = await tokenFactory.getAddress(bytecode, salt)
//       console.log({determinedAddress})
//       const tx = await tokenFactory.create(bytecode, salt)
//       // console.log(await ethers.provider.getNetwork())
//       const receip = await tx.wait()
//       // const event = receip.events.find((e: any) => e.event === 'TokenCreated');
//       console.log(receip)
//       // const newTokenAddress = 'dadas'
//       // const filter = tokenFactory.filters.TokenCreated()
//       const logs = await tokenFactory.queryFilter(receip.logs, 'latest')
//       console.log({logs: logs[0]?.args})
//       const log = logs.find((e) => e.transactionHash === tx.hash && e.args?.owner === signer.address)
//       const newTokenAddress = log?.args?.tokenAddress

//       console.log('----------------------')
//       console.log('SUCCESSFULLY DEPLOYED AT:')
//       console.log(newTokenAddress)
//       console.log('----------------------')

//       // verify source
//       // if (args.verify) {
//       //   console.log('Verifying source on etherscan')

//       //   await TokenFactory.deployTransaction.wait(5)

//       //   await run('verify:verify', {
//       //     address: TokenFactory.address,
//       //   })
//       // }
//     } catch (e) {
//       console.log('----------------------')
//       console.log('FAILED TO DEPLOY')
//       console.error(e)
//       console.log('----------------------')
//     }
//   })

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
      const cashierAddress = get(network.name as TokenFactoryNetwork, TokenFactoryConfigProperty.CashierAddress)

      const signer = (await ethers.getSigners())[2] // change account
      console.log('Signer:', signer.address)

      const newToken = await (await ethers.getContractFactory('ERC20Basic', signer)).deploy(cashierAddress, name, symbol, decimals, supply, { value: BigNumber.from(1).mul(10**9).mul(10**9)})


      console.log('----------------------')
      console.log('SUCCESSFULLY DEPLOYED AT:')
      console.log({newTokenAddress: newToken.address})
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
