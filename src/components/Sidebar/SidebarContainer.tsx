import { useSelector } from 'react-redux';
import { selectSidebar } from '../../redux/reducers/sidebarReducer/sidebarSelectors';
import Sidebar from "./Sidebar";

const SidebarContainer = () => {
  const sidebar = useSelector(selectSidebar)

  return (
    <Sidebar sidebar={sidebar} />
  )
}

export default SidebarContainer;
