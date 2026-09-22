import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const AddAppointment = () => {

  const patient = JSON.parse(sessionStorage.getItem("active-patient"));

  const [appointment, setAppointment] = useState({
    patientId: "",
    problem: "",
  });

  appointment.patientId = patient.id;

  const handleUserInput = (e) => {
    setAppointment({ ...appointment, [e.target.name]: e.target.value });
  };

  const saveAppointment = (event) => {
    event.preventDefault();
    fetch("/api/appointment/patient/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointment),
    }).then((result) => {
      
      toast.success("Appointment Added Successfully!!!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
     
      result
        .json()
        .then((res) => {
          console.log("response", res);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2">
        <div
          className="card form-card border-color text-color custom-bg"
          style={{ width: "25rem" }}
        >
          <div className="card-header bg-color custom-bg-text text-center">
            <h5 className="card-title">Take Appointment</h5>
          </div>
          <div className="card-body">
            <form onSubmit={saveAppointment}>
              
              
              <div className="mb-3">
                <label className="form-label">
                  <b>Select Regional Clinic Branch</b>
                </label>
                <select
                  name="clinicBranchId"
                  onChange={handleUserInput}
                  className="form-control"
                  value={appointment.clinicBranchId}
                  required
                >
                  <option value="1">Branch 1 - North Regional Ambulatory Clinic</option>
                  <option value="2">Branch 2 - South Ambulatory & Urgent Care</option>
                  <option value="3">Branch 3 - Central City Ambulatory Clinic</option>
                  <option value="4">Branch 4 - Eastside Health & Pediatrics</option>
                  <option value="5">Branch 5 - West Ambulatory Care Pavilion</option>
                  <option value="6">Branch 6 - Metro Outpatient & Specialty Center</option>
                </select>
              </div>

              <div className="mb-3 text-color">
                <label htmlFor="title" className="form-label">
                  <b>Problem</b>
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="problem"
                  name="problem"
                  onChange={handleUserInput}
                  value={appointment.problem}
                  placeholder="mention your problems here..."
                />
              </div>
              <div className="mb-3 text-color">
                <label htmlFor="description" className="form-label">
                  <b>Appointment Date</b>
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="appointmentDate"
                  name="appointmentDate"
                  onChange={handleUserInput}
                  value={appointment.appointmentDate}
                />
              </div>

              <input
                type="submit"
                className="btn bg-color custom-bg-text"
                value="Take Appointment"
              />

              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAppointment;
