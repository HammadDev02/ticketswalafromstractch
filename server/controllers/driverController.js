
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



const postDriver = async (req, res) => {
    const data = req.body;
    try {
        const docRef = await addDoc(collection(db, "Drivers"), data);
        const driverId = docRef.id
        await updateDoc(docRef, {
            driverId: driverId,
        });

        if (docRef) {
            res.status(200).json({
                status: "Success",
                message: "driver is added!",
                data: data
            })
            console.log(data);
        }
        else {
            res.status(400).json({
                status: "failed",
                message: "Something went wrong",
            })
        }


    }
    catch (error) {
        console.log(error);
    }
}

const getDrivers = async (req, res) => {
    const driverId = req.params.id;
    try {
        if (driverId !== undefined) {
            const q = query(collection(db, "Drivers"), where("driverId", "==", driverId));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                var data = doc.data();
                if (data.driverId === driverId) {
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
            const querySnapshot = await getDocs(collection(db, "Drivers"));
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });
            res.status(200).json({
                status: "Success",
                data: data
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "Failed",
            message: "Something went wrong",
        });
    }
};



const updateDriver = async (req, res) => {
    const driverId = req.params.id
    const updatedData = req.body;
    try {
        const userRef = doc(db, "Drivers", driverId);
        const updatedDoc = await updateDoc(userRef, updatedData).then(
            res.status(200).json({
                status: "Success",
                message: "driver updated!",
                data: updatedData
            })
        )

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



const deleteDriver = async (req, res) => {
    await deleteDoc(doc(db, "Drivers", req.params.id)).then(
        res.status(200).json({
            status: "Success",
            message: "driver deleted successfully",
        })
    )

    res.status(400).json({
        status: "failed",
        message: "Something went wrong",
    })
}



export { postDriver, getDrivers, updateDriver, deleteDriver }