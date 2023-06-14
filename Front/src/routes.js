
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
// import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import ConfirmEmail from "./views/examples/ConfirmEmail";
import EditProfile from "./views/examples/EditProfile";
import UsersTable from "./views/examples/inactive-employee";
import ResetPassword from "./views/examples/ResetPassword";
import ConfirmPassword from "./views/examples/ConfirmPassword";
import Changeawrads from "./views/examples/Changeawrads";
import ResetPasswordSuccess from "./views/examples/ResetPasswordSuccess";
import manageRewardsEmployee from "views/examples/manageRewardsEmployee";
import ListAssociation from "views/examples/ListAssociation";
import validation_donation from "views/examples/ValidatedDonation";
import Transformation from "views/examples/transformation";
import giftcard from "views/examples/gift_card"
//const userInfo=localStorage.getItem(""); 
var routes;
const grade=localStorage.getItem("grade");
console.log("************ routes ==============================================>"+grade);
routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
    api: false
  },
  {
    path: "/edit-profile",
    name: "Profile",
    icon: "ni ni-ruler-pencil text-info",
    component: EditProfile,
    layout: "/admin",
    api: false
  },
  {
    path: "/icons",
    name: "reward",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin",
    api: false
  },

 
  
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
    api: true
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
    api: true
  },
  {
    path: "/confirm-email/:id",
    name: "Confirm Email",
    icon: "ni ni-check-bold text-green",
    component: ConfirmEmail,
    layout: "/auth",
    api: true
  },

 
  {
    path: "/reset-password",
    name: "Reset Password",
    icon: "ni ni-folder-17 text-pink",
    component: ResetPassword,
    layout: "/auth",
    api: true
  },
  {
    path: "/confirm-password/:id",
    name: "Confirm Password",
    icon: "ni ni-folder-17 text-pink",
    component: ConfirmPassword,
    layout: "/auth",
    api: true
  },
  {
    path: "/reset-success",
    name: "Password Reset Confirmed",
    icon: "ni ni-folder-17 text-pink",
    component: ResetPasswordSuccess,
    layout: "/auth",
    api: false
  }
];

if(grade=='manager' ){

routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
    state:true,
    api: false
  },
  // {
  //   path: "/edit-profile",
  //   name: "Profile",
  //   icon: "ni ni-ruler-pencil text-info",
  //   component: EditProfile,
  //   layout: "/admin",
  //   api: false
  // },
  {
    path: "/user-profile",
    name: "Profile",
    icon: "ni ni-single-02 text-orange",
    component: Profile,
    state:true,
    layout: "/admin",
    api: false
  },
  {
    path: "/giftCard",
    name: "Giftcard",
    icon: "ni ni-tv-2 text-primary",
    component: giftcard,
    layout: "/admin",
    state:true,
    api: false
  },
  {
    path: "/edit-profile",
    name: "edit-profile",
    icon: "ni ni-ruler-pencil text-info",
    component: EditProfile,
    state:false,
    layout: "/admin",
    api:false
    
  },
  {
    path: "/icons",
    name: "Reward",
    icon: "ni ni-planet text-blue",
    component: Icons,
    state:true,
    layout: "/admin",
    api: false
  },

 
  {
    path: "/tables",
    name: "All Employees",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    state:true,
    layout: "/admin",
    api: false
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    state:true,
    layout: "/auth",
    api: true
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    state:true,
    layout: "/auth",
    api: true
  },
  {
    path: "/confirm-email/:id",
    name: "Confirm Email",
    icon: "ni ni-check-bold text-green",
    component: ConfirmEmail,
    state:true,
    layout: "/auth",
    api: true
  },

  {
    path: "/users",
    name: "Inactive Employee",
    icon: "ni ni-folder-17 text-pink",
    component: UsersTable,
    state:false,
    layout: "/admin",
    api: false
  },
  {
    path: "/reset-password",
    name: "Reset Password",
    icon: "ni ni-folder-17 text-pink",
    state:true,
    component: ResetPassword,
    layout: "/auth",
    api: true
  },
  {
    path: "/confirm-password/:id",
    name: "Confirm Password",
    state:true,
    icon: "ni ni-folder-17 text-pink",
    component: ConfirmPassword,
    layout: "/auth",
    api: true
  },
  {
    path: "/reset-success",
    name: "Password Reset Confirmed",
    icon: "ni ni-folder-17 text-pink",
    state:true,
    component: ResetPasswordSuccess,
    layout: "/auth",
    api: false
  },
  {
    path: "/Validation",
    name: "Donation",
    icon: "fa fa-check-circle text-blue",
    state:true,
    component: validation_donation,
    layout: "/admin",
    api: false
  },
  {
    path: "/Transformation",
    name: "Transaction",
    icon: "fa fa-download text-blue",
    state:true,
    component: Transformation,
    layout: "/admin",
    api: false
  }
];
}

else if (grade=='employee'){

  console.log("***********************employee routes");
  routes = [
    {
      path: "/index",
      name: "Dashboard",
      icon: "ni ni-tv-2 text-primary",
      component: Index,
      state:true,
      layout: "/admin",
      api: false
    },
    {
      path: "/reset-password",
      name: "Reset Password",
      icon: "ni ni-folder-17 text-pink",
      state:true,
      component: ResetPassword,
      layout: "/auth",
      api: true
    },
    {
      path: "/confirm-password/:id",
      name: "Confirm Password",
      state:true,
      icon: "ni ni-folder-17 text-pink",
      component: ConfirmPassword,
      layout: "/auth",
      api: true
    },
    {
      path: "/reset-success",
      name: "Password Reset Confirmed",
      icon: "ni ni-folder-17 text-pink",
      state:true,
      component: ResetPasswordSuccess,
      layout: "/auth",
      api: false
    },
    {
      path: "/user-profile",
      name: "Profile",
      icon: "ni ni-single-02 text-yellow",
      component: Profile,
      state:true,
      layout: "/admin",
      api: false
    },
    {
      path: "/edit-profile",
      name: "edit-profile",
      icon: "ni ni-ruler-pencil text-info",
      component: EditProfile,
      state:false,
      layout: "/admin",
      api:false
    },
     {
      path: "/manageRewards",
      name: " manage points ",
      icon: "ni ni-bullet-list-67 text-red",
      component: manageRewardsEmployee,
      state:true,
      layout: "/admin",
      api: false
    }
    ,
     {
      path: "/awards",
      name: "exchange points ",
      icon: "ni ni-bullet-list-67 text-red",
      component: Changeawrads,
      state:true,
      layout: "/admin",
      api: false
    }
    ,
    {
      path: "/login",
      name: "Login",
      icon: "ni ni-key-25 text-info",
      state:true,
      component: Login,
      layout: "/auth",
      api: true
    },
    {
      path: "/register",
      name: "Register",
      icon: "ni ni-circle-08 text-pink",
      component: Register,
      state:true,
      layout: "/auth",
      api: true
    },
    {
      path: "/donation",
      name: "donation",
      icon: "ni ni-bullet-list-67 text-red",
      component: ListAssociation ,
      state:false,
      layout: "/admin",
      api: false
    }

  ];
}

export default routes;
