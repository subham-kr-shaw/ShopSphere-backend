
const category = require("../models/category");
const product = require("../models/product.model");

const createproduct = async (reqdata) => {
    let toplevel = await category.findOne({ name: reqdata.toplevelcategory });
    // console.log(reqdata);
    if (!toplevel) {
        toplevel = await new category({
            name: reqdata.toplevelcategory,
            level: 1,
        }).save();
    }

    let secondlevel = await category.findOne({
        name: reqdata.secondlevelcategory,
        parentcategory: toplevel._id,
    });
    if (!secondlevel) {
        secondlevel = await new category({
            name: reqdata.secondlevelcategory,
            parentcategory: toplevel._id,
            level: 2,
        }).save();
    }

    let thirdlevel = await category.findOne({
        name: reqdata.thirdlevelcategory,
        parentcategory: secondlevel._id,
    });
    if (!thirdlevel) {
        thirdlevel = await new category({
            name: reqdata.thirdlevelcategory,
            parentcategory: secondlevel._id,
            level: 3,
        }).save();
    }

    const products = new product({
        title: reqdata.title,
        description: reqdata.description,
        category: thirdlevel._id,
        price: reqdata.price,
        color: reqdata.color,
        imageurl: reqdata.imageurl,
        quantity: reqdata.quantity,
        size: reqdata.size,
        discountedprice: reqdata.discountedprice,
        discountpercent: reqdata.discountpercent,
        brand: reqdata.brand,
    });

    const savedProducts = await products.save();
    return savedProducts;
}

const deleteproduct = async (productid) => {
    await product.findByIdAndDelete(productid);
    return "successfully deleted product";
}

const updateproduct = async (productid, reqdata) => {
    return await product.findByIdAndUpdate(productid, reqdata);
}

const findproductbyid = async (productid) => {
    const prod = await product.findById(productid).populate("category").exec();
    if (!prod) throw new Error("product not found " + productid);
    return prod;
}

// ✅ helper — find category by name under a parent
const findcategory = async (name, parentid = null) => {
    const query = { name: { $regex: new RegExp(`^${name}$`, 'i') } };
    if (parentid !== null) query.parentcategory = parentid;
    return await category.findOne(query);
};

const getallproduct = async (reqquery) => {
    let {
        levelone, leveltwo, levelthree,
        color, size, minprice, maxprice,
        mindiscount, sort, stock, pagenumber, pagesize
    } = reqquery;

    pagesize = Number(pagesize) || 10;
    pagenumber = Number(pagenumber) || 1;
    minprice = Number(minprice) || 0;
    maxprice = Number(maxprice) || 0;
    mindiscount = Number(mindiscount) || 0;

    let query = product.find().populate("category");

    // ✅ CATEGORY FILTER
    if (levelthree || leveltwo || levelone) {
        let categoryids = [];

        const top = levelone ? await findcategory(levelone, null) : null;
        const mid = leveltwo && top ? await findcategory(leveltwo, top._id) : null;

        if (levelthree) {
            // find exact leaf category
            const leaf = mid
                ? await findcategory(levelthree, mid._id)
                : top
                    ? await findcategory(levelthree, top._id)
                    : await findcategory(levelthree);

            if (!leaf) return { contents: [], currentpage: 1, totalpages: 0 };
            categoryids = [leaf._id];

        } else if (mid) {
            // all leaves under mid
            const leaves = await category.find({ parentcategory: mid._id });
            categoryids = [mid._id, ...leaves.map(c => c._id)];

        } else if (top) {
            // all mids and leaves under top
            const mids = await category.find({ parentcategory: top._id });
            const midids = mids.map(c => c._id);
            const leaves = await category.find({ parentcategory: { $in: midids } });
            categoryids = [top._id, ...midids, ...leaves.map(c => c._id)];
        }

        if (categoryids.length === 0) return { contents: [], currentpage: 1, totalpages: 0 };
        query = query.where("category").in(categoryids);
    }

    // ✅ FILTERS
    if (color) {
        const colorregex = new RegExp(
            color.split(",").map(c => c.trim()).join("|"), "i"
        );
        query = query.where("color").regex(colorregex);
    }

    if (size) {
        query = query.where("size.name").in(
            size.split(",").map(s => s.trim().toUpperCase())
        );
    }

    if (minprice !== 0 || maxprice !== 0) {
        query = query.where("discountedprice").gte(minprice).lte(maxprice);
    }

    if (mindiscount > 0) {
        query = query.where("discountpercent").gte(mindiscount);
    }

    if (stock === "in_stock") query = query.where("quantity").gt(0);
    else if (stock === "out_of_stock") query = query.where("quantity").lt(1);

    // ✅ SORTING
    const sortmap = {
        price_high: { discountedprice: -1 },
        price_hi_to_low: { discountedprice: -1 },
        price_low: { discountedprice: 1 },
        price_low_to_high: { discountedprice: 1 },
        newest: { createdat: -1 },
        rating: { numratings: -1 },
        discount: { discountpercent: -1 },
    };
    query = query.sort(sortmap[sort] || { discountedprice: 1 });

    // ✅ PAGINATION
    const totalproduct = await product.countDocuments(query.getQuery());
    const totalpages = Math.ceil(totalproduct / pagesize);
    const skip = (pagenumber - 1) * pagesize;
    query = query.skip(skip).limit(pagesize);

    const prod = await query.exec();
    return { contents: prod, currentpage: pagenumber, totalpages };
};


