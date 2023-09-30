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


const createBusRouteStop = async (req, res) => {
    try {
        const querySnapshot = await getDocs(collection(db, "Routes"));

        let dataArr = [];  // Initialize an array to store terminal data

        querySnapshot.forEach((doc) => {
            const routes = doc.data();
            dataArr.push(routes);
        });

        const routesIdAndName = dataArr.map((routes) => {
            return {
                routesId: routes.routesId,
                routesName: routes.name,
            }
        })

        console.log("terminalIdAndName", routesIdAndName);
        console.log("dataArr ===>>>", dataArr);
        console.log("Number of terminals ===>>>", dataArr.length);  // Print the number of terminals

        const data = req.body;


        const docRef = await addDoc(collection(db, "RoutesStop"), data);
        const routesStopId = docRef.id
        await updateDoc(docRef, {
            routesStopId: routesStopId,
        }).then(() => {
            res.status(200).json({
                status: "Success",
                message: "Your route stop is added successfully",
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


const readBusRoutesStop = async (req, res) => {
    const routeStopId = req.params.id;
    try {
        if (routeStopId !== undefined) {
            const q = query(collection(db, "RoutesStop"), where("routesStopId", "==", routeStopId));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                var data = doc.data();
                if (data.routesStopId === routeStopId) {
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
            const querySnapshot = await getDocs(collection(db, "RoutesStop"));
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


const updateBusRoutesStop = async (req, res) => {
    const routeStopId = req.params.id
    const updatedData = req.body;
    try {
        const routeStopRef = doc(db, "RoutesStop", routeStopId);
        await updateDoc(routeStopRef, updatedData).then(
            res.status(200).json({
                status: "Success",
                message: "bus route stop updated!",
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


const deleteBusRoutesStop = async (req, res) => {
    await deleteDoc(doc(db, "RoutesStop", req.params.id))
        .then(() => {
            res.status(200).json({
                status: "Success",
                message: "Delete suessfully",
            })
        }).catch((err) => {
            res.status(400).json({
                status: "failed",
                message: err,
            })
        });
    //     .then(

    //     ).catch(error) {

    // }

    console.log("Deleted");


}




export { createBusRouteStop, readBusRoutesStop, updateBusRoutesStop, deleteBusRoutesStop }