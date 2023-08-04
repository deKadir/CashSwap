import { useId } from 'react';
import PropTypes from 'prop-types';

//propsun icinde yaptigimiz islem object destruction olarak gecer
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

function Input({ label, ...inputProps }) {
    const id = useId();

    //kullanici id props gecmis ise onu kullan yoksa olusturdugumuz unique idyi kullan

    const inputId = inputProps.id ?? id;

    return (
        <div>
            <label htmlFor={inputId}>{label}</label>
            <br />
            <input id={inputId} {...inputProps} />
        </div>
    );
}

Input.propTypes = {
    label: PropTypes.string,
    inputProps: PropTypes.object
};

export default Input;
