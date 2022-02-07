import { connect } from 'react-redux';
import { compose } from 'redux';
import Sidebar from "./Sidebar";

const mapStateToProps = (state)=> {
  return {
    sidebar: state.sidebar
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  };
}
export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Sidebar);
