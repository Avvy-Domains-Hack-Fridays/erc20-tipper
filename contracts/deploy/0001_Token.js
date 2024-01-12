module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()
  await deploy ('Token', {
    from: deployer,
    log: true,
    args: [100]
  })
}
module.exports.tags = ['Token']

