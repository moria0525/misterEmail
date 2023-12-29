import React, { useEffect, useState } from "react";
import { EmailList } from "../cmps/EmailList";
import { EmailFilter } from "../cmps/EmailFilter";
import { emailService } from "../services/email.service";
import { EmailFolderList } from "../cmps/EmailFolderList";
import { Link, Outlet, useParams, useSearchParams } from "react-router-dom";
import { EmailDetails } from "../cmps/EmailDetails";
import "/src/assets/css/cmps/email-index.css";

export function EmailIndex() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [emails, setEmails] = useState(null);
  const [filterBy, setFilterBy] = useState(
    emailService.getFilterFromParams(searchParams)
  );
  const params = useParams();

  useEffect(() => {
    setSearchParams();
    loadEmails();
  }, [filterBy, params.folder]);

  function onSetFilter(filterBy) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }));
  }

  async function loadEmails() {
    try {
      const emails = await emailService.query(filterBy, params.folder);
      setEmails(emails);
    } catch (err) {
      console.log("Had issues loading emails", err);
    }
  }

  async function onUpdateEmailRead(emailToUpdate) {
    try {
      if (!emailToUpdate.isRead) {
        const updatedEmail = {
          ...emailToUpdate,
          isRead:!emailToUpdate.isRead,
        };
        await emailService.save(updatedEmail);
        setEmails((prevEmails) =>
          prevEmails.map((email) =>
            email.id === emailToUpdate.id ? updatedEmail : email
          )
        );
      }
    } catch (error) {
      console.log("error:", error);
    }
  }


  async function onUpdateStar(email) {
    try {
      email.isStarred = !email.isStarred;
      await emailService.save(email);
    } catch (error) {
      console.log("error:", error);
    }
  }

  async function onUpdateDate(email) {
    try {
      const date = Date.now()
      alert(date)
    } catch (error) {
      console.log("error:", error);
    }
  }

  async function onAddEmail(EmailToAdd) {
    try {
      const savedEmail = await emailService.save(EmailToAdd);
      setEmails((prevEmails) => [...prevEmails, savedEmail]);
    } catch (err) {
      console.log("Had issues saving email", err);
    }
  }

  if (!emails) return <div>Loading...</div>;

  const { status, body, isRead } = filterBy;

  return (
    <section className="email-index">
     <Link to={`/email/${params.folder}/edit`}>
      <button>Compose</button>
   </Link>
      <EmailFilter onSetFilter={onSetFilter} filterBy={{ body, isRead }} />
      <div className="main-email">
        <EmailFolderList />
        <EmailList
          emails={emails}
          folder={params.folder}
          onUpdateEmailRead={onUpdateEmailRead}
          onSetFilter={onSetFilter}
          onUpdateStar={onUpdateStar}
        />
                <Outlet
          id="email-details"
          context={{ onAddEmail, onUpdateEmailRead }}
        />
      </div>
    </section>
  );
}
