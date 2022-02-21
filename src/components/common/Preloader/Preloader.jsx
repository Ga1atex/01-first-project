import './Preloader.css';
// import loaderImg from '../../../assets/images/preloader.svg'


const Preloader = () => {
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
