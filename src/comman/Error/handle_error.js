import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ShowErrorMessage(err, props) {
  let errText = "";

  if (err.data) {
    if (err.data.message) {
      errText = err.data.message;
    } else if (err.data.errors) {
      if (typeof err.data.errors === "object") {
        errText = Object.values(err.data.errors).join(", ");
      } else {
        errText = err.data.errors;
      }
    } else if (err.data.err) {
      errText = err.data.err;
    }
  }

  if (!errText) {
    errText = "Something went wrong";
  }

  toast.error(errText, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}
