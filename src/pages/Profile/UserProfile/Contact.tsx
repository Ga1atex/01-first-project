import { Space } from "antd";

type ContactPropsType = {
  contactTitle: string;
  contactValue: string;
};

const Contact: React.FC<ContactPropsType> = ({ contactTitle, contactValue }) => {
  if (contactValue === null || contactValue === '') {
    return <Space className="contact__title" size={2}>
      <span>{contactTitle + ':'}</span> <span>No Link</span>
    </Space>;
  }

  let externalLink = contactValue.match(/(https?:\/\/)?(www.)?(.*)/i);
  let link = externalLink![3];

  return <Space size={2} className="contact__title">
    <span>{contactTitle + ':'}</span><a target="_blank" href={`https://www.${link}`} rel="noreferrer" className={"contact__value"}>{contactValue}</a>
  </Space>;
};

export default Contact;
