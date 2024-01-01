import React, { useEffect, useState } from "react";
import { EmailList } from "../cmps/EmailList";
import { EmailFilter } from "../cmps/EmailFilter";
import { emailService } from "../services/email.service";
import { EmailFolderList } from "../cmps/EmailFolderList";
import { Link, Outlet, useParams, useSearchParams } from "react-router-dom";
import { EmailDetails } from "../cmps/EmailDetails";
import "/src/assets/css/cmps/email-index.css";
import { utilService } from "../services/util.service";
import { storageService } from "../services/async-storage.service";

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




  async function onAddEmail(EmailToAdd) {
    try {
      const savedEmail = await emailService.save(EmailToAdd);
      setEmails((prevEmails) => [savedEmail, ...prevEmails]);
    } catch (err) {
      console.log("Had issues saving email", err);
    }
  }

  async function onSortEmail() {
    try {
      const sortedEmails = [...emails].sort(function (a, b) {
        return new Date(b.sentAt) - new Date(a.sentAt) 
      });
      setEmails(sortedEmails)
    } catch (error) {
      console.log("Error sorting emails:", error);
    }
  }


  if (!emails) return <div>Loading...</div>;

  const { status, subject, isRead } = filterBy;
 
  return (
    
    <section className="email-index">
    <button onClick={onSortEmail}>Date</button>
     <Link to={`/${params.folder}/edit`}>
      <button>Compose</button>
   </Link>
   
      <EmailFilter onSetFilter={onSetFilter} filterBy={{ subject, isRead }} />
      <div className="main-email">
        <EmailFolderList />
        
        {!params.emailId && <EmailList
          emails={emails}
          folder={params.folder}
          onUpdateEmailRead={onUpdateEmailRead}
          onSetFilter={onSetFilter}
          onUpdateStar={onUpdateStar}
        />}
                <Outlet
          id="email-details"
          context={{ onAddEmail, onUpdateEmailRead}}
        />
        
      </div>
    </section>
  );
}
