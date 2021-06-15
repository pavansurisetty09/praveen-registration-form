// import React, { Component } from "react";
// import "../App.css";

// class Form extends Component {
//   onSubmit = (e) => {
//     e.preventDefault();
//     this.props.submitData();
//   };

//   onChange = (e) => {
//     this.props.change(e.target.name, e.target.value);
//   };

//   render() {
//     return (
//       <div className="body">
//         <form className="center">
//           <div className="form-row">
//             <div className="form-group col-md-6">
//               <label className="float">First Name :</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="firstname"
//                 placeholder="Enter First Name"
//                 value={this.props.data.firstname}
//                 name="firstname"
//                 onChange={this.onChange}
//               />
//               <div className="error">
//                 {this.props.errors.firstname ? "Name is required" : ""}
//               </div>
//             </div>

//             <div className="form-group col-md-6">
//               <label className="float">Last Name :</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="lastname"
//                 name="lastname"
//                 placeholder="Enter Last Name"
//                 value={this.props.data.lastname}
//                 onChange={this.onChange}
//               />
//               <div className="error">
//                 {this.props.errors.lastname ? "Name is required " : ""}
//               </div>
//             </div>
//           </div>
//           <div className="form-row">
//             <div className="form-group col-md-6">
//               <label className="float">Age :</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 id="age"
//                 name="age"
//                 placeholder="Enter Age"
//                 value={this.props.data.age}
//                 onChange={this.onChange}
//               />
//               <div className="error">
//                 {this.props.errors.age ? "Age is required" : ""}
//               </div>{" "}
//             </div>

//             <div className="form-group col-md-6">
//               <div>
//                 <fieldset className="form-group">
//                   <div className="row">
//                     <legend className="col-form-label col-sm-2 pt-0">
//                       Gender:
//                     </legend>
//                     <div className="col-sm-10">
//                       <div>
//                         <input
//                           className="form-check-input"
//                           type="radio"
//                           name="gender"
//                           id="male"
//                           value="male"
//                           onClick={this.onChange}
//                           checked={this.props.data.gender === "male"}
//                         />
//                         <label>Male</label>
//                       </div>
//                       <div>
//                         <input
//                           className="form-check-input"
//                           type="radio"
//                           name="gender"
//                           id="female"
//                           value="female"
//                           onClick={this.onChange}
//                           checked={this.props.data.gender === "female"}
//                         />
//                         <label>Female</label>
//                       </div>
//                     </div>
//                   </div>
//                 </fieldset>
//                 <div className="error">
//                   {this.props.errors.gender ? "please select gender" : ""}
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div>
//             <button className="submit" onClick={this.onSubmit}>
//               {this.props.currentId != -1 ? "Update" : "Submit"}
//             </button>
//             <button
//               className="submit"
//               style={{ backgroundColor: "grey" }}
//               onClick={this.props.clearFields}
//             >
//               {" "}
//               Clear
//             </button>
//           </div>
//         </form>
//       </div>
//     );
//   }
// }

// export default Form;
