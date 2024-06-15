/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
const TransactionsController = () => import('#controllers/TransactionsController')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('/txns', [TransactionsController, 'index'])
router.get('/txns/:hashId', [TransactionsController, 'show'])
router.get('/currency/ethtousd', async () => {
  const from = 'ethereum'
  const to = 'usd'
  let data: any = {}
  try {
    // TODO: move to frontend
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${from}&vs_currencies=${to}`
    )
    data = await response.json()
  } catch (e) {
    console.error(e)
  }
  let value = data?.[from]?.[to] ?? 0
  return { value }
})
