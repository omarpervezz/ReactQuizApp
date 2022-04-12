import classes from "../styles/Form.module.css";
export default function LoginForm({ children, ...rest }) {
  return (
    <form className={classes.form} action="#" {...rest}>
      {children}
    </form>
  );
}
