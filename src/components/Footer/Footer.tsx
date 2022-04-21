import { Footer } from "antd/lib/layout/layout";
import styles from "./Footer.module.css";

const FooterComponent: React.FC = () => {
  return (
    <Footer className={styles.footer}>
      <div className="container">
        <div className="">
          Pet-project Social Network 2022
        </div>
      </div>
    </Footer>

  )
}

export default FooterComponent
