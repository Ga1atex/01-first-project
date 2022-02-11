import { useLocation, useMatch, useNavigate, useParams } from 'react-router-dom';


function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

// const withRouter = (Component) => {
//   let RouterComponent = (props) => {
//     const match = useMatch('/profile/:userId/');
//     return <Component {...props} match={match} />;
//   };
//   return RouterComponent;
// }

export default withRouter;
