import reveal from './reveal'
import firebase from './firebase'

const main = async () => {
  const revealInstance = await reveal()
  firebase(revealInstance)
}

main()
