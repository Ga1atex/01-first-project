type ContactPropsType = {
  contactTitle: string;
  contactValue: string;
};
const Contact: React.FC<ContactPropsType> = ({ contactTitle, contactValue }) => {
  if (contactValue === null || contactValue === '') {
    return <div className="contact__title">
      {contactTitle}: <span>No Link</span>
    </div>;
  }

  let externalLink = contactValue.match(/(https?:\/\/)?(www.)?(.*)/i);
  let link = externalLink![3];

  return <div className="contact__title">
    {contactTitle}: <a target="_blank" href={`https://www.${link}`} rel="noreferrer" className={"contact__value"}>{contactValue}</a>
  </div>;
};

export default Contact;
