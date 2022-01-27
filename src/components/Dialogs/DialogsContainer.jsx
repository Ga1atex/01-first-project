import Dialogs from './Dialogs';
import { sendMessageActionCreator, updateTextActionCreator } from '../../redux/dialogsReducer';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateNewMessageText: (text) => {
      const action = updateTextActionCreator(text);
      dispatch(action);
    },
    sendMessage: (text) => {
      const action = sendMessageActionCreator(text);
      dispatch(action);
    }
  };
};

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;
