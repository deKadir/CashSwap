import axios from 'axios';

//normalde src altina plugins adi altinda klasor acip bu islemi orda yapmamiz gerek axiosu ordan import etmemiz gerek
//bu seferlik boyle olsun

const api = axios.create({
    baseURL: 'https://api.exchangerate.host/latest'
});

const fetchCurrencies = () => api.get('/');

//{params} yazmak {params:params} yazmanin kisa hali
const convertCurrency = (params) => api.get('/', { params });

export { fetchCurrencies, convertCurrency };
