import PropTypes from 'prop-types';
import { useId } from 'react';

function Select({ label = '', onChange = () => {}, children }) {
    //react tarafindan bize sunulan id olusturmak icin kullanilan bir hook
    //https://react.dev/reference/react/useId

    //select componenti her cagirildiginda farkli bir id olustur
    const id = useId();

    return (
        <div style={{ marginBlock: '1rem' }}>
            <label htmlFor={id}>{label}</label>
            <br />
            <select id={id} onChange={onChange}>
                {children}
            </select>
        </div>
    );
}

//children propsu option icine gecilen elemani <Option>blala</Option>
const Option = ({ children, value }) => {
    return <option value={value}>{children}</option>;
};
// surekli beraber kullanilacak componentleri birbiri ile eslestirmek mantikli bir yontem. React dunyasinda bu teknik composed components olarak gecer

Select.Option = Option;

//propslari validate etmek icin yararli bir kutuphane
//https://www.npmjs.com/package/prop-types

Option.propTypes = {
    children: PropTypes.any,
    value: PropTypes.oneOf(['number', 'string'])
};
Select.propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.array,
    children: PropTypes.any
};

export default Select;
