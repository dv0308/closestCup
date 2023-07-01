import styles from "./Banner.module.css";

const Banner = (props) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>CLOSEST</span>
        <span className={styles.title2}>CUP</span>
      </h1>
      <p className={styles.subTitle}>Discover Your Local Coffee Shops!!</p>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={props.handleOnClick}>
          {props.buttonTxt}
        </button>
      </div>
    </div>
  );
};

export default Banner;
