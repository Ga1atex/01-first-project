import React from "react";

class ProfileStatus extends React.Component {
  componentDidMount() {
    // const userId = this.props.router.params.userId || 2;
    // this.props.getProfileStatus(userId);
  }
  state = {
    editMode: false,
  };

  activateEditMode = () => {
    this.setState({
      editMode: true
    })
  }

  deactivateEditMode = () => {
    this.setState({
      editMode: false
    });
  }


  render() {
    return (
      <div>
        {this.state.editMode
          ? <div className=""><input name="" id="" type="text" value={this.props.status} onBlur={this.deactivateEditMode} autoFocus/></div>
          : <span className="" onClick={this.activateEditMode}>{this.props.status}</span>}
      </div>
    );
  }

}
export default ProfileStatus;
