import { useState, useEffect } from 'react';
import { convertCurrency, fetchCurrencies } from './api';
import { formatCurrency } from './utils/number';
import Select from './components/Select';
import Input from './components/Input';

function App() {
    const [amount, setAmount] = useState(1);
    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    const [currencies, setCurrencies] = useState([]);
    const [result, setResult] = useState();

    const handleConvert = async () => {
        try {
            //amount:amount yazmak yerine key ve value degeri ayni isimle oldugu icin direkt amount gecebilirim
            const params = {
                BASE: from,
                symbols: to,
                amount
            };

            const response = await convertCurrency(params);
            if (response.data.success) {
                setResult(response.data.rates);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleFromChange = (event) => {
        setFrom(event.target.value);
    };
    const handleToChange = (event) => {
        setTo(event.target.value);
    };

    const fetchData = async () => {
        try {
            const res = await fetchCurrencies();
            const rates = res.data.rates;
            const ratesArray = Object.keys(rates);

            setCurrencies(ratesArray);
            setTo(ratesArray[0]);
            setFrom(ratesArray[0]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        //kullanici amount from to degerlerini degistirdiginde resultu sifirla eski sonuc gozukmesin.
        setResult();
    }, [amount, from, to]);

    return (
        <div>
            <Input min="1" label="Amount" type="number" placeholder="Enter currency amount" value={amount} onChange={handleAmountChange} />

            <Select label="from" onChange={handleFromChange}>
                {currencies.map((currency) => (
                    <Select.Option value={currency} key={currency}>
                        {currency}
                    </Select.Option>
                ))}
            </Select>

            <Select label="to" onChange={handleToChange}>
                {currencies.map((currency) => (
                    <Select.Option value={currency} key={currency}>
                        {currency}
                    </Select.Option>
                ))}
            </Select>

            <button onClick={handleConvert}>Convert</button>
            <br />
            <br />
            {amount && result && <div>{`${formatCurrency(from, amount)} =  ${formatCurrency(to, result[to])}`}</div>}
        </div>
    );
}

export default App;
