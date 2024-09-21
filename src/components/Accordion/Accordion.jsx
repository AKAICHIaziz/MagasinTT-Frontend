import React, { useState } from 'react';
import styles from './accordion.module.css';
import { FaFileInvoice } from "react-icons/fa";
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
import { useLocation, useNavigate } from 'react-router-dom';
import { FaUsers } from "react-icons/fa6";

function Accordion({ title, link, contents }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (path) => {
    navigate(path);
  };

  const currentBasePath = location.pathname.split('/')[1];
  const linkBasePath = link.split('/')[1];
  const isActive = currentBasePath === linkBasePath;

  return (
    <div className={styles.accordion}>
      <div
        className={`${styles.accordion_header} ${isActive ? styles.header_active : ''}`}  // Add active class conditionally
        onClick={toggleAccordion}
      >
        <div className={styles.header} onClick={() => handleLinkClick(link)}>
          {title === 'BON management' ? (<FaFileInvoice className={styles.ico} />) : (<FaUsers className={styles.ico} />)}
          {title}
        </div>
        {isOpen ? <MdOutlineExpandLess className={styles.icon} /> : <MdOutlineExpandMore className={styles.icon} />}
      </div>
      <div
        className={styles.accordion_content}
        style={{
          maxHeight: isOpen ? `${(contents.length + 2) * 50}px` : '0',  // Adjust height based on number of items
          transition: 'max-height 0.3s ease',
          overflow: 'hidden',
        }}
      >
        <div className={styles.accordion_inner_content}>
          {contents.map((content, index) => (
            <div key={index} className={styles.content}>
              {content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Accordion;
