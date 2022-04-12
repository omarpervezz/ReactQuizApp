import images from "../assets/images/signup.svg";
import classes from "../styles/Illustration.module.css";
export default function Illustrator() {
  return (
    <div className={classes.illustration}>
      <img src={images} alt="Signup" />
    </div>
  );
}
