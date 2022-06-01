import styles from "./Preloader.module.scss";
// import loaderImg from '../../../assets/images/preloader.svg'


const Preloader: React.FC = () => {
  return (
    <div className={styles["loader-wrap"]} id="loader">
      <div className={styles["lds-ripple"]}>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Preloader;
