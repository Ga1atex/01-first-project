import { useLocation, useMatch, useNavigate, useParams } from 'react-router-dom';


const withRouter = <WCP,>(WrappedComponent: React.ComponentType<WCP>) => {
  const ComponentWithRouterProp: React.FC = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <WrappedComponent
        {...props as WCP}
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
