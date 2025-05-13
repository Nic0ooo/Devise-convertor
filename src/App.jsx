import { useState } from 'react'
import DeviseSelect from './components/DeviseSelect';


function App() {
  const [amount, setAmount] = useState(1)
  const [fromDevise, setFromDevise] = useState("USD")
  const [toDevise, setToDevise] = useState("EUR")
  const [result, setResult] = useState("")

  const rates = {
    USD: { EUR: 0.85, CHF: 0.72, GBP: 0.72, JPY: 110.00 },
    EUR: { USD: 1.18, CHF: 0.85, GBP: 0.85, JPY: 130.00 },
    CHF: { USD: 1.39, EUR: 0.72, GBP: 0.85, JPY: 150.00 },
    GBP: { USD: 1.39, EUR: 1.18, CHF: 1.00, JPY: 150.00 },
    JPY: { USD: 0.0091, EUR: 0.0077, CHF: 0.0065, GBP: 0.0065 }
  }

  const deviseList = [
    { name: "USD", value: "USD" },
    { name: "EUR", value: "EUR" },
    { name: "CHF", value: "CHF" },
    { name: "GBP", value: "GBP" },
    { name: "JPY", value: "JPY" }
  ]

  const determineConversionRate = (fromDevise, toDevise) => {
    if (fromDevise === toDevise) {
      return 1;
    }
    if (rates[fromDevise] && rates[fromDevise][toDevise]) {
      return rates[fromDevise][toDevise];
    }
    return null;
  }

  const convert = () => {
    const currentAmount = parseFloat(amount);
    
    if (isNaN(currentAmount)) {
      setResult("Veuillez entrer un montant valide");
      return;
    }
    
    const conversionRate = determineConversionRate(fromDevise, toDevise);

    if (conversionRate) {
      const convertedAmount = currentAmount * conversionRate;
      setResult(`${currentAmount} ${fromDevise} = ${convertedAmount.toFixed(2)} ${toDevise}`);
    } else {
      setResult(`Conversion impossible entre ${fromDevise} et ${toDevise}`);
    }
  }

  return (
    <>
      <h1>Convertisseur de Devise</h1>
      <div className="card">
        <div className='amount'>
          <h2>Montant à convertir</h2>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Entrez le montant"
          />
        </div>
        <div className='devise'>

          <DeviseSelect 
            value={fromDevise}
            onChange={setFromDevise}
            deviseList={deviseList}
            label="Devise de départ"
          />

          <DeviseSelect 
            value={toDevise}
            onChange={setToDevise}
            deviseList={deviseList}
            label="Devise de destination"
          />
        </div>

        <button className="convert-btn" onClick={() => convert()}>Convertir</button>

        <div className='result'></div>
          <h2>Montant converti</h2>
          <p id="result">
            {result}
          </p>
        </div>
    </>
  )
}

export default App