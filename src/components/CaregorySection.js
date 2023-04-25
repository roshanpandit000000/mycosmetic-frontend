import { Dropdown } from "flowbite-react";
import React from "react";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useContext, useState } from "react";
import axios from "axios";
import { getError } from "../utils";
import { Link } from "react-router-dom";

const CaregorySection = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`https://mycosmetic-backend.onrender.com/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <Dropdown label="Categorys" inline={true}>
        {categories.map((category) => (
          <Dropdown.Item key={category}>
            <Link to={`/search?category=${category}`}>{category}</Link>
          </Dropdown.Item>
        ))}
      </Dropdown>
    </>
  );
};

export default CaregorySection;
