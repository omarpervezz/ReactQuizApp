import classes from "../styles/Main.module.css";
import Navbar from "./Navbar";
export default function Layout({ children }) {
  return (
    <>
      <Navbar></Navbar>
      <main className={classes.main}>
        <div className={classes.container}>{children}</div>
      </main>
    </>
  );
}
