import React from "react";

function Filter({className, name, description, style, value, type, onChange, minValid, maxValid}) {
    return (
        <div className={"filtered"}>
            <label className={className}>
                {description} {name} Filtered :
            </label>
            <input className={className} style={style} value={value} type={type} min={minValid} max={maxValid}
                   onChange={onChange}/>
        </div>
    )
}

function FilterMinMax({name, minValue, minValidValue, maxValue, maxValidValue, changeMin, changeMax}) {
    return (
        <div>
            <Filter name={name} type={"number"} style={{color: "black"}} value={minValue} className={"minMax"}
                    onChange={changeMin}
                    minValid={minValidValue} maxValid={maxValidValue} description={"min"}/>
            <Filter name={name} type={"number"} style={{color: "black"}} value={maxValue} className={"minMax"}
                    onChange={changeMax}
                    minValid={minValidValue} maxValid={maxValidValue} description={"max"}/>
        </div>
    )
}

export default FilterMinMax;