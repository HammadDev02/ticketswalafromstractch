
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



const postUsers = async (req, res) => {
    const data = req.body;
    try {
        const docRef = await addDoc(collection(db, "Users"), data);
        const userId = docRef.id
        await updateDoc(docRef, {
            userId: userId,
        }).then(() => {
            res.status(200).json({
                status: "Success",
                message: "User is added!",
                data: data
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

const getUsers = async (req, res) => {
    const userId = req.params.id;
    try {
        if (userId !== undefined) {
            const q = query(collection(db, "Users"), where("userId", "==", userId));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                var data = doc.data();
                if (data.userId === userId) {
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
            const querySnapshot = await getDocs(collection(db, "Users"));
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



const updateUser = async (req, res) => {
    const userId = req.params.id
    const updatedData = req.body;
    try {
        const userRef = doc(db, "Users", userId);
        const updatedDoc = await updateDoc(userRef, updatedData).then(
            res.status(200).json({
                status: "Success",
                message: "User updated!",
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



const deleteUser = async (req, res) => {
    await deleteDoc(doc(db, "Users", req.params.id)).then(
        res.status(200).json({
            status: "Success",
            message: "User deleted successfully",
        })
    )

    res.status(400).json({
        status: "failed",
        message: "Something went wrong",
    })
}



export { postUsers, getUsers, updateUser, deleteUser }