export default function RadioComp({changeHandler, checkedCondition, name, value, label}){
    return (
        <div className="formElem">
            <input type="radio" name={name} id="genKnow" value={value} onChange={changeHandler} checked={checkedCondition} required/>
            <label htmlFor="genKnow">{label}</label>
        </div>
    )
}