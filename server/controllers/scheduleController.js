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



const createSchedule = async (req, res) => {
    try {
        // getting routes id and name so we can add it to schedule data
        const querySnapshotOfRoutes = await getDocs(collection(db, "Routes"));

        let dataArrOfRoutes = [];  // Initialize an array to store terminal data

        querySnapshotOfRoutes.forEach((doc) => {
            const routes = doc.data();
            dataArrOfRoutes.push(routes);
        });

        const routesIdAndName = dataArrOfRoutes.map((routes) => {
            return {
                routesId: routes.routesId,
                routesName: routes.name,
            }
        })

        console.log("terminalIdAndName", routesIdAndName);
        console.log("dataArr ===>>>", dataArrOfRoutes);
        console.log("Number of terminals ===>>>", dataArrOfRoutes.length);  // Print the number of terminals


        const querySnapshotOfBusCat = await getDocs(collection(db, "InventoryCat"));

        let dataArrOfBusCat = [];  // Initialize an array to store terminal data

        querySnapshotOfBusCat.forEach((doc) => {
            const routes = doc.data();
            dataArrOfBusCat.push(routes);
        });

        const busCatIdAndName = dataArrOfBusCat.map((routes) => {
            return {
                routesId: routes.routesId,
                routesName: routes.name,
            }
        })

        console.log("terminalIdAndName", busCatIdAndName);
        console.log("dataArr ===>>>", dataArrOfRoutes);
        console.log("Number of terminals ===>>>", dataArrOfRoutes.length);

        const data = req.body;

        const docRef = await addDoc(collection(db, "Schedule"), data);
        const ScheduleId = docRef.id
        await updateDoc(docRef, {
            ScheduleId: ScheduleId,
        }).then(() => {
            res.status(200).json({
                status: "Success",
                message: "Schedule is added successfully",
                data: data,
            })
        }).catch((err) => {
            res.status(400).json({
                status: "failed",
                error: "error",
            })
        });
    } catch (err) {
        console.log(err);
    }
}


const readSchedule = async (req, res) => {
    const scheduleId = req.params.id;
    try {
        if (scheduleId !== undefined) {
            const q = query(collection(db, "Schedule"), where("ScheduleId", "==", scheduleId));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                var data = doc.data();
                if (data.ScheduleId === scheduleId) {
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
            const querySnapshot = await getDocs(collection(db, "Schedule"));
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


const updateSchedule= async (req, res) => {
    const scheduleId = req.params.id
    const updatedData = req.body;
    try {
        const scheduleRef = doc(db, "Schedule", scheduleId);
        await updateDoc(scheduleRef, updatedData).then(
            res.status(200).json({
                status: "Success",
                message: "schedule stop updated!",
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


const deleteSchedule = async (req, res) => {
    await deleteDoc(doc(db, "Schedule", req.params.id))
    .then(() => {
        res.status(200).json({
            status: "Success",
            message: "Delete successfully",
        })
    }).catch((err) => {
        res.status(400).json({
            status: "failed",
            message: err,
        })
    });

    console.log("Deleted");

}


export { createSchedule, readSchedule, updateSchedule, deleteSchedule }