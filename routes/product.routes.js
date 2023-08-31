// import axios, { Axios } from "axios";
// import Layout from '../components/Layout';
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

const { default: next } = require("next/types");
const router = require("./auth.routes");

// const products = () => {
//     const [productsArr, SetProductsArr] = userState(null);
//     const [query, serQuery ] = useState(null);

//     useEffect(() => getProductArr(), []);

//     const getProductArr = () => {
//         axios
//             .get(``)
//             .then((response) => SetProductsArr(response.data))
//             .catch((e) =>
//             console.log("Error getting the list of products", e)
//             );
//     };

//     const searchProduct = (queryToSearch) => {
//         axios
//         .get(`${process.env.REACT_APP_API_URL}/search?q=${queryToSearch}`)
//         .then((response) => getProductArr(response.data))
//         .catch((e) => console.log("Error getting beers from API", e));
//     };



// const express = require("express");
// const router = express.Router();
// const User = require("../models/User.model");
// const { isAuthenticated } = require("../middleware/jwt.middleware.js");

router.post('/create', (req, res, next) => {
    const {name,email,} = req.body


)
}

module.exports = router;