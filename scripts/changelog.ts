import { generateChangelog } from '@inyono/changelog'
import fs from 'fs'
import path from 'path'
import util from 'util'

const writeFile = util.promisify(fs.writeFile)

exec().then(() => {
  console.log('done')
})

async function exec(): Promise<void> {
  const content = await generateChangelog<undefined>([
    {
      tagName: '0.0.0',
      date: '2018-11-08',
      added: ['Add initial `updateLicenseHeader` function supporting JavaScript, TypeScript, PHP, PHTML and Twig.']
    },
    {
      tagName: '0.0.1',
      date: '2018-11-08',
      added: [
          'Add function `updateCopyrightHeader` with slightly different API as a replacement for `updateLicenseHeader`.'
      ],
      internal: [
          'Add tests.'
      ],
      deprecated: [
          '`updateLicenseHeader` will be removed with the next breaking change. Use the new `updateCopyrightHeader` instead.'
      ],
      fixed: [
          'Handle `language.after` (e.g. `?>` for PHTML) correctly when input already starts with `language.begin` (e.g. `<?php`)'
      ]
    },
    {
      tagName: '0.0.2',
      date: '2018-11-18',
      fixed: ['Handle multiple multiline comments without newline in between correctly']
    }
  ])

  await writeFile(path.join(__dirname, '..', 'CHANGELOG.md'), content)
}
