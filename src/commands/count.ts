import { GluegunToolbox } from 'gluegun'

module.exports = {
  run: async (toolbox: GluegunToolbox) => {
    const { print, parameters, filesystem } = toolbox
    const {
      colors: { magenta }
    } = print
    const folder = parameters.first

    print.info('Counting source files in ' + magenta(folder))

    const matching = '*(*.ts|*.html|*.css|*.js)'
    const files = filesystem.find(folder, { matching })

    const initialData = {
      ts: 0,
      html: 0,
      css: 0,
      js: 0
    }

    const data = files.reduce((data, file) => {
      //get file extension
      const fileExt = file.split('.').pop()

      //get lines of code
      const lines = filesystem.read(file).split('\n').length

      //add lines of code to appropriate extension
      data[fileExt] += lines

      //return
      return data
    }, initialData)

    const formattedData = [
      ['Type', 'Lines of code'],
      ...Object.entries(data)
    ]

    print.info(' ')
    print.table(formattedData, { format: 'lean' })
  }
}
