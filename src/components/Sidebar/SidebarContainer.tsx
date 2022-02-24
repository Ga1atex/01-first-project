import { connect } from 'react-redux';
import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-store';
import Sidebar from "./Sidebar";

const mapStateToProps = (state: AppStateType)=> {
  return {
    sidebar: state.sidebar
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//   };
// }
export default compose(
  connect(mapStateToProps)
)(Sidebar);
