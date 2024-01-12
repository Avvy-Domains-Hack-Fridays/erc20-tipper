const { expect } = require("chai");
const hre = require('hardhat')
const ethers = hre.ethers

const contracts = {}
let signers

describe("Tipper", function () {
  beforeEach(async () => {
    signers = await ethers.getSigners()
    const Tipper = await ethers.getContractFactory('Tipper');
    const tipper = await Tipper.deploy();
    await tipper.deployed()
    contracts.tipper = tipper
    const Token = await ethers.getContractFactory('Token');
    const token = await Token.deploy(100)
    await token.deployed()
    contracts.token = token
  })

  describe('tip', () => {
    it('should fail if token address not valid', async () => {
      const amount = 1
      await expect(contracts.tipper.tip(
        signers[2].address, // random wallet address, can't call ERC20 func
        amount,
        signers[1].address,
        'Test note',
        'test image'
      )).to.be.reverted
    })

    it('should fail if token not approved', async () => {
      const amount = 1
      await expect(contracts.tipper.tip(
        contracts.token.address,
        amount,
        signers[1].address,
        'Test note',
        'test image'
      )).to.be.reverted
    })

    it('should succeed if token approved', async () => {
      const amount = 1
      const note = 'test note'
      const image = 'test image'
      const balanceBefore = await contracts.token.balanceOf(signers[1].address)
      const senderBalanceBefore = await contracts.token.balanceOf(signers[0].address)
      expect(balanceBefore.toString()).to.equal('0')
      let tx = await contracts.token.approve(
        contracts.tipper.address,
        amount,
      )
      await tx.wait()
      const approval = await contracts.token.allowance(signers[0].address, contracts.tipper.address)
      const output = await contracts.tipper.tip(
        contracts.token.address,
        amount,
        signers[1].address,
        note,
        image
      )
      const balanceAfter = await contracts.token.balanceOf(signers[1].address)
      expect(balanceAfter.toString()).to.equal('1')
      const senderBalanceAfter = await contracts.token.balanceOf(signers[0].address)
      expect(senderBalanceAfter.toString()).to.equal(senderBalanceBefore.sub(1).toString())

      const latestTipId = await contracts.tipper.lastTipId()
      expect(latestTipId).to.equal('1')

      const latestTip = await contracts.tipper.tips(latestTipId)
      expect(latestTip.token).to.equal(contracts.token.address)
      expect(latestTip.amount.toString()).to.equal(amount.toString())
      expect(latestTip.payer).to.equal(signers[0].address)
      expect(latestTip.payee).to.equal(signers[1].address)
      expect(latestTip.note).to.equal(note)
      expect(latestTip.image).to.equal(image)
    })
  })
});
