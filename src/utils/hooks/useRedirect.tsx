import { useSelector } from "react-redux";
import { matchPath, useLocation } from "react-router-dom";
import { selectIsAuth } from "../../redux/reducers/authReducer/authSelectors";
import { appRoutesRules, RedirectRulesType, Roles, RouteNames } from "../../components/AppRoutes";

export const useRedirect = () => {
  const isAuth = useSelector(selectIsAuth)
  const userRole = isAuth ? Roles.USER : Roles.GUEST
  const { pathname } = useLocation();

  function createRule(rules: RedirectRulesType[]) {
    for (let i = 0; i < rules.length; i++) {
      let rule = rules[i]
      if (rule.children) {
        let newRule = createRule(rule.children)
        if (newRule) {
          rule = newRule
        }
      }

      if (matchPath(String(rule.route.path), pathname)) {
        return rule
      }
    }
  }

  const rule = createRule(appRoutesRules)
  const shouldRedirect = rule?.role && !rule.role.includes(userRole);

  if (shouldRedirect) {
    return { redirect: isAuth ? RouteNames.PROFILE : RouteNames.LOGIN }
  }

  return {};
}
