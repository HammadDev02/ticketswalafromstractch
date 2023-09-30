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


const createStopSchedule = async (req, res) => {
    try {
        // getting routes id and name so we can add it to schedule data
        const querySnapshot = await getDocs(collection(db, "Schedule"));

        let dataArr = [];  // Initialize an array to store terminal data

        querySnapshot.forEach((doc) => {
            const schedule = doc.data();
            dataArr.push(schedule);
        });

        const scheduleIdAndName = dataArr.map((schedule) => {
            return {
                scheduleId: schedule.ScheduleId,
                scheduleName: schedule.name,
            }
        })

        console.log("terminalIdAndName", scheduleIdAndName);
        console.log("dataArr ===>>>", dataArr);
        console.log("Number of schedule ===>>>", dataArr.length);  // Print the number of terminals

        const data = req.body;

        const docRef = await addDoc(collection(db, "StopSchedule"), data);
        const stopScheduleId = docRef.id
        await updateDoc(docRef, {
            stopScheduleId: stopScheduleId,
        }).then(() => {
            res.status(200).json({
                status: "Success",
                message: "stop schedule is added successfully",
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


const readStopSchedule = async (req, res) => {
    const stopScheduleId = req.params.id;
    try {
        if (stopScheduleId !== undefined) {
            const q = query(collection(db, "StopSchedule"), where("stopScheduleId", "==", stopScheduleId));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                var data = doc.data();
                if (data.stopScheduleId === stopScheduleId) {
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
            const querySnapshot = await getDocs(collection(db, "StopSchedule"));
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            })
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


const updateStopSchedule = async (req, res) => {
    const stopScheduleId = req.params.id
    const updatedData = req.body;
    try {
        const stopScheduleRef = doc(db, "StopSchedule", stopScheduleId);
        await updateDoc(stopScheduleRef, updatedData).then(
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


const deleteStopSchedule = async (req, res) => {
    await deleteDoc(doc(db, "StopSchedule", req.params.id))
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





export { createStopSchedule, readStopSchedule, updateStopSchedule, deleteStopSchedule }