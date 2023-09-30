import {
    collection,
    db,
    getDoc,
    doc,
    getDocs,
    updateDoc,
    query,
    where,
    deleteDoc,
    addDoc,
} from '../firebase/firebaseConfig.js'


const createInventoryCat = async (req, res) => {
    const data = req.body;
    try {
        const docRef = await addDoc(collection(db, "InventoryCat"), data);
        const categoryId = docRef.id
        await updateDoc(docRef, { categoryId: categoryId })
            .then(() => {
                res.status(200).json({
                    status: "Success",
                    message: "Inventory is sucessfullt added!",
                    data: docRef
                })
            }).catch(() => {
                res.status(400).json({
                    status: "failed",
                    message: "Something went wrong",
                })
            });

    }
    catch (error) {
        console.log(error);
    }
}





const getInventoryCat = async (req, res) => {
   const invCatId = req.params.id
    try {
        console.log("Params =====> ", invCatId);

        if (invCatId !== undefined) {
            const q = query(collection(db, "InventoryCat"), where("categoryId", "==", invCatId));
            console.log("Query===========>>>>>>>>>>", q);

            const querySnapshot = await getDocs(q);
            // console.log("query snapshot", querySnapshot);

            querySnapshot.forEach((doc) => {
                var data = doc.data();
                if (data.categoryId === invCatId) {
                    res.status(200).json({
                        status: "Success",  
                        data: data,
                    });
                }
            });
            res.status(404).json({
                status: "Not found",
                message: "Something went wrong",
            });
            
        } else {
            const querySnapshot = await getDocs(collection(db, "InventoryCat"));
            const dataArr = [];

            querySnapshot.forEach((doc) => {
                dataArr.push(doc.data());
            })
            console.log(dataArr);

            res.status(200).json({
                status: "Success",
                data: dataArr
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "Failed",
            message: "Something went wrong",
        });
    }
};


const updateInventoryCat = async (req, res) => {
    const InventoryCatId = req.params.id
    const updatedData = req.body;
    try {
        const inventoryCat = doc(db, "InventoryCat", InventoryCatId)
        await updateDoc(inventoryCat, updatedData).then(
            res.status(200).json({
                status: "Success",
                message: "inventory category updated!",
                data: updatedData
            }))

        res.status(400).json({
            status: "failed",
            message: "Something went wrong",
        })

        console.log(updatedData);

    }
    catch (error) {
        console.log(error);
    }
}

const deleteInventoryCat = async (req, res) => {
    await deleteDoc(doc(db, "InventoryCat", req.params.id)).then(
        res.status(200).json({
            status: "Success",
            message: "Inventory category deleted successfully",
        })
    )

    res.status(400).json({
        status: "failed",
        message: "Something went wrong",
    })
}







export { createInventoryCat, getInventoryCat, deleteInventoryCat, updateInventoryCat }