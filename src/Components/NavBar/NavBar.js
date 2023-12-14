import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom";

function NavBar() {

  const getInitialUser = () => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error('Error parsing user data from local storage', error);
        return null;
      }
    }
    return null;
  };

  const [user, setUser] = useState(getInitialUser());
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(getInitialUser());
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const signOut = async () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    navigate("/");
  };

  // const handleSignup = async (signupData) => {
  //   try {
  //     const response = await fetch('/api/signup', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(signupData),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Signup failed');
  //     }

  //     const userData = await response.json();
  //     localStorage.setItem('currentUser', JSON.stringify(userData));
  //     setUser(userData); // Update the user state
  //     navigate('/'); // Optionally redirect the user
  //   } catch (error) {
  //     console.error('There was an error during signup:', error);
  //   }
  // };


  const renderNavLinks = () => {
    switch (user?.role) {
      case 'reader':
        return (
          <>
            <NavLink className="nav-link" to="/" exact style={{ marginRight: '20px' }}>Home</NavLink>
            <NavLink className="nav-link" to="/profile" exact style={{ marginRight: '20px' }}>Profile</NavLink>
            <NavLink className="nav-link" to="/bookshowcase" exact style={{ marginRight: '20px' }}>Book Showcase</NavLink>
            <NavLink className="nav-link" to="/search" exact style={{ marginRight: '20px' }}>Search</NavLink>
          </>
        );
      case 'author':
        return (
          <>
            <NavLink className="nav-link" to="/" exact style={{ marginRight: '20px' }}>Home</NavLink>
            <NavLink className="nav-link" to="/profile" exact style={{ marginRight: '20px' }}>Profile</NavLink>
            <NavLink className="nav-link" to="/myworks" exact style={{ marginRight: '20px' }}>My Works</NavLink>
            <NavLink className="nav-link" to="/creatework" exact style={{ marginRight: '20px' }}>Create Work</NavLink>
          </>
        );
      case 'admin':
        return (
          <>
            <NavLink className="nav-link" to="/" exact style={{ marginRight: '20px' }}>Home</NavLink>
            <NavLink className="nav-link" to="/admin/users" exact style={{ marginRight: '20px' }}>Manage Users</NavLink>
            <NavLink className="nav-link" to="/admin/books" exact style={{ marginRight: '20px' }}>Manage Books</NavLink>
            <NavLink className="nav-link" to="/admin/comments" exact style={{ marginRight: '20px' }}>Manage Comments</NavLink>
          </>
        );
      default:
        return <NavLink className="nav-link" to="/" exact style={{ marginRight: '20px' }}>Home</NavLink>;
    }
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#e3f2fd", fontFamily: "'Open Sans', sans-serif" }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          LOGO NAME
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="nav nav-underline" style={{ display: 'flex', justifyContent: 'flex-start' }}>
            {renderNavLinks()}
          </ul>
        </div>

        {user === null ? (
          <div className="d-flex">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item flow-end btn btn-info">
                <a className="nav-link" href="/signin" style={{ marginRight: '20px' }}>Sign In</a>
              </li>
              <li className="nav-item btn btn-info ms-2">
                <a className="nav-link" href="/signup" style={{ marginRight: '20px' }}>Sign Up</a>
              </li>
            </ul>
          </div>
        ) : (
          <div className="d-flex">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item flow-end btn btn-info">
                <a className="nav-link" onClick={signOut}>Sign Out</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;


// // import React from "react";
// // import { useState, useEffect } from "react";
// // import { NavLink } from "react-router-dom";
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import "bootstrap/dist/js/bootstrap.bundle.min.js";
// // import { useNavigate } from "react-router-dom";

// // function NavBar() {
// //   const userData = localStorage.getItem("currentUser");
// //   const userObj = JSON.parse(userData);
// //   const [user, setUser] = useState(userObj);
// //   const navigate = useNavigate();

// //   const signOut = async () => {
// //     localStorage.removeItem("currentUser");
// //     setUser(null);
// //     navigate("/");
// //   };

// //   useEffect(() => {}, [user]);

// //   const renderNavLinks = () => {
// //     switch (user?.role) {
// //       case 'reader':
// //         return (
// //           <>
// //             <NavLink className="nav-link" to="/" exact style={{ marginRight: '20px' }}>Home</NavLink>
// //             <NavLink className="nav-link" to="/bookshowcase" exact style={{ marginRight: '20px' }}>Book Showcase</NavLink>
// //             <NavLink className="nav-link" to="/search" exact style={{ marginRight: '20px' }}>Search</NavLink>
// //           </>
// //         );
// //       case 'author':
// //         return (
// //           <>
// //             <NavLink className="nav-link" to="/" exact style={{ marginRight: '20px' }}>Home</NavLink>
// //             <NavLink className="nav-link" to="/myworks" exact style={{ marginRight: '20px' }}>My Works</NavLink>
// //             <NavLink className="nav-link" to="/creatework" exact style={{ marginRight: '20px' }}>Create Work</NavLink>
// //           </>
// //         );
// //       case 'admin':
// //         return (
// //           <>
// //             <NavLink className="nav-link" to="/" exact style={{ marginRight: '20px' }}>Home</NavLink>
// //             <NavLink className="nav-link" to="/admin/users" exact style={{ marginRight: '20px' }}>Manage Users</NavLink>
// //             <NavLink className="nav-link" to="/admin/books" exact style={{ marginRight: '20px' }}>Manage Books</NavLink>
// //             <NavLink className="nav-link" to="/admin/comments" exact style={{ marginRight: '20px' }}>Manage Comments</NavLink>
// //           </>
// //         );
// //       default:
// //         return <NavLink className="nav-link" to="/" exact style={{ marginRight: '20px' }}>Home</NavLink>;
// //     }
// //   };

// //   return (
// //     <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#e3f2fd", fontFamily: "'Open Sans', sans-serif" }}>
// //       <div className="container-fluid">
// //         <a className="navbar-brand" href="#">
// //           LOGO NAME
// //         </a>
// //         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
// //           <span className="navbar-toggler-icon"></span>
// //         </button>

// //         <div className="collapse navbar-collapse" id="navbarNav">
// //           <ul className="nav nav-underline" style={{ display: 'flex', justifyContent: 'flex-start' }}>
// //             {renderNavLinks()}
// //           </ul>
// //         </div>

// //         {user === null ? (
// //           <div className="d-flex">
// //             <ul className="navbar-nav ms-auto">
// //               <li className="nav-item flow-end btn btn-info">
// //                 <a className="nav-link" href="/signin" style={{ marginRight: '20px' }}>Sign In</a>
// //               </li>
// //               <li className="nav-item btn btn-info ms-2">
// //                 <a className="nav-link" href="/signup" style={{ marginRight: '20px' }}>Sign Up</a>
// //               </li>
// //             </ul>
// //           </div>
// //         ) : (
// //           <div className="d-flex">
// //             <ul className="navbar-nav ms-auto">
// //               <li className="nav-item flow-end btn btn-info">
// //                 <a className="nav-link" onClick={signOut}>Sign Out</a>
// //               </li>
// //             </ul>
// //           </div>
// //         )}
// //       </div>
// //     </nav>
// //   );
// // }

// // export default NavBar;


// // // import React from "react";
// // // import { useState, useEffect } from "react";
// // // import { NavLink } from "react-router-dom";
// // // import "bootstrap/dist/css/bootstrap.min.css";
// // // import "bootstrap/dist/js/bootstrap.bundle.min.js";
// // // import { useNavigate } from "react-router-dom";

// // // function NavBar() {
// // //   const userData = localStorage.getItem("currentUser");
// // //   const userObj = JSON.parse(userData);
// // //   const [user, setUser] = useState(userObj);
// // //   const navigate = useNavigate();

// // //   const signOut = async () => {
// // //     localStorage.removeItem("currentUser");
// // //     setUser(null);
// // //     navigate("/");
// // //   };

// // //   useEffect(() => {}, [user]);

// // //   const renderNavLinks = () => {
// // //     switch (user?.role) {
// // //       case 'reader':
// // //         return (
// // //           <>
// // //             <NavLink className="nav-link" to="/" exact>Home</NavLink>
// // //             <NavLink className="nav-link" to="/bookshowcase" exact>Book Showcase</NavLink>
// // //             <NavLink className="nav-link" to="/search" exact>Search</NavLink>
// // //           </>
// // //         );
// // //       case 'author':
// // //         return (
// // //           <>
// // //             <NavLink className="nav-link" to="/" exact>Home</NavLink>
// // //             <NavLink className="nav-link" to="/myworks" exact>My Works</NavLink>
// // //             <NavLink className="nav-link" to="/creatework" exact>Create Work</NavLink>
// // //           </>
// // //         );
// // //       case 'admin':
// // //         return (
// // //           <>
// // //             <NavLink className="nav-link" to="/" exact>Home</NavLink>
// // //             <NavLink className="nav-link" to="/admin/users" exact>Manage Users</NavLink>
// // //             <NavLink className="nav-link" to="/admin/books" exact>Manage Books</NavLink>
// // //             <NavLink className="nav-link" to="/admin/comments" exact>Manage Comments</NavLink>
// // //           </>
// // //         );
// // //       default:
// // //         return null;
// // //     }
// // //   };

// // //   return (
// // //     <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#e3f2fd", fontFamily: "'Open Sans', sans-serif" }}>
// // //       <div className="container-fluid">
// // //         <a className="navbar-brand" href="#">
// // //           LOGO NAME
// // //         </a>
// // //         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
// // //           <span className="navbar-toggler-icon"></span>
// // //         </button>

// // //         <div className="collapse navbar-collapse" id="navbarNav">
// // //           <ul className="nav nav-underline" style={{ justifyContent: "space-around" }}>
// // //             {renderNavLinks()}
// // //           </ul>
// // //         </div>

// // //         {user === null ? (
// // //           <div className="d-flex">
// // //             <ul className="navbar-nav ms-auto">
// // //               <li className="nav-item flow-end btn btn-info">
// // //                 <a className="nav-link" href="/signin">Sign In</a>
// // //               </li>
// // //               <li className="nav-item btn btn-info ms-2">
// // //                 <a className="nav-link" href="/signup">Sign Up</a>
// // //               </li>
// // //             </ul>
// // //           </div>
// // //         ) : (
// // //           <div className="d-flex">
// // //             <ul className="navbar-nav ms-auto">
// // //               <li className="nav-item flow-end btn btn-info">
// // //                 <a className="nav-link" onClick={signOut}>Sign Out</a>
// // //               </li>
// // //             </ul>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </nav>
// // //   );
// // // }

// // // export default NavBar;


// // // // import React from "react";
// // // // import { useState, useEffect } from "react";
// // // // import { NavLink } from "react-router-dom";
// // // // import "bootstrap/dist/css/bootstrap.min.css";
// // // // import "bootstrap/dist/js/bootstrap.bundle.min.js";
// // // // import { useNavigate } from "react-router-dom";

// // // // function NavBar() {
// // // //   const userData = localStorage.getItem("currentUser");
// // // //   const userObj = JSON.parse(userData);
// // // //   const [user, setUser] = useState(userObj);
// // // //   const navigate = useNavigate();

// // // //   const signOut = async() => {
// // // //     localStorage.removeItem("currentUser");
// // // //     setUser(null);
// // // //     navigate("/");
// // // //   }

// // // //   useEffect(() => {
// // // //   }, [user]);

// // // //   const renderNavLinks = () => {
// // // //     switch(user?.role) {
// // // //       case 'reader':
// // // //         return (
// // // //           <>
// // // //             <NavLink className="nav-link" to="/" exact>Home</NavLink>
// // // //             <NavLink className="nav-link" to="/bookshowcase" exact>Book Showcase</NavLink>
// // // //             <NavLink className="nav-link" to="/search" exact>Search</NavLink>
// // // //           </>
// // // //         );

// // // //       case 'author':
// // // //         return (
// // // //           <>
// // // //             <NavLink className="nav-link" to="/" exact>Home</NavLink>
// // // //             <NavLink className="nav-link" to="/myworks" exact>My Works</NavLink>
// // // //             <NavLink className="nav-link" to="/creatework" exact>Create Work</NavLink>
// // // //           </>
// // // //         );

// // // //       case 'admin':
// // // //         return (
// // // //           <>
// // // //             <NavLink className="nav-link" to="/" exact>Home</NavLink>
// // // //             <NavLink className="nav-link" to="/admin/users" exact>Manage Users</NavLink>
// // // //             <NavLink className="nav-link" to="/admin/books" exact>Manage Books</NavLink>
// // // //             <NavLink className="nav-link" to="/admin/comments" exact>Manage Comments</NavLink>
// // // //           </>
// // // //         );

// // // //       default:
// // // //         return null;
// // // //     }
// // // //   };

// // // //   return (
// // // //     <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#e3f2fd" }}>
// // // //       <div className="container-fluid">
// // // //         <a className="navbar-brand" href="#">
// // // //           LOGO NAME
// // // //         </a>
// // // //         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
// // // //           <span className="navbar-toggler-icon"></span>
// // // //         </button>

// // // //         <div className="collapse navbar-collapse" id="navbarNav">
// // // //           <ul className="nav nav-underline">
// // // //             {renderNavLinks()}
// // // //           </ul>
// // // //         </div>

// // // //         {user === null ? (
// // // //           <div className="d-flex">
// // // //             <ul className="navbar-nav ms-auto">
// // // //               <li className="nav-item flow-end btn btn-info">
// // // //                 <a className="nav-link" href="/signin">Sign In</a>
// // // //               </li>
// // // //               <li className="nav-item btn btn-info ms-2">
// // // //                 <a className="nav-link" href="/signup">Sign Up</a>
// // // //               </li>
// // // //             </ul>
// // // //           </div>
// // // //         ) : (
// // // //           <div className="d-flex">
// // // //             <ul className="navbar-nav ms-auto">
// // // //               <li className="nav-item flow-end btn btn-info">
// // // //                 <a className="nav-link" onClick={signOut}>Sign Out</a>
// // // //               </li>
// // // //             </ul>
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </nav>
// // // //   );
// // // // }

// // // // export default NavBar;



// import React from "react";
// import { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import { useNavigate } from "react-router-dom";


// function NavBar() {
//   const userData = localStorage.getItem("currentUser");
//   const userObj = JSON.parse(userData);
//   const [user, setUser] = useState(userObj);
//   const navigate = useNavigate();

//   const signOut = async() => {
//     localStorage.removeItem("currentUser");
//     setUser(null);
//     navigate("/");
//   }

//   useEffect(() => {
//   }, [user]);

//   return (
//     <nav
//       className="navbar navbar-expand-lg"
//       style={{ backgroundColor: "#e3f2fd" }}
//     >
//       <div className="container-fluid">
//         <a className="navbar-brand" href="#">
//           LOGO NAME?
//         </a>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {user?.role != "ADMIN" && (
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="nav nav-underline">
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/" exact>
//                 Home
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/profile" exact>
//                 Profile
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/bookshowcase" exact>
//                 BookShowcase
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/myworks" exact>
//                 Myworks
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/creatework" exact>
//                 CreateWork
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink
//                 className="nav-link"
//                 to="/bookshowcaseadministrators"
//                 exact
//               >
//                 bookshowcaseadministrators
//               </NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/search" exact>
//                 search
//               </NavLink>
//             </li>
//             </ul>
//         </div>
//         )}

//         {user?.role == "admin" && (
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="nav nav-underline">
//               <li className="nav-item">
//               <NavLink className="nav-link" to="/admin/users" exact>
//                 Manage Users
//               </NavLink>
//               </li>
            
//               <li className="nav-item">
//               <NavLink className="nav-link" to="/admin/books" exact>
//                 Manage Books
//               </NavLink>
//             </li>
//           </ul>
//         </div>)}
            

          
//         {user === null && (
//         <div className="d-flex">
//           <ul className="navbar-nav ms-auto">
//             <li className="nav-item flow-end btn btn-info">
//               <a className="nav-link" href="/signin">
//                 Sign In
//               </a>
//             </li>
            
//             <li className="nav-item btn btn-info ms-2">
//               <a className="nav-link" href="/signup">
//                 Sign Up
//               </a>
//             </li>
//           </ul>
//         </div>
//         )}

//         {user !== null && (
//         <div className="d-flex">
//           <ul className="navbar-nav ms-auto">
            
              
//               {user !== null && (
//                 <li className="nav-item flow-end btn btn-info">
//                 <a className="nav-link" onClick = {signOut}>
//                 Sign Out
//                 </a>
//                 </li>
//               )}
//           </ul>
//         </div> )}
//       </div>
//     </nav>
//   );
// }

// export default NavBar;


// /*{userRole === "ADMIN" &&
//             <li className="nav-item">
//               <NavLink className="nav-link" to="/admin/users" exact>
//                 Manage Users
//               </NavLink>
//             </li>}*/