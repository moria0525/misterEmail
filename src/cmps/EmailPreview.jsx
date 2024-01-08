import React, { useEffect, useState } from "react";
import { FaRegStar, FaStar, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { emailService } from "../services/email.service";
import { utilService } from "../services/util.service"

export function EmailPreview({ email, folder, onUpdateEmailRead, onUpdateStar }) {
  const [isRead, setIsRead] = useState(email.isRead);
  const [isStar, setIsStar] = useState(email.isStarred);
  const [isHover, setIsHover] = useState(false);
  const [displayMode, setDisplayMode] = useState("date");

  const handleHover = () => {
    setIsHover(true);
    setDisplayMode("trash");
  };

  const handleLeave = () => {
    setIsHover(false);
    setDisplayMode("date");
  };

  const handleTrashClick = (event) => {
    event.stopPropagation();
    emailService.onRemoveEmail(email, folder);
  };

  const handleClick = (event) => {
    event.stopPropagation();
    setIsStar((current) => !current);
    email.isStarred = !email.isStarred
    onUpdateStar(email);
  };

  const handleEmailClick = () => {
    console.log("here!")
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
  const showIcons = isHover ? "Show" : "";

  return (
    <div
      className="email-main"
      onClick={handleEmailClick}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <div className={`icon ${showIcons}`} onClick={handleClick}>
        {isStar ? <FaStar style={style} /> : <FaRegStar />}
      </div>

      <div className="email-content">
        <Link to={`/${folder}/${email.id}`} className="email-preview" style={{ fontWeight: fontIsRead }}>
          <div className="from">{email.from}</div>
          <div className="subject">{email.subject}</div>
          <div className="date">
            {displayMode === "date" ?
              (email.sentAt) : (<FaTrash onClick={() => { emailService.onRemoveEmail(email, folder) }} />)}
          </div>
        </Link>
      </div>
    </div>
  );
}
