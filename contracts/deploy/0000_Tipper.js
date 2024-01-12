module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()
  await deploy ('Tipper', {
    from: deployer,
    log: true,
    args: []
  })
}
module.exports.tags = ['Tipper']

