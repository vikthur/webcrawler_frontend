import axios from "axios"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const handleStopEngine = async () => {


    await axios
        .post(`http://localhost:5000/stop-engine`)
        .then((response) => {
            console.log(response, "stop-engine");
            toast.dismiss();
            if (response) {
                toast.success("Engine stopped!");
            } else {
                toast.error(" Error stopping  database  !");
            }

            console.log("User deleted successfully!");
        })
        .catch((error) => {
            // console.log('Error:', error.message);
        });
};



export const handleClear = async () => {
    toast.warn("clearing database !");
    await axios
        .delete("http://localhost:5000/clear-database")
        .then((response) => {
            console.log(response);
            toast.dismiss();
            if (response) {
                toast.success("Cleared database succesfully !");
            } else {
                toast.error(" Error clearing database  !");
            }

        })
        .catch((error) => {
            // console.log('Error:', error.message);
        });
};




export function handleReload() {
    window.location.reload();
    toast.success("Page reloaded !");
}






