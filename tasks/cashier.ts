import { task } from 'hardhat/config'
import { get, set, TokenFactoryConfigProperty } from '../configManager'
import { TokenFactoryNetwork } from '../hardhat.config'

task('deployCashier', 'Deploy Cashier')
  .addFlag('verify', 'verify contracts on etherscan')
  .setAction(async (args, { ethers, run, network }) => {
    try {
      console.log('Creating cashier...')

      await run('compile')

      const signer = (await ethers.getSigners())[0]
      console.log('Signer:', signer.address)

      const cashier = await (await ethers.getContractFactory('Cashier', signer)).deploy()

      set(network.name as TokenFactoryNetwork, TokenFactoryConfigProperty.CashierAddress, cashier.address)

      console.log('----------------------')
      console.log('SUCCESSFULLY DEPLOYED AT:')
      console.log(cashier.address)
      console.log('----------------------')

      // verify source
      if (args.verify) {
        console.log('Verifying source on etherscan')

        await cashier.deployTransaction.wait(5)

        await run('verify:verify', {
          address: cashier.address,
        })
      }
    } catch (e) {
      console.log('----------------------')
      console.log('FAILED TO DEPLOY')
      console.error(e)
      console.log('----------------------')
    }
})

task('cashierSetPrice', 'Set service s price')
    .addParam('serviceName', 'Name of the service')
    .addParam('price', 'Price of the service')
    .setAction(async (args, { ethers, run, network }) => {
    try {
      console.log('Creating cashier...')

      await run('compile')

      const signer = (await ethers.getSigners())[0]
      console.log('Signer:', signer.address)

      const { serviceName, price } = args
      const cashierAddress = get(network.name as TokenFactoryNetwork, TokenFactoryConfigProperty.CashierAddress)

      const cashier = await ethers.getContractAt('Cashier', cashierAddress, signer)

      const tx = await cashier.setPrice(serviceName, price)
      console.log('Transaction hash:', tx)

      await tx.wait()
      console.log('----------------------')
      console.log('NEW PRICE SET')
      console.log('----------------------')

    } catch (e) {
      console.log('----------------------')
      console.log('FAILED TO SET')
      console.error(e)
      console.log('----------------------')
    }
})

task('cashierGetPrice', 'Get service s price')
    .addParam('serviceName', 'Name of the service')
    .setAction(async (args, { ethers, run, network }) => {
    try {
      console.log('Creating cashier...')

      await run('compile')

      const signer = (await ethers.getSigners())[0]
      console.log('Signer:', signer.address)

      const { serviceName } = args
      const cashierAddress = get(network.name as TokenFactoryNetwork, TokenFactoryConfigProperty.CashierAddress)

      const cashier = await ethers.getContractAt('Cashier', cashierAddress, signer)

      const price = await cashier.getPrice(serviceName)
      
      console.log('----------------------')
      console.log(`Price for ${serviceName} is ${price} ETH`)
      console.log('----------------------')

    } catch (e) {
      console.log('----------------------')
      console.log('FAILED TO SET')
      console.error(e)
      console.log('----------------------')
    }
})

task('cashierBalance', 'Get cashier balance')
  .setAction(async (args, { ethers, run, network }) => {
    try {
        console.log('Creating cashier...')
    
        await run('compile')
    
        const signer = (await ethers.getSigners())[0]
        console.log('Signer:', signer.address)
    
        const cashierAddress = get(network.name as TokenFactoryNetwork, TokenFactoryConfigProperty.CashierAddress)
    
        const balance = await ethers.provider.getBalance(cashierAddress)
        
        console.log('----------------------')
        console.log({balance: balance.toString()})
        console.log('----------------------')
    
    } catch (e) {
        console.log('----------------------')
        console.log('FAILED TO SET')
        console.error(e)
        console.log('----------------------')
    }
})

task('cashierWithdraw', 'Withdraw balance')
  .setAction(async (args, { ethers, run, network }) => {
    try {
        console.log('Creating cashier...')
    
        await run('compile')
    
        const signer = (await ethers.getSigners())[0]
        console.log('Signer:', signer.address)
    
        const cashierAddress = get(network.name as TokenFactoryNetwork, TokenFactoryConfigProperty.CashierAddress)
    
        const balance = await ethers.provider.getBalance(cashierAddress)
        
        console.log('----------------------')
        console.log({balance: balance.toString()})
        console.log('----------------------')
    
    } catch (e) {
        console.log('----------------------')
        console.log('FAILED TO SET')
        console.error(e)
        console.log('----------------------')
    }
})