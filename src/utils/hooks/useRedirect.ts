import { useSelector } from 'react-redux';
import { matchPath, useLocation } from 'react-router-dom';
import { selectIsAuth } from '../../redux/reducers/authReducer/authSelectors';
import {
  appRoutesRules,
  RouteRolesType,
  Roles,
  RouteNames,
} from '../../components/AppRoutes';

export const useRedirect = () => {
  const isAuth = useSelector(selectIsAuth);
  const userRole = isAuth ? Roles.USER : Roles.GUEST;
  const { pathname } = useLocation();

  function createRule(rules: RouteRolesType[]) {
    for (let i = 0; i < rules.length; i++) {
      let rule = rules[i];
      if (rule.children) {
        let newRule = createRule(rule.children);
        if (newRule) {
          rule = newRule;
        }
      }

      if (matchPath(String(rule.path), pathname)) {
        return rule;
      }
    }
  }

  const rule = createRule(appRoutesRules);
  const shouldRedirect = rule?.roles && !rule.roles.includes(userRole);

  return {
    shouldRedirect,
    redirectPath: isAuth ? RouteNames.PROFILE : RouteNames.LOGIN,
  };
};
