import React from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { ShowErrorMessage } from "../../comman/Error/handle_error";
const validationSchema = Yup.object().shape({
  image: Yup.mixed().required("Image is required"),
});

const Imageupload = () => {
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("image", values.image);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/upload/",
        formData
      );
      if (response) {
        Swal.fire({
          title: "Image upload successfully !",
          icon: "success",
        });
      }
    } catch (error) {
      ShowErrorMessage(error);
      console.error("Error uploading image:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <h2 className="mt-5 mb-4">Image Upload</h2>
      <Formik
        initialValues={{ image: null }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <div className="row">
              <div className="col-md-6">
                <Field name="image">
                  {({ field, form }) => (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        setFieldValue("image", event.currentTarget.files[0]);
                      }}
                      className="form-control mb-3"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-danger"
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Uploading..." : "Upload"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Imageupload;
