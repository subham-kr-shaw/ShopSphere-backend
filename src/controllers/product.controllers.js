// const getallproducts = async (req, res) => {
//     try {
//         const product = await getallproduct(req.query);
//         res.status(201).send({ product: product });
//     } catch (error) {
//         res.status(201).send({ message: error.message });

//     }
// }
// const createproducts = async (req, res) => {
//     try {
//         const product = await createproduct(req.body);
//         if (!product) return res.status(500).send({ message: "product not created" })
//         res.status(201).send({ product: product });

//     } catch (error) {
//         res.status(404).send({ message: error.message });
//     }
// }
const { createproduct, deleteproduct, updateproduct, findproductbyid, getallproduct, createmultipleproduct } = require("../services/product.service")

const createproducts = async (req, res) => {
    try {
        console.log("req.body:", req.body); // 👈 add this to see what's coming in
        const product = await createproduct(req.body);
        if (!product) return res.status(500).send({ message: "product not created" });
        res.status(201).send({ product: product });
    } catch (error) {
        console.log("Error in createproducts:", error); // 👈 this will show the real problem
        res.status(500).send({ message: error.message }); // ✅ 500 not 404
    }
}

const deleteproducts = async (req, res) => {
    try {
        const product = await deleteproduct(req.params.id);
        // res.status(201).send({message:product});
        res.status(200).send({
            message: "successfully deleted product",
            id: req.params.id   // ✅ REQUIRED
        });
    } catch (error) {
        res.status(201).send({ message: error.message });

    }

}
const updateproducts = async (req, res) => {
    try {
        const product = await updateproduct(req.params.id, req.body);
        res.status(201).send({ product: product });
    } catch (error) {
        res.status(201).send({ message: error.message });

    }
}
const findproductbyids = async (req, res) => {
    try {
        const product = await findproductbyid(req.params.id);
        res.status(201).send({ product: product });
    } catch (error) {
        res.status(201).send({ message: error.message });

    }
}
const getallproducts = async (req, res) => {
    try {
        const product = await getallproduct(req.query);  // ✅ req.query passes all params including levelone/leveltwo/levelthree
        return res.status(200).send({ product });         // ✅ 200 for successful GET
    } catch (error) {
        console.log("getallproducts error:", error.message); // ✅ helps you debug
        return res.status(500).send({ message: error.message }); // ✅ 500 for server error
    }
};

const createmultipleproducts = async (req, res) => {
    try {
        const product = await createmultipleproduct(req.body);
        res.status(201).send({ message: "product created" });
    } catch (error) {
        res.status(201).send({ message: error.message });

    }
}

module.exports = {
    getallproducts,
    createproducts,
    updateproducts,
    findproductbyids,
    deleteproducts,
    createmultipleproducts
}