import Card from './components/Form/Form'
import ValidationService from './Services/ValidationService'
import './App.css'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <ValidationService>
      <div className='App'>
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Card />
      </div>
    </ValidationService>
  )
}

export default App
