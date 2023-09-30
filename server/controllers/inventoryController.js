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

// POST API
const createInventory = async (req, res) => {
    const data = req.body;
    if (!data.categoryId || !data.regNo || !data.name) {
        res.status(400).json({
            status: "missing fields",
            message: "category id is required!",
        });
        return;
    }
    try {
        const querySnapshot = await getDocs(collection(db, "Inventory"));
        let existingInventory = false;
        querySnapshot.forEach(async (doc) => {
            let inventory = doc.data();
            if (data.regNo == inventory.regNo) {
                existingInventory = true;
            }
        })
        if (existingInventory) {
            res.status(400).json({
                status: "failed",
                message: "Inventory already exists!",
            });
            return;
        }

        let inventoryCat;

        const querySnapshotOfCat = await getDocs(collection(db, "InventoryCat"));
        querySnapshotOfCat.forEach((doc) => {
            inventoryCat = doc.data();
        })
        console.log("query snapshot =====>>>>>>", querySnapshotOfCat);
        console.log("category id ===>>>>>>>>>>", inventoryCat.categoryId);


        const docRef = await addDoc(collection(db, "Inventory"), data)
        const inventoryId = docRef.id
        await updateDoc(docRef, { inventoryId: inventoryId });
        return res.status(200).json({
            status: "success",
            message: "Inventory is successfully added!",
            data: data,
        });
    }
    catch (error) {
        console.log(error);
        res.end();
    }
}


const getInventory = async (req, res) => {
    try {
        const inventoryId = req.params.id
        console.log("id=====>>>>>", inventoryId);
        if (req.params.id !== undefined) {
            const q = query(collection(db, "Inventory"), where("inventoryId", "==", req.params.id));
            console.log("Query=====>>>>>>>", q);

            const querySnapshot = await getDocs(q);
            // console.log("query snapshot", querySnapshot);

            querySnapshot.forEach((doc) => {
                var data = doc.data();
                if (data.inventoryId === inventoryId) {
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
            const querySnapshot = await getDocs(collection(db, "Inventory"));
            const dataArr = [];

            querySnapshot.forEach((doc) => {
                dataArr.push(doc.data());
            })

            res.status(200).json({
                status: "Success",
                data: dataArr,
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


// update inventory
const updateInventory = async (req, res) => {
    const InventoryId = req.params.id
    const updatedData = req.body;
    try {
        const inventoryRef = doc(db, "Inventory", InventoryId);
        await updateDoc(inventoryRef, updatedData).then(
            res.status(200).json({
                status: "Success",
                message: "Company updated!",
                data: updatedData
            })
        )
        console.log("Updated!");

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







// deleteInventory
const deleteInventory = async (req, res) => {
    await deleteDoc(doc(db, "Inventory", req.params.id)).then(
        res.status(200).json({
            status: "Success",
            message: "Inventory deleted successfully",
        })
    )

    res.status(400).json({
        status: "failed",
        message: "Something went wrong",
    })
}











export { createInventory, getInventory, updateInventory, deleteInventory }




























// console.log(dataArr.doc.name);

// if(req.body.regNo === dataArr.)

//     const docRef = await addDoc(collection(db, "Inventory"), data);
//     const inventoryId = docRef.id
//     console.log(data.regNo);
//     await updateDoc(docRef, { inventoryId: inventoryId });
//     console.log(inventoryId);

//     if (data.regNo === inventoryId) {
//         res.status(400).json({
//             status: "failed",
//             message: "the reg no you are registering is already used by someone, please use another reg no",
//         })
//     }

//     if (docRef) {
//         res.status(200).json({
//             status: "Success",
//             message: "Inventory is sucessfully added!",
//             data: docRef
//         })
//     }

//     else {
//         res.status(400).json({
//             status: "failed",
//             message: "Something went wrong",
//         })
//     }

// }
// catch (error) {
//     console.log(error);
// }

