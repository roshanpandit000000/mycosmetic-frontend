import { FileInput, Label, TextInput } from "flowbite-react";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Store } from "../Store";
import { ImCross } from "react-icons/im";
import { getError } from "../utils";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { toast } from "react-toastify";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };
    case "UPLOAD_REQUEST":
      return { ...state, loadingUpload: true, errorUpload: "" };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        loadingUpload: false,
        errorUpload: "",
      };
    case "UPLOAD_FAIL":
      return { ...state, loadingUpload: false, errorUpload: action.payload };
    default:
      return state;
  }
};

const ProductEditScreen = () => {
  const navigate = useNavigate();
  const params = useParams(); // /product/:id
  const { id: productId } = params;

  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`https://mycosmetic-backend.onrender.com/api/products/${productId}`);
        setName(data.name);
        setSlug(data.slug);
        setPrice(data.price);
        setImage(data.image);
        setImages(data.images);
        setCategory(data.category);
        setCountInStock(data.countInStock);
        setBrand(data.brand);
        setDescription(data.description);
        dispatch({ type: "FETCH_SUCCESS" });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [productId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(
        `https://mycosmetic-backend.onrender.com/api/products/${productId}`,
        {
          _id: productId,
          name,
          slug,
          price,
          image,
          images,
          category,
          brand,
          countInStock,
          description,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: "UPDATE_SUCCESS",
      });
      toast.success("Product updated successfully");
      navigate("/admin/products");
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: "UPDATE_FAIL" });
    }
  };

  const uploadFileHandler = async (e, forImages) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);
    try {
      dispatch({ type: "UPLOAD_REQUEST" });
      const { data } = await axios.post("https://mycosmetic-backend.onrender.com/api/upload", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: "UPLOAD_SUCCESS" });

      if (forImages) {
        setImages([...images, data.secure_url]);
      } else {
        setImage(data.secure_url);
      }
      toast.success("Image uploaded successfully. click Update to apply it");
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: "UPLOAD_FAIL", payload: getError(err) });
    }
  };
  const deleteFileHandler = async (fileName, f) => {
    console.log(fileName, f);
    console.log(images);
    console.log(images.filter((x) => x !== fileName));
    setImages(images.filter((x) => x !== fileName));
    toast.success("Image removed successfully. click Update to apply it");
  };

  return (
    <>
      <Helmet>
        <title>Edit Product ${productId}</title>
      </Helmet>
      <div className="container mx-auto px-24">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <form onSubmit={submitHandler}>
            <div className="lg:w-1/2 py-6">
              <div className="mb-2 block">
                <Label htmlFor="base" value="Product Name" />
              </div>
              <TextInput
                id="base"
                type="text"
                sizing="md"
                required={true}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="lg:w-1/2 py-6">
              <div className="mb-2 block">
                <Label htmlFor="base" value="Product Slug" />
              </div>
              <TextInput
                id="base"
                type="text"
                sizing="md"
                required={true}
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
            <div className="lg:w-1/2 py-6">
              <div className="mb-2 block">
                <Label htmlFor="base" value="Product Price" />
              </div>
              <TextInput
                id="base"
                type="text"
                sizing="md"
                required={true}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="lg:w-1/2 py-6">
              <div className="mb-2 block">
                <Label htmlFor="base" value="Product Image File" />
              </div>
              <TextInput
                id="base"
                type="text"
                sizing="md"
                required={true}
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div className="lg:w-1/2 py-6">
              <div id="fileUpload">
                <div className="mb-2 block">
                  <Label htmlFor="file" value="Upload Image" />
                </div>
                <FileInput
                  onChange={uploadFileHandler}
                  id="file"
                  helperText="A profile picture is useful to confirm your are logged into your account"
                />
                {loadingUpload && <LoadingBox></LoadingBox>}
              </div>
            </div>
            <div className="lg:w-1/2 py-6">
              <div className="mb-2 block">
                <Label htmlFor="file" value="Upload Image" />
              </div>
              {images.length === 0 && <MessageBox>No image</MessageBox>}
              <div>
                {images.map((x) => (
                  <div key={x}>
                    {x}
                    <button onClick={() => deleteFileHandler(x)}>
                      <ImCross />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* aditional image */}
            <div className="lg:w-1/2 py-6">
              <div id="fileUpload">
                <div className="mb-2 block">
                  <Label htmlFor="file" value="Upload Additional Image" />
                </div>
                <FileInput
                  onChange={(e) => uploadFileHandler(e, true)}
                  id="file"
                  helperText="A profile picture is useful to confirm your are logged into your account"
                />
                {loadingUpload && <LoadingBox></LoadingBox>}{" "}
              </div>
            </div>

            <div className="lg:w-1/2 py-6">
              <div className="mb-2 block">
                <Label htmlFor="base" value="Product Category" />
              </div>
              <TextInput
                id="base"
                type="text"
                sizing="md"
                required={true}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="lg:w-1/2 py-6">
              <div className="mb-2 block">
                <Label htmlFor="base" value="Product Brand" />
              </div>
              <TextInput
                id="base"
                type="text"
                sizing="md"
                required={true}
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
            <div className="lg:w-1/2 py-6">
              <div className="mb-2 block">
                <Label htmlFor="base" value="Product Count In Stock" />
              </div>
              <TextInput
                id="base"
                type="text"
                sizing="md"
                required={true}
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </div>
            <div className="lg:w-1/2 py-6">
              <div className="mb-2 block">
                <Label htmlFor="base" value="Product Description" />
              </div>
              <TextInput
                id="base"
                type="text"
                sizing="md"
                required={true}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button
              disabled={loadingUpdate}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Update Product
              </span>
            </button>
            {loadingUpdate && <LoadingBox></LoadingBox>}
          </form>
        )}
      </div>
    </>
  );
};

export default ProductEditScreen;
