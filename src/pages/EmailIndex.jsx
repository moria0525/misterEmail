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
  const [ascendingOrder, setAscendingOrder] = useState(true);

  const params = useParams();

  useEffect(() => {
    setSearchParams();
    loadEmails();
  }, [filterBy, params.folder]);

  function onSetFilter(filterBy) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }));
  }

  async function toggleSort(ev) {
    setAscendingOrder(!ascendingOrder);
    onSortEmail(!ascendingOrder ? 'asc' : 'desc', ev);
  };

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
          isRead: !emailToUpdate.isRead,
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

  async function onSortEmail(order, ev) {
    try {
      const sortedEmails = [...emails].sort((a, b) => {
        if (ev.target.value === "date") {
          if (order === 'asc')
            return new Date(a.sentAt) - new Date(b.sentAt)
          else
            return new Date(b.sentAt) - new Date(a.sentAt)
        }
        if (ev.target.value === "subject") {
          if (order === 'asc')
            return a.subject.localeCompare(b.subject)
          else
            return b.subject.localeCompare(a.subject)
        }
        if (ev.target.value === "read") {
          if (order === 'asc')
            return a.isRead - b.isRead
          else
            return b.isRead - a.isRead
        }
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

      <Link to={`/${params.folder}/edit`}>
        <button>Compose</button>
      </Link>

      <EmailFilter onSetFilter={onSetFilter} filterBy={{ subject, isRead }} />
      <button value={"date"} onClick={e => toggleSort(e)} >Date {ascendingOrder ? '↑' : '↓'} </button>
      <button value={"subject"} onClick={e => toggleSort(e)} >subject {ascendingOrder ? '↑' : '↓'}</button>
      <button value={"read"} onClick={e => toggleSort(e)} >Status Reading {ascendingOrder ? '↑' : '↓'}</button>
      <div className="main-email">
        <EmailFolderList emails = {emails} />

        {!params.emailId && <EmailList
          emails={emails}
          folder={params.folder}
          onUpdateEmailRead={onUpdateEmailRead}
          onSetFilter={onSetFilter}
          onUpdateStar={onUpdateStar}
        />}
        <Outlet
          id="email-details"
          context={{ onAddEmail, onUpdateEmailRead }}
        />

      </div>
    </section>
  );
}
