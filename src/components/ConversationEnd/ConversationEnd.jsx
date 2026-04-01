import React from "react";
import "./ConversationEnd.css";

const ConversationEnd = ({ appointmentUrl, reason }) => {
  const hasCalendar = !!appointmentUrl;

  return (
    <div className="conversationEnd">
      <div className="conversationEnd__card">
        {hasCalendar ? (
          <>
            <h3 className="conversationEnd__title">Thanks for chatting!</h3>
            <p className="conversationEnd__text">
              Ready to take the next step? Book a time that works for you.
            </p>
            <a
              href={appointmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="conversationEnd__btn conversationEnd__btn--primary"
            >
              Book a Call
            </a>
          </>
        ) : (
          <>
            <h3 className="conversationEnd__title">Conversation Complete</h3>
            <p className="conversationEnd__text">
              {reason === "idle"
                ? "This session ended due to inactivity. A team member will follow up with you soon."
                : "Thank you for your time! A team member will be in touch shortly."}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ConversationEnd;
