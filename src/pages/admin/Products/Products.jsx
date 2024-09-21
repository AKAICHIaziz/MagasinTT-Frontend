import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './products.module.css';
import { CiSquareMore } from "react-icons/ci";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import noimg from '../../../assets/noimage.jpg'
import { format } from 'date-fns';

function Products() {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [bonFilter, setBonFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.log('No token found');
        return;
      }
      try {
        const response = await axios.get('http://localhost:3001/api/products/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (categoryFilter.length > 0) {
      filtered = filtered.filter(product => categoryFilter.includes(product.category));
    }

    if (bonFilter) {
      filtered = filtered.filter(product => product.bon.toLowerCase().includes(bonFilter.toLowerCase()));
    }

    if (nameFilter) {
      filtered = filtered.filter(product => product.name.toLowerCase().includes(nameFilter.toLowerCase()));
    }

    setFilteredProducts(filtered);
  }, [categoryFilter, bonFilter, nameFilter, products]);

  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/products/${id}`);
  };


  return (
    <div className={styles.products_page}>
      <div className={styles.container}>

        <div className={styles.top}>

          <div className={styles.page_title}>Products management</div>

          <div className={styles.search}>
            <TextField
              label="Search by product name"
              variant="standard"
              fullWidth
              placeholder="Prod1"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              className={styles.test2}
            />
          </div>
        </div>

        <div className={styles.filter_container}>
          <div className={styles.title}>Filter By:</div>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
              Category
            </AccordionSummary>
            <AccordionDetails>
              <FormControlLabel
                control={<Checkbox onChange={(e) => setCategoryFilter(e.target.checked ? [...categoryFilter, 'informatique'] : categoryFilter.filter(c => c !== 'informatique'))} />}
                label="Informatique"
              />
              <FormControlLabel
                control={<Checkbox onChange={(e) => setCategoryFilter(e.target.checked ? [...categoryFilter, 'bureautique'] : categoryFilter.filter(c => c !== 'bureautique'))} />}
                label="Bureautique"
              />
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2-content" id="panel2-header">
              Numéro de Bon
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                label="Numéro de bon"
                variant="outlined"
                fullWidth
                value={bonFilter}
                onChange={(e) => setBonFilter(e.target.value)}
              />
            </AccordionDetails>
          </Accordion>
        </div>

        {
          filteredProducts.map((product) => (
            <div className={styles.product_container} key={product._id} onClick={() => handleRowClick(product._id)}>
              <div className={styles.left}>
                <div className={styles.prod_image}>{product.image ? (<img src={product.image} alt="" />) : (<img src={noimg} />)}</div>
                <div className={styles.text}>
                  <div className={styles.prod_name}>{product.name}</div>
                  <div className={styles.prod_info}>
                    <div className={styles.prod_ref}>{product.ref}</div>
                    <div className={styles.prod_factor}>CISCO</div>
                    <div className={styles.prod_cat}>Réseau</div>
                    <div className={styles.prod_quantity}>{product.quantity}<span> in stock</span></div>
                  </div>
                </div>
              </div>
              <div className={styles.middle}>
                <div className={styles.one}>
                  <div className={styles.one_elem}>Total <span>{product.qte}</span></div>
                  <div className={styles.one_elem}>In stock <span>{product.quantity}</span></div>
                  <div className={styles.one_elem}>Retailed <span>{product.qte - product.quantity}</span></div>
                </div>
                <div className={styles.two}>
                  <div className={styles.two_elem}>Référence du bon <span>{product.bon}</span></div>
                  <div className={styles.two_elem}>Added at:<span> {product.createdAt ? format(new Date(product.createdAt), 'yyyy-MM-dd HH:mm:ss') : 'N/A'}</span></div>
                </div>
              </div>
              <div className={styles.right}>
                <CiSquareMore className={styles.more} />
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Products;
