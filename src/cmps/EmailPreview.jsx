import React, { useEffect, useState } from "react";
import { FaRegStar, FaStar, FaTrash } from "react-icons/fa";
import { IoShareOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

export function EmailPreview({ email, folder, onUpdateEmailRead, onUpdateStar }) {
  const [isRead, setIsRead] = useState(email.isRead);
  const [isStar, setIsStar] = useState(email.isStarred);
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.stopPropagation();
    setIsStar((current) => !current);
    onUpdateStar(email);
  };

  const handleEmailClick = () => {
    alert("click")
    setIsRead(!isRead);
    onUpdateEmailRead(email);
    // navigate(`/email/${folder}/${email.id}`);
  };

  useEffect(() => {
    setIsRead(email.isRead);
    setIsStar(email.isStarred);
  }, [email]);

  const style = { color: "gold" };
  const fontIsRead = !email.isRead ? 700 : 400;

  return (
    <div className="email-main" onClick={handleEmailClick}>
      <div className="icon" onClick={handleClick}>
        {isStar ? <FaStar style={style} /> : <FaRegStar />}
      </div>
      <div className="email-content">
        <Link to={`/email/${folder}/${email.id}`} className="email-preview" style={{ fontWeight: fontIsRead }}>
          <div className="from">{email.from}</div>
          <div className="subject">{email.subject}</div>
          <div className="date">{email.sentAt}</div>
        </Link>
      </div>
    </div>
  );
}



// import React, { useState } from "react";
// import { FaRegStar, FaStar, FaTrash } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { LuMailOpen } from "react-icons/lu";
// import { IoShareOutline } from "react-icons/io5";


// export function EmailPreview({ email, onUpdateEmailRead, onUpdateStar }) {
//   const [isRead, setIsRead] = useState(email.isRead);
//   const [isStar, setIsStar] = useState(email.isStarred);
//   const [isHovered, setIsHovered] = useState(false);

//   const handleClick = () => {
//     setIsStar((current) => !current);
//     onUpdateStar(email);
//   };

//   return (
//    
//       <div className="icon" onClick={handleClick}> {isStar ? <FaStar /> : <FaRegStar />}

//         <Link
//           to={`/email/${email.id}`}
//           onClick={() => {
//             setIsRead(!isRead);
//             onUpdateEmailRead(email);
//           }}
//           className="email-preview"
//         >
//           <div className="icon-star">
//             <span>{email.from}</span>
//           </div>
//           <span className="subject">{email.subject}</span>
//           <h4 className="email-sentat">{email.sentAt}</h4>
//         </Link>
//         <div className={`email-hover ${isHovered ? "visible" : ""}`}>
//           <IoShareOutline />
//           <LuMailOpen />
//           <FaTrash onClick={() => { alert('trash') }} />
//         </div>
//       </div>
//     </div>
//   );
// }
