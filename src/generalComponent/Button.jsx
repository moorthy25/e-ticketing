const Button = ({ children,className, ...rest }) => {
    return (
        <button {...rest} className={"btn "+className} >{children}</button>
    );
}

export default Button;