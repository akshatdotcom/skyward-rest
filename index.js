const scrape  = require('./lib/scrape.js')
const Promise = require('bluebird')
const fs      = require('fs')

const save = data => {

	const contents = (data) => `module.exports = ${JSON.stringify(data)}`
	const path = (f) => `tests/tmp/scrape_${f}.data.js`

	fs.writeFile(path(Date.now()), contents(data), err => { if (err) throw err })
}

// skyward('https://skyward.kleinisd.net/scripts/wsisa.dll/WService=wsEAplus/seplog01.w')('s592100', 'pis.12345')

Promise.resolve(scrape('https://skyward.kleinisd.net/scripts/wsisa.dll/WService=wsEAplus/seplog01.w')('s531758', 'ASDF;lkj'))
	.then(skyward => {
		
		skyward.scrape('Q2')
			.then(save)
			.then(() => skyward.scrape('PR4'))
			.then(save)
			.then(() => skyward.scrape('PR3'))
			.then(save)
			.then(() => skyward.scrape('Q1'))
			.then(save)
			.then(() => skyward.scrape('PR2'))
			.then(save)
			.then(() => skyward.scrape('PR1'))
			.then(save)
			.then(() => skyward.close())
	})