// const getallproduct = async (reqquery) => {
//     let {
//         levelone,   // e.g. "Men"
//         leveltwo,   // e.g. "clothing"
//         levelthree, // e.g. "pants"
//         color,
//         size,
//         minprice,
//         maxprice,
//         mindiscount,
//         sort,
//         stock,
//         pagenumber,
//         pagesize
//     } = reqquery;

//     pagesize = Number(pagesize) || 10;
//     pagenumber = Number(pagenumber) || 1;
//     minprice = Number(minprice);
//     maxprice = Number(maxprice);
//     mindiscount = Number(mindiscount);

//     let query = product.find().populate("category");

//     // ✅ CATEGORY FILTER — walk the hierarchy to get the right category
//     if (levelthree) {
//         // Find the top-level parent (e.g. "Men")
//         let parentCategory = null;
//         if (levelone) {
//             parentCategory = await category.findOne({
//                 name: { $regex: new RegExp(`^${levelone}$`, 'i') },
//                 parentcategory: null  // top-level has no parent
//             });
//         }

//         // Find the second level (e.g. "clothing") under the parent
//         let midCategory = null;
//         if (leveltwo && parentCategory) {
//             midCategory = await category.findOne({
//                 name: { $regex: new RegExp(`^${leveltwo}$`, 'i') },
//                 parentcategory: parentCategory._id
//             });
//         }

//         // Find the exact category (e.g. "pants") under mid-level
//         let targetCategory = null;
//         if (midCategory) {
//             targetCategory = await category.findOne({
//                 name: { $regex: new RegExp(`^${levelthree}$`, 'i') },
//                 parentcategory: midCategory._id
//             });
//         } else if (parentCategory) {
//             // fallback: find under parent directly
//             targetCategory = await category.findOne({
//                 name: { $regex: new RegExp(`^${levelthree}$`, 'i') },
//                 parentcategory: parentCategory._id
//             });
//         } else {
//             // last fallback: just match by name
//             targetCategory = await category.findOne({
//                 name: { $regex: new RegExp(`^${levelthree}$`, 'i') }
//             });
//         }

//         if (targetCategory) {
//             query = query.where("category").equals(targetCategory._id);
//         } else {
//             return { contents: [], currentpage: 1, totalpages: 0 };
//         }

//     } else if (leveltwo) {
//         // No levelthree — find all products under leveltwo
//         const parentCategory = levelone
//             ? await category.findOne({ name: { $regex: new RegExp(`^${levelone}$`, 'i') }, parentcategory: null })
//             : null;

