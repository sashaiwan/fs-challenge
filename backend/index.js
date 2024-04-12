import appContainer from './app.js'

const app = appContainer()
const port = 3000

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
