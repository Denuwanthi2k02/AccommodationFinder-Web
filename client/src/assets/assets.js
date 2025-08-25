import logo from "./logo.svg";
import gmail_logo from "./gmail_logo.svg";
import facebook_logo from "./facebook_logo.svg";
import instagram_logo from "./instagram_logo.svg";
import twitter_logo from "./twitter_logo.svg";
import menu_icon from "./menu_icon.svg";
import search_icon from "./search_icon.svg"
import close_icon from "./close_icon.svg"
import users_icon from "./users_icon.svg"
import car_icon from "./car_icon.svg"
import location_icon from "./location_icon.svg"
import fuel_icon from "./fuel_icon.svg"
import addIcon from "./addIcon.svg"
import carIcon from "./carIcon.svg"
import carIconColored from "./carIconColored.svg"
import dashboardIcon from "./dashboardIcon.svg"
import dashboardIconColored from "./dashboardIconColored.svg"
import addIconColored from "./addIconColored.svg"
import listIcon from "./listIcon.svg"
import listIconColored from "./listIconColored.svg"
import cautionIconColored from "./cautionIconColored.svg"
import arrow_icon from "./arrow_icon.svg"
import star_icon from "./star_icon.svg"
import check_icon from "./check_icon.svg"
import tick_icon from "./tick_icon.svg"
import delete_icon from "./delete_icon.svg"
import eye_icon from "./eye_icon.svg"
import eye_close_icon from "./eye_close_icon.svg"
import filter_icon from "./filter_icon.svg"
import edit_icon from "./edit_icon.svg"
import calendar_icon_colored from "./calendar_icon_colored.svg"
import location_icon_colored from "./location_icon_colored.svg"
import testimonial_image_1 from "./testimonial_image_1.png"
import testimonial_image_2 from "./testimonial_image_2.png"
import Bachground_image_1 from "./Bachground_image_1.png"
import banner_car_image from "./banner_car_image.png"
import user_profile from "./user_profile.png"
import upload_icon from "./upload_icon.svg"
import annex_0 from "./annex_0.png"
import annex_1 from "./annex_1.jpg"
import annex_2 from "./annex_2.jpg"
import annex_3 from "./annex_3.jpg"
import annex_4 from "./annex_4.jpg"
import annex_0_bath from "./annex_0_bath.jpg"
import annex_1_bath from "./annex_1_bath.jpg"
import annex_2_bath from "./annex_2_bath.jpg"
import annex_3_bath from "./annex_3_bath.jpg"
import annex_0_bed from "./annex_0_bed.jpg"
import annex_1_bed from "./annex_1_bed.jpg"
import annex_2_bed from "./annex_2_bed.jpg"
import shower_line_icon from "./shower_line_icon.svg"
import gender from "./gender.svg"
import annex from "./annex.svg"
import account from "./account.svg"


export const cityList = ['New York', 'Los Angeles', 'Houston', 'Chicago']

export const assets = {
    logo,
    gmail_logo,
    facebook_logo,
    instagram_logo,
    twitter_logo,
    menu_icon,
    search_icon,
    close_icon,
    users_icon,
    edit_icon,
    car_icon,
    location_icon,
    fuel_icon,
    addIcon,
    carIcon,
    carIconColored,
    dashboardIcon,
    dashboardIconColored,
    addIconColored,
    listIcon,
    listIconColored,
    cautionIconColored,
    calendar_icon_colored,
    location_icon_colored,
    arrow_icon,
    star_icon,
    check_icon,
    tick_icon,
    delete_icon,
    eye_icon,
    eye_close_icon,
    filter_icon,
    testimonial_image_1,
    testimonial_image_2,
    Bachground_image_1,
    banner_car_image,
    upload_icon,
    user_profile,
    annex_0,
    annex_1,
    annex_2,
    annex_3,
    annex_4,
    shower_line_icon,
    gender,
    annex,
    annex_0_bath,
    annex_0_bed,
    annex_1_bed,
    annex_1_bath,
    annex_2_bath,
    annex_2_bed,
    annex_3_bath,
    account
    

}

export const menuLinks = [
    { name: "Home", path: "/" },
    { name: "Accommodations", path: "/Accommodations" },
    
]

export const ownerMenuLinks = [
    { name: "Dashboard", path: "/owner", icon: dashboardIcon, coloredIcon: dashboardIcon },
    { name: "Add accommodation", path: "/owner/add-accommodation", icon: addIcon, coloredIcon: addIcon },
    { name: "Manage accommodations", path: "/owner/manage-accommodations", icon: carIcon, coloredIcon: carIcon },
    
]

export const dummyUserData = {
  "_id": "6847f7cab3d8daecdb517095",
  "name": "GreatStack",
  "email": "admin@example.com",
  "role": "owner",
  "image": user_profile,
}

