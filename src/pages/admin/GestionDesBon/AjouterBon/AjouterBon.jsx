import React, { useState } from 'react';
import axios from 'axios';
import styles from './ajouterBon.module.css';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdAdd } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function AjouterBon() {
  const navigate = useNavigate();
  const [accordions, setAccordions] = useState([{ id: 1 }]);
  const [expanded, setExpanded] = useState(1);
  const [images, setImages] = useState({})

  const addAccordion = () => {
    const newId = accordions.length > 0 ? accordions[accordions.length - 1].id + 1 : 1;
    setAccordions([...accordions, { id: newId }]);
  };

  const deleteAccordion = (id) => {
    setAccordions(accordions.filter(acc => acc.id !== id));
    if (expanded === id) {
      setExpanded(accordions.length > 1 ? accordions[0].id : null);
    }
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleImageChange = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => ({ ...prev, [id]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

 
  const handleSubmit = async () => {
    const products = accordions.map(acc => ({
      category: document.getElementById(`categorie-${acc.id}`).value,
      name: document.getElementById(`produit-${acc.id}`).value,
      quantity: document.getElementById(`quantite-${acc.id}`).value,
      description: document.getElementById(`description-${acc.id}`).value,
      ref: document.getElementById(`ref-${acc.id}`).value,
      maker: document.getElementById(`marque-${acc.id}`).value,
      provider: document.getElementById(`fournisseur-${acc.id}`).value,
      image: images[acc.id] || '', // Use Base64 image data
    })).filter(product => Object.values(product).every(value => value));
    const bon = document.getElementById('bon').value;

    if (products.length === 0) {
      toast.error('Please fill out all fields.');
      return;
    }

    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        toast.error('No token found.');
        return;
      }

      const response = await axios.post('http://localhost:3001/api/products/ajouterBon', { products, bon }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(response.data.message, {
        autoClose: 1000,
        onClose: () => {
          window.location.reload();
        },
      });
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  };

  return (
    <div className={styles.page_container}>
      <div className={styles.ajouterBon_page}>
        <div className={styles.page_title}>BONs management/ ajouter un Bon</div>
        <div className={styles.form}>
          <div className={styles.refBon}>
            <label htmlFor="bon">Réference du bon:</label>
            <input type="text" placeholder='Reference de bon' className={styles.input} id='bon' name='bon' />
          </div>
          <div className={styles.product_container}>
            {accordions.map((accordion) => (
              <Accordion
                key={accordion.id}
                expanded={expanded === accordion.id}
                onChange={handleAccordionChange(accordion.id)}
                className={styles.accordion}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${accordion.id}-content`} id={`panel${accordion.id}-header`}>
                  <div className={styles.accordion_header}>
                    <h4>Product: </h4>
                    <button className={styles.delete_button} onClick={() => deleteAccordion(accordion.id)}>Delete</button>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <div className={styles.formContainer}>
                    <div className={styles.group}>
                      <div className={styles.form_group}>
                        <label htmlFor={`produit-${accordion.id}`} >Produit</label>
                        <input className={styles.input} type="text" id={`produit-${accordion.id}`} name={`produit-${accordion.id}`}  />
                      </div>
                      <div className={styles.form_group}>
                        <label htmlFor={`ref-${accordion.id}`}>Référence</label>
                        <input className={styles.input} type="text" id={`ref-${accordion.id}`} name={`ref-${accordion.id}`} />
                      </div>
                      <div className={styles.form_group}>
                        <label htmlFor={`categorie-${accordion.id}`}>Catégorie</label>
                        <input className={styles.input} type="text" id={`categorie-${accordion.id}`} name={`categorie-${accordion.id}`} />
                      </div>
                      <div className={styles.form_group}>
                        <label htmlFor={`quantite-${accordion.id}`}>Quantité</label>
                        <input className={styles.input} type="number" id={`quantite-${accordion.id}`} name={`quantite-${accordion.id}`} />
                      </div>
                    </div>
                    <div className={styles.group}>
                      <div className={styles.form_group}>
                        <label htmlFor={`marque-${accordion.id}`}>Marque</label>
                        <input className={styles.input} type="text" id={`marque-${accordion.id}`} name={`marque-${accordion.id}`} />
                      </div>
                      <div className={styles.form_group}>
                        <label htmlFor={`fournisseur-${accordion.id}`}>Fournisseur</label>
                        <input className={styles.input} type="text" id={`fournisseur-${accordion.id}`} name={`fournisseur-${accordion.id}`} />
                      </div>
                      <div className={styles.form_group}>
                        <label htmlFor={`description-${accordion.id}`}>Description</label>
                        <textarea id={`description-${accordion.id}`} name={`description-${accordion.id}`} className={styles.desc}></textarea>
                      </div>
                    </div>
                    <div className={styles.prod_img}>
                      <input
                        type="file"
                        accept="image/*"
                        id={`prod_image-${accordion.id}`}
                        onChange={(e) => handleImageChange(accordion.id, e)}
                      />
                      {images[accordion.id] && <img src={images[accordion.id]} alt="Preview" className={styles.image_preview} />}
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
            <div className={styles.buttons}>
              <button className={styles.add_button} onClick={addAccordion}><MdAdd className={styles.add} /><p>Add more field</p></button>
              <button className={styles.submit_button} onClick={handleSubmit}>Enregistrer le bon</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AjouterBon;
