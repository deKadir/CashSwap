const formatCurrency = (currency, value) => {
    //Intl number tipindeki degerleri formatlamak icin kullanilan javascript build in gelen class 
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
    
    return new Intl.NumberFormat('tr-TR', { currency, style: 'currency' }).format(value);
};

export { formatCurrency };
