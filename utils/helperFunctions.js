import axios from "axios"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const handleStopEngine = async () => {


    await axios
        .post(`http://localhost:4000/stop-engine`)
        .then((response) => {
            console.log(response, "stop-engine");
            if (response) {
                toast.success("Engine stopped!", {
                    position: toast.POSITION.TOP_CENTER,
                });
            } else {
                toast.error(" Error stopping  database  !", {
                    position: toast.POSITION.TOP_CENTER,
                });
            }

            console.log("User deleted successfully!");
        })
        .catch((error) => {
            // console.log('Error:', error.message);
        });
};



export const handleClear = async () => {
    toast.warn("clearing database !", {
        position: toast.POSITION.TOP_CENTER,
    });
    await axios
        .delete("http://localhost:4000/clear-database")
        .then((response) => {
            console.log(response);
            if (response) {
                toast.success("Cleared database succesfully !", {
                    position: toast.POSITION.TOP_CENTER,
                });
            } else {
                toast.error(" Error clearing database  !", {
                    position: toast.POSITION.TOP_CENTER,
                });
            }

        })
        .catch((error) => {
            // console.log('Error:', error.message);
        });
};




export function handleReload() {
    window.location.reload();
    toast.success("Page reloaded !", {
        position: toast.POSITION.TOP_CENTER,
    });
}