export const dummyAnnexData = [
    {
        "_id": "67ff5bc069c03d4e45f30b77",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "No": "12/4 ",
        "Street": ", Green Street",
        "image": annex_0,
        "gallery": [annex_1_bed, annex_1_bath, annex_1_bed, annex_1_bath],
        "views": 1,
        "Village": "Hapugala",
        "capacity": 4,
        "Bathroom": "1",
        "Gender": "Male",
        "rentPerMonth": 4500,
        "location": "1.2",
        "description": "he AnnexMate Single Room is a budget-friendly stay designed for one student. It offers a quiet study environment and is located within walking distance from the university.",
        "isAvaliable": true,
        "createdAt": "2025-04-16T07:26:56.215Z",
    },
    {
        "_id": "67ff6b758f1b3684286a2a65",
        "owner": "67fe3467ed8a8fe17d0ba6e3",
        "No": "8/7",
        "Street": ", Palm Street",
        "image": annex_1,
        "gallery": [annex_0_bed, annex_0_bath, annex_0_bed, annex_0_bath],
        "views": 0,
        "Village": "Wakwella",
        "capacity": 4,
        "Bathroom": "2",
        "Gender": "Female",
        "rentPerMonth": 6000,
        "location": "3",
        "description": "The AnnexMate Shared Room is ideal for two students who want to live together. It balances affordability and comfort with shared facilities.",
        "isAvaliable": true,
        "createdAt": "2025-04-16T08:33:57.993Z",
    },
    {
        "_id": "67ff6b9f8f1b3684286a2a68",
        "owner": "67fe3467ed8a8fe17d0ba6e4",
        "No": "5/2 ",
        "Street": ", Ocean View Lane",
        "image": annex_2,
        "gallery": [annex_2_bed, annex_2_bath, annex_2_bed, annex_2_bath],
        "views": 0,
        "Village": "Hapugala",
        "capacity": 4,
        "Bathroom": "1",
        "Gender": "Female",
        "rentPerMonth": 12000,
        "location": "2.5",
        "description": "The AnnexMate Studio Annex is a compact, self-contained unit that includes a bedroom, study space, and small kitchen, perfect for independent living.",
        "isAvaliable": false,
        "createdAt": "2025-04-16T08:34:39.592Z",
    },
    {
        "_id": "68009c93a3f5fc6338ea7e34",
        "owner": "67fe3467ed8a8fe17d0ba6e3",
        "No": "23/6",
        "Street": ", Lotus Street 6",
        "image": annex_3,
        "gallery": [annex_1_bed, annex_3_bath ],
        "views": 0,
        "Village": "Wakwella",
        "capacity": 2,
        "Bathroom": "2",
        "Gender": "Male",
        "rentPerMonth": 20000,
        "location": "5",
        "description": "The AnnexMate Family-Style House provides larger spaces suitable for groups of 3–4 students, offering shared living and dining areas with more comfort.",
        "isAvaliable": true,
        "createdAt": "2025-04-17T06:15:47.318Z",
    }
];

export const dummyOwnerData = [
  {
    "_id": "67fe3467ed8a8fe17d0ba6e2",  // Matches the owner in your dummyCarData
    "name": "Mr. Sandun Perera",
    "phone": "+94 71 234 5678",
    "email": "sandun.perera@example.com",
    "availableTime": ["9:00 AM - 11:00 AM", "2:00 PM - 5:00 PM"],
    "address": "12/4 Green Street, Hapugala",
    "image": user_profile
  },
  {
    "_id": "67fe3467ed8a8fe17d0ba6e3",  // Extra owner for future use
    "name": "Ms. Dilani Fernando",
    "phone": "+94 76 345 6789",
    "email": "dilani.fernando@example.com",
    "availableTime": "8:30 AM - 6:00 PM",
    "address": "45 Palm Street, Wakwella",
    "image": user_profile
  },
  {
    "_id": "67fe3467ed8a8fe17d0ba6e4",  // Another extra owner
    "name": "Mr. Ruwan Jayasinghe",
    "phone": "+94 77 987 6543",
    "email": "ruwan.j@example.com",
    "availableTime": "10:00 AM - 8:00 PM",
    "address": "23/6 Lotus Street, Wakwella",
    "image": user_profile
  }
];


export const dummyMyBookingsData = [

{

"_id": "68482bcc98eb9722b7751f70",

"annex": dummyAnnexData[0],

"user": "6847f7cab3d8daecdb517095",

"owner": "6847f7cab3d8daecdb517095",

"pickupDate": "2025-06-13T00:00:00.000Z",

"returnDate": "2025-06-14T00:00:00.000Z",

"status": "confirmed",

"price": 440,

"createdAt":"2025-06-10T12:57:48.244Z",

},

{

"_id": "68482bb598eb972267751f60",

"annex": dummyAnnexData[1],

"user": "6847f7cab3d8daecdb517095",

"owner": "67fe3467ed8a8fe17d0ba6e2",

"pickupDate": "2025-06-12T00:00:00.000Z",

"returnDate": "2025-06-12T00:00:00.000Z",

"status": "pending",

"price": 130,

"createdAt": "2025-06-10T12:57:25.6132",

},

{

"_id": "684800fa0fb481c5cfd92e56",

"annex": dummyAnnexData[2],

"user": "6847f7cab3d8daecdb517095",

"owner": "67fe3467ed8a8fe17d0ba6e2",

"pickupDate": "2025-06-11T00:00:00.000Z",

"returnDate": "2025-06-12T00:00:00.000Z",

"status": "pending",

"price": 600,

"createdAt": "2025-06-10T09:55:06.3792",

}
];

export const dummyDashboardData = {

"totalAccommodations": 4,

"totalAvailable": 2,

"pendingBookings": 0,

"completedBookings": 2,

"recentBookings": [

dummyMyBookingsData[0],

dummyMyBookingsData[1],
dummyMyBookingsData[2]

],

"monthlyRevenue": 840

}

