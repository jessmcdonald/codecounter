import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'codecounter',
  run: async (toolbox: GluegunToolbox) => {
    const { print } = toolbox

    print.info('Codecounter Version ' + toolbox.meta.version())
  }
}
