import { task } from 'hardhat/config'
import { set, TokenFactoryConfigProperty } from '../configManager'
import { TokenFactoryNetwork } from '../hardhat.config'

// DEPLOY TOKEN FACTORY
task('deployFactory', 'Deploy Token Factory')
  .addFlag('verify', 'verify contracts on etherscan')
  .setAction(async (args, { ethers, run, network }) => {
    try {
      console.log('Creating Token factory...')

      await run('compile')

      const signer = (await ethers.getSigners())[0]
      console.log('Signer:', signer.address)

      const TokenFactory = await (await ethers.getContractFactory('TokenFactory', signer)).deploy()

      set(network.name as TokenFactoryNetwork, TokenFactoryConfigProperty.TokenFactoryAddress, TokenFactory.address)

      console.log('----------------------')
      console.log('SUCCESSFULLY DEPLOYED AT:')
      console.log(TokenFactory.address)
      console.log('----------------------')

      // verify source
      if (args.verify) {
        console.log('Verifying source on etherscan')

        await TokenFactory.deployTransaction.wait(5)

        await run('verify:verify', {
          address: TokenFactory.address,
        })
      }
    } catch (e) {
      console.log('----------------------')
      console.log('FAILED TO DEPLOY')
      console.error(e)
      console.log('----------------------')
    }
  })
