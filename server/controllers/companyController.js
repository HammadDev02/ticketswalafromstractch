import { collection, db, getDoc, doc, getDocs, updateDoc, query, where, deleteDoc, addDoc, getStorage, ref, uploadBytesResumable, getDownloadURL, storage, uploadBytes } from '../firebase/firebaseConfig.js'

const currentDate = new Date();
console.log(currentDate);

//Configuration for Multer




// // POST API
const registerCompany = async (req, res) => {
    var data = req.body;
    const fileDetails = req.file;
    try {
        const imageRef = ref(storage, `images/${fileDetails.originalname}`);
        const metatype = { contentType: fileDetails.mimetype, name: fileDetails.originalname };
        await uploadBytes(imageRef, fileDetails.buffer, metatype);
        data.logoUrl = `https://firebasestorage.googleapis.com/v0/b/ticketswala-a6d58.appspot.com/o/images%2F${fileDetails.originalname}?alt=media`;
        let dataArr = []
        const docRef = await addDoc(collection(db, "Companies"), data);
        
        const companyId = docRef.id
        await updateDoc(docRef, {
            companyId: companyId,
            createdOn: currentDate
        }).then((result) => {
            res.status(200).json({
                status: "Success",
                message: "You are successfully registered!",
                data: data
            })
        }).catch((err) => {
            res.status(400).json({
                status: "failed",
                message: "Something went wrong",
            })
        });
    } catch (error) {
        console.log(error);
    }
};

// Function for GET particular company
const getAllCompanies = async (req, res) => {
    const companyId = req.params.id;
    try {
        if (companyId !== undefined) {
            const q = query(collection(db, "Companies"), where("companyId", "==", companyId));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                var data = doc.data();
                if (data.companyId === companyId) {
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
            const querySnapshot = await getDocs(collection(db, "Companies"));
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


// // PUT API
const updateCompany = async (req, res) => {
    const companyId = req.params.id
    const updatedData = req.body;
    const currentDate = new Date();
    console.log(currentDate);
    try {
        const companyRef = doc(db, "Companies", companyId);
        await updateDoc(companyRef, updatedData).then(
            res.status(200).json({
                status: "Success",
                message: "Company updated!",
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


// // DELETE API
const deleteCompany = async (req, res) => {
    await deleteDoc(doc(db, "Companies", req.params.id)).then(
        res.status(200).json({
            status: "Success",
            message: "Company deleted successfully",
        })
    )

    res.status(400).json({
        status: "failed",
        message: "Something went wrong",
    })
}

export { registerCompany, getAllCompanies, deleteCompany, updateCompany };