//         const midCategory = await category.findOne({
//             name: { $regex: new RegExp(`^${leveltwo}$`, 'i') },
//             ...(parentCategory ? { parentcategory: parentCategory._id } : {})
//         });

//         if (midCategory) {
//             // Get all child categories under this mid level
//             const childCategories = await category.find({ parentcategory: midCategory._id });
//             const childIds = childCategories.map(c => c._id);
//             childIds.push(midCategory._id);
//             query = query.where("category").in(childIds);
//         } else {
//             return { contents: [], currentpage: 1, totalpages: 0 };
//         }

//     } else if (levelone) {
//         // Only levelone — find all products under this top level
//         const topCategory = await category.findOne({
//             name: { $regex: new RegExp(`^${levelone}$`, 'i') },
//             parentcategory: null
//         });

//         if (topCategory) {
//             const midCategories = await category.find({ parentcategory: topCategory._id });
//             const midIds = midCategories.map(c => c._id);

//             const leafCategories = await category.find({ parentcategory: { $in: midIds } });
//             const leafIds = leafCategories.map(c => c._id);

//             const allIds = [topCategory._id, ...midIds, ...leafIds];
//             query = query.where("category").in(allIds);
//         } else {
//             return { contents: [], currentpage: 1, totalpages: 0 };
//         }
//     }

//     // ✅ COLOR FILTER
//     if (color) {
//         const colorSet = new Set(color.split(",").map(item => item.trim().toLowerCase()));
//         if (colorSet.size > 0) {
//             const colorRegex = new RegExp([...colorSet].join("|"), "i");
//             query = query.where("color").regex(colorRegex);
//         }
//     }

//     // ✅ SIZE FILTER
//     if (size) {
//         const sizes = size.split(",").map(s => s.trim().toUpperCase());
//         query = query.where("size.name").in(sizes);
//     }

//     // ✅ PRICE FILTER
//     if (!isNaN(minprice) && !isNaN(maxprice) && (minprice !== 0 || maxprice !== 0)) {
//         query = query.where("discountedprice").gte(minprice).lte(maxprice);
//     }

//     // ✅ DISCOUNT FILTER
//     if (!isNaN(mindiscount) && mindiscount > 0) {
//         query = query.where("discountpercent").gte(mindiscount);
//     }

//     // ✅ STOCK FILTER
//     if (stock) {
//         if (stock === "in_stock") query = query.where("quantity").gt(0);
//         else if (stock === "out_of_stock") query = query.where("quantity").lt(1);
//     }

//     // ✅ SORTING
//     if (sort === "price_high" || sort === "price_hi_to_low") {
//         query = query.sort({ discountedprice: -1 });
//     } else if (sort === "price_low" || sort === "price_low_to_high") {
//         query = query.sort({ discountedprice: 1 });
//     } else if (sort === "newest") {
//         query = query.sort({ createdAt: -1 });
//     } else if (sort === "rating") {
//         query = query.sort({ numratings: -1 });
//     } else if (sort === "discount") {
//         query = query.sort({ discountpercent: -1 });
//     } else {
//         query = query.sort({ discountedprice: 1 });
//     }

//     // ✅ COUNT before pagination
//     const totalproduct = await product.countDocuments(query.getQuery());
//     const totalpages = Math.ceil(totalproduct / pagesize);

//     // ✅ PAGINATION
//     const skip = (pagenumber - 1) * pagesize;
//     query = query.skip(skip).limit(pagesize);

//     const prod = await query.exec();

//     return { contents: prod, currentpage: pagenumber, totalpages };
// };
const createmultipleproduct = async (products) => {
    for (let product of products) {
        await createproduct(product);
    }
}

module.exports = {
    createmultipleproduct,
    createproduct,
    deleteproduct,
    updateproduct,
    findproductbyid,
    getallproduct
}