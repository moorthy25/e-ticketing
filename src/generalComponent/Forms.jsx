import { useEffect, useRef, useState } from "react";

const Forms = ({ children, onSubmit, className, ...rest }) => {
    const exSubmit = e => {
        e.preventDefault();
        console.log(e);
        let list = {}
        for (let index = 0; index < e.target.length; index++) {
            const element = e.target[index];
            // console.log(element.name);
            if (element.name)
                list[element.name] = element.value
        }
        onSubmit(list)
    }
    return (
        <form  {...rest} onSubmit={exSubmit} className={className}>
            {children}
        </form>
    );
}


const Input = ({ placeholder = "", defaultValue = "", value, onChange: onCng = (e, v, setD) => { console.log(v); setD(v) }, name, type, className, ...rest }) => {
    const [d, setD] = useState();
    useEffect(() => {
        setD(defaultValue)
    }, [defaultValue]);
    let onChange = onCng;
    if (type === "number") {
        type = "text";
        onChange = (e, v, se) => {
            // console.log("typeof Number(v)", typeof Number(v));
            if (!isNaN(v)) {
                setD(v)
                onCng(e, v, se);
            }
        }
    }
    // console.log("onChange", onChange);
    return (
        <input {...rest} name={name} autoComplete="off" value={value || d} onChange={e => onChange(e, e.target.value, setD)} placeholder={placeholder} className={className} type={type} />
    );
}
const selectDefault = { text: "", value: "" }
const Select = ({ children = [], name, placeholder = "", reset = () => { },
    noSuggestion = (text) => console.log("There is no suggestion", text),
    defaultValue = selectDefault,
    onChange: onch, inputClassName, className, ...rest }) => {
    const [selected, setSelected] = useState({ value: "", text: "" });
    const [searchStr, setSearchStr] = useState("");
    const onChange = onch;
    Select.data = { value: selected, setValue: setSelected, setSearchStr, onChange }
    // console.log("children", children);
    // const reset = useRef(setSearchStr)
    useEffect(() => {
        setSelected(defaultValue)
        setSearchStr(defaultValue.text)
        console.log("from defaule value");
    }, [defaultValue]);
    reset(setSearchStr)
    const filtered = children.filter(v => v.props.children.toLowerCase().indexOf(searchStr.toLowerCase()) > -1)
        .sort((a, b) => a.props.children.toLowerCase().indexOf(searchStr.toLowerCase()) - b.props.children.toLowerCase().indexOf(searchStr.toLowerCase()));
    // console.log("filtered", filtered.map(d => d.props));
    // const inRef = useRef()
    const [inRef, setInRef] = useState({});
    const [divRef, setDivRef] = useState({});
    // const filtered=children.indexOf(Select.data.searchStr) > -1
    console.log(inRef);
    return (
        <div ref={ref => setDivRef(ref)} className={`component-wraper ${className}`}>
            <div className="binder" tabIndex={0}>
                <input {...rest} ref={ref => setInRef(ref)} autoComplete="off" value={searchStr} type='text' name={name}
                    onChange={e => {
                        setSearchStr(e.target.value)
                    }} placeholder={placeholder} className={`ninput ${inputClassName}`} />
                <svg width="33" height="34" viewBox="0 0 33 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.4043 23.2068L6.63872 14.4412C6.03286 13.8354 6.03286 12.8557 6.63872 12.2562L8.09536 10.7996C8.70122 10.1938 9.68091 10.1938 10.2803 10.7996L16.4936 17.0129L22.7069 10.7996C23.3127 10.1938 24.2924 10.1938 24.8918 10.7996L26.3485 12.2562C26.9543 12.8621 26.9543 13.8418 26.3485 14.4412L17.5829 23.2068C16.9899 23.8127 16.0102 23.8127 15.4043 23.2068Z" fill="white" />
                </svg>
                <div
                    style={{ position: "fixed", top: divRef.offsetTop + divRef.offsetHeight, left: divRef.offsetLeft, width: inRef.offsetWidth + "px" }}
                    className="compoent-children-wraper component-DropDown">
                    {filtered.length ? filtered : noSuggestion(searchStr)}
                    {children}
                </div>
            </div>

        </div>
    );
}

const Option = ({ children, value, ...rest }) => {
    // e.target.getAttribute           style={ ? { display: "none" } : {}}
    const setValue = Select.data.setValue;
    const setSearchStr = Select.data.setSearchStr;
    const onChange = Select.data.onChange;
    return (
        <div {...rest} onClick={e => {
            setValue({ value, text: children })
            setSearchStr(children)
            if (typeof onChange === 'function'){
                console.log("calling onchange",onChange);

                 onChange({ value, text: children })}
        }} data-value={value} >
            {children}
        </div>
    )
}

Select.Option = Option

Forms.Select = Select
Forms.Input = Input
Forms.Option = Option

export default Forms;