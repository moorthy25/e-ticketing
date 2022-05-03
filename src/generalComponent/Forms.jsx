
const Forms = ({ children, onSubmit, className, ...rest }) => {
    const exSubmit = e => {
        e.preventDefault();
        // console.log(e);
        let list = []
        for (let index = 0; index < e.target.children.length; index++) {
            const element = e.target.children[index];
            if (element.name)
                list.push({ [element.name]: element.value })
        }
        onSubmit(list)
    }
    return (
        <form  {...rest} onSubmit={exSubmit} className={className}>
            {children}
        </form>
    );
}


const Input = ({ name, type, className, ...rest }) => {
    return (
        <input {...rest} name={name} className={className} type={type} />
    );
}

const Select = ({ children, name, className, ...rest }) => {
    return (
        <select {...rest} name={name} className={className}>
            {children}
        </select>
    );
}

const Option = ({ children, value, ...rest }) => {
    return (
        <option {...rest} value={value} >
            {children}
        </option>
    )
}

Select.Option = Option

Forms.Select = Select
Forms.Input = Input

export default Forms;