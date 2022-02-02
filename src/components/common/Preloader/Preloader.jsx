import styles from './Preloader.css';
import loaderImg from '../../../assets/images/preloader.svg'


const Preloader = (props) => {
  return (
    <div className="loader-wrap hide" id="loader">
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Preloader;
