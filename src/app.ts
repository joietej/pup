import express from 'express'
import puppeteer from 'puppeteer'

const app = express()
const port = 3000

app.get('/', async (req, res) => {
  res.setHeader('Content-type', 'application/pdf')
  res.setHeader('Content-disposition', 'attachment; filename=page.pdf')

  const browser = await puppeteer.launch({
    headless: 'new',
  })
  const page = await browser.newPage()
  await page.emulateMediaType('screen')
  await page.goto('https://www.google.com')
  const pdf = await page.pdf()
  await browser.close()

  res.send(pdf)
})
app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`)
})
