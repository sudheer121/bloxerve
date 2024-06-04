/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import PopulateDbFromResourceService from '#services/PopulateDbFromResourceService'
import ScrapeAndPopulate from '#services/ScrapeAndPopulate'
import ScraperService from '#services/ScraperService'
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  const scraper = new ScraperService()
  const pdb = new PopulateDbFromResourceService()
  const sp = new ScrapeAndPopulate(scraper, pdb)
  await sp.forBlockNumber(646087)
  return {
    hello: 'world',
  }
})

router.get('/txns', async () => {
  return {
    hello: 'world',
  }
})

router.get('/tx', async () => {
  return {
    hello: 'world',
  }
})
