import { auth, signInWithEmailAndPassword  } from '.././firebase/firebaseConfig.js'

const getUser = async (req, res) => {

    try {
        console.log("getUser working properly!")

        const userCredentials = await signInWithEmailAndPassword(auth, req.body.email, req.body.password)

        if (userCredentials) {
            console.log(userCredentials.user.uid)
            res.status(200).json({
                status: "success",
                message: "User is login",
                data: userCredentials.user
            })
        }
        else {
            console.log("User not found")
            res.status(404).json({
                status: "failed",
                message: "User not found",
            })
        }


    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)````
        console.log(errorMessage)

        if (errorCode === "auth/wrong-password") {
            return alert("Wrong Password!")
        }
        if (errorCode === "auth/user-not-found") {
            return alert("Wrong Email!")
        }
    }

}


export default getUser 