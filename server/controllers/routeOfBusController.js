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


const createBusRoute = async (req, res) => {
    try {
        const querySnapshot = await getDocs(collection(db, "Terminal"));

        let dataArr = [];  // Initialize an array to store terminal data

        querySnapshot.forEach((doc) => {
            const terminal = doc.data();
            dataArr.push(terminal);
        });

      

        const terminalIdAndName = dataArr.map((terminal) => {
            return {
                terminalId: terminal.terminalId,
                terminalName: terminal.name,
            }
        })

        if(!req.body.terminalid || !req.body.departureid) {
            res.status(400).json({
                status: "failed",
                message: "terminal and departurte is missing"
            })
        }


        console.log("terminalIdAndName=====>>>>>>>", terminalIdAndName);
        console.log("dataArr ===>>>", dataArr);
        console.log("Number of terminals ===>>>", dataArr.length);  // Print the number of terminals

        const data = req.body;




        const docRef = await addDoc(collection(db, "Routes"), data);
        const routesId = docRef.id
        await updateDoc(docRef, {
            routesId: routesId,
        }).then(() => {
            res.status(200).json({
                status: "Success",
                message: "Your route is added successfully",
                data: data,
            })
        }).catch(() => {
            res.status(400).json({
                status: "failed",
                error: error,
            })
        });


    }
    catch (error) {
        console.log(error);
    }


}


const readBusRoutes = async (req, res) => {
    const routeId = req.params.id;
    try {
        if (routeId !== undefined) {
            const q = query(collection(db, "Routes"), where("routesId", "==", routeId));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                var data = doc.data();
                if (data.routesId === routeId) {
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
            const querySnapshot = await getDocs(collection(db, "Routes"));
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
        res.status(400).json({
            status: "Failed",
            message: "Something went wrong",
        });
    }
};


const updateBusRoutes = async (req, res) => {
    const routeId = req.params.id
    const updatedData = req.body;
    try {
        const routeRef = doc(db, "Routes", routeId);
        await updateDoc(routeRef, updatedData).then(
            res.status(200).json({
                status: "Success",
                message: "bus route updated!",
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


const deleteBusRoutes = async (req, res) => {
    await deleteDoc(doc(db, "Routes", req.params.id)).then(
        res.status(200).json({
            status: "Success",
            message: "bus route deleted successfully",
        })
    )

    res.status(400).json({
        status: "failed",
        message: "Something went wrong",
    })
}





export { createBusRoute, readBusRoutes, updateBusRoutes, deleteBusRoutes }