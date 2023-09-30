
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



const postTerminal = async (req, res) => {
    const data = req.body;
    try {
        const docRef = await addDoc(collection(db, "Terminal"), data);
        const terminalId = docRef.id
        await updateDoc(docRef, {
            terminalId: terminalId,
        });

        if (docRef) {
            res.status(200).json({
                status: "Success",
                message: "Route is added!",
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



const getTerminal = async (req, res) => {
    const terminalId = req.params.id;
    try {
        if (req.params.id !== undefined) {
            const q = query(collection(db, "Terminal"), where("terminalId", "==", terminalId));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                var data = doc.data();
                if (data.terminalId === terminalId) {
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
            const querySnapshot = await getDocs(collection(db, "Terminal"));
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




const updateTerminal = async (req, res) => {
    const terminalId = req.params.id
    const updatedData = req.body;
    try {
        const terminalRef = doc(db, "Terminal", terminalId);
        await updateDoc(terminalRef, updatedData).then(
            res.status(200).json({
                status: "Success",
                message: "Terminal updated!",
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


const deleteTerminal = async (req, res) => {
    await deleteDoc(doc(db, "Terminal", req.params.id)).then(
        res.status(200).json({
            status: "Success",
            message: "Terminal deleted successfully",
        })
    )

    res.status(400).json({
        status: "failed",
        message: "Something went wrong",
    })
}








export { postTerminal, getTerminal, updateTerminal,  deleteTerminal}