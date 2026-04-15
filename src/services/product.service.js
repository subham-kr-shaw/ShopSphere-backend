const category = require("../models/category");
const product = require("../models/product.model");


const createproduct = async (reqdata) => {
    let toplevel = await category.findOne({ name: reqdata.toplevelcategory });
    console.log(reqdata);
    if (!toplevel) {
        toplevel = await new category({
            name: reqdata.toplevelcategory,
            level: 1,
        }).save()
    }

    let secondlevel = await category.findOne({
        name: reqdata.secondlevelcategory,
        parentcategory: toplevel._id,
    })

    if (!secondlevel) {
        secondlevel = await new category({
            name: reqdata.secondlevelcategory,
            parentcategory: toplevel._id,
            level: 2,
        }).save()
    }

    let thirdlevel = await category.findOne({
        name: reqdata.thirdlevelcategory,
        parentcategory: secondlevel._id,
    })

    if (!thirdlevel) {
        thirdlevel = await new category({
            name: reqdata.thirdlevelcategory,
            parentcategory: secondlevel._id,
            level: 3,
        }).save()
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
    })

    const savedProducts = await products.save();
    return savedProducts;
}

const deleteproduct = async (productid) => {
    const pro = await findproductbyid(productid);

    await product.findByIdAndDelete(productid);
    return "successfully deleted product";
}

const updateproduct = async (productid, reqdata) => {
    return await product.findByIdAndUpdate(productid, reqdata);
}

const findproductbyid = async (productid) => {
    const prod = await product.findById(productid).populate("category").exec();

    if (!prod) throw new Error("product not found", +productid);
    return prod;
}

// const getallproduct = async (reqquery) => {
//     let { cat, color, size, minprice, maxprice, mindiscount, sort, stock, pagenumber, pagesize } = reqquery;
//     pagesize = pagesize || 10;

//     let query = product.find().populate("category");

//     if (cat) {
//         const existcategory = await category.findOne({ name: cat });
//         if (existcategory) {
//             query = query.where("category").equals(existcategory._id);
//         }
//         else {
//             return { content: [], currentpage: 1, totalpages: 0 }
//         }
//     }

//     /*color:"red,red,BLUE" ---->(use set so remove duplicate)
//     we use .split [red,red,BLUE] --->(map does trim and lowercase for letter)
//     [red,red,blue] --->{red,blue}(due to map);
//     we convert into regx "red|blue" by join('|') methid and use of 'i'
//     we use i so that it should consider all the product irrespective of caps,lower, mix of given words
//     at finally the regex is "/red|blue/i";
//     at finally it return the product to query based on this info
//     NOTE!! if u want to get product for that specific wording example['red','blue']
//     use query.where('color').in([...colorset]);*/


//     if (color) {
//         const colorp = new Set(color.split(",").map((items) => items.trim().toLowerCase()));
//         const colorregex = colorp.size > 0 ? new RegExp([...colorp].join("|"), "i") : null;

//         query = query.where("color").regex(colorregex);
//     }
//     // if(size){
//     //    const sz=new Set(size);
//     //    query=await query.where("size").in([...sz]);
//     // }
//     if (size) {
//         const sizes = size.split(",");

//         query = query.where("size.name").in(
//             sizes.map(s => s.trim().toUpperCase())
//         );
//     }

//     if (minprice && maxprice) {
//         query = query.where('price').gte(minprice).lte(maxprice);
//     }

//     if (stock) {
//         if (stock == "in_stock") query = (query.where("quantity")).gt(0);
//         else query = (query.where("quantity")).lt(1);
//     }
//     if (sort) {
//         const sortdirection = sort === "price_hi_to_low" ? -1 : 1;
//         query = query.sort({ discountedprice: sortdirection })
//     }
//     // const totalproduct = await product.countDocuments(query);
//     const totalproduct = await product.countDocuments(query.getQuery());
//     const skip = (pagenumber - 1) * pagesize;
//     query = query.skip(skip).limit(pagesize)

//     const prod = await query.exec();
//     const totalpages = Math.ceil(totalproduct / pagesize);
//     return { contents: prod, currentpage: pagenumber, totalpages }

// }
const getallproduct = async (reqquery) => {
    let {
        cat,
        color,
        size,
        minprice,
        maxprice,
        mindiscount,
        sort,
        stock,
        pagenumber,
        pagesize
    } = reqquery;

    // ✅ defaults
    pagesize = Number(pagesize) || 10;
    pagenumber = Number(pagenumber) || 1;
    minprice = Number(minprice);
    maxprice = Number(maxprice);
    mindiscount = Number(mindiscount);

    let query = product.find().populate("category");

    // ✅ CATEGORY FILTER
    if (cat) {
        const existcategory = await category.findOne({ name: cat });
        if (existcategory) {
            query = query.where("category").equals(existcategory._id);
        } else {
            return { contents: [], currentpage: 1, totalpages: 0 };
        }
    }

    // ✅ COLOR FILTER
    if (color) {
        const colorSet = new Set(
            color.split(",").map(item => item.trim().toLowerCase())
        );

        const colorRegex = colorSet.size > 0
            ? new RegExp([...colorSet].join("|"), "i")
            : null;

        if (colorRegex) {
            query = query.where("color").regex(colorRegex);
        }
    }

    // ✅ SIZE FILTER
    if (size) {
        const sizes = size.split(",").map(s => s.trim().toUpperCase());
        query = query.where("size.name").in(sizes);
    }

    // ✅ PRICE FILTER (FIXED)
    if (!isNaN(minprice) && !isNaN(maxprice) && (minprice !== 0 || maxprice !== 0)) {
        query = query.where("price").gte(minprice).lte(maxprice);
    }

    // ✅ DISCOUNT FILTER
    if (!isNaN(mindiscount) && mindiscount > 0) {
        query = query.where("discountpercent").gte(mindiscount);
    }

    // ✅ STOCK FILTER (FIXED ❌ removed await)
    if (stock) {
        if (stock === "in_stock") {
            query = query.where("quantity").gt(0);
        } else if (stock === "out_of_stock") {
            query = query.where("quantity").lt(1);
        }
    }

    // ✅ SORTING
    if (sort) {
        const sortDirection = sort === "price_hi_to_low" ? -1 : 1;
        query = query.sort({ discountedprice: sortDirection });
    }

    // ✅ COUNT FIX (IMPORTANT)
    const totalproduct = await product.countDocuments(query.getQuery());

    // ✅ PAGINATION
    const skip = (pagenumber - 1) * pagesize;
    query = query.skip(skip).limit(pagesize);

    // ✅ EXECUTE QUERY
    const prod = await query.exec();

    const totalpages = Math.ceil(totalproduct / pagesize);

    return {
        contents: prod,
        currentpage: pagenumber,
        totalpages
    };
};
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