import {
  BedDouble,
  Car,
  Utensils,
  TreePalm,
  MapPinned,
  Drama,
  Turtle,
  Bike,
} from "lucide-react";

export const categories = [
  { id: 1, name: "Accommodation", icon: BedDouble, url: "accommodation" },
  { id: 2, name: "Transportation", icon: Car, url: "transportation" },
  { id: 3, name: "Good Food", icon: Utensils, url: "food" },
  // { id: 4, name: "Entertainment", icon: Drama, url: "entertainment" },
  // { id: 5, name: "Leisure Activities", icon: TreePalm },
  // { id: 6, name: "Travel Guides and Tours", icon: MapPinned },
  // { id: 7, name: "Adventure and Ecotourism", icon: Turtle },
  // { id: 8, name: "Alternative Transportation", icon: Bike },
];

export const transportType = ["cars", "motorcycles", "trucks"];

export const establishmentTypes = [
  "Apartment",
  "Bungalow",
  "Home",
  "Chalet",
  "Room",
];

export const services = [
  {
    id: "wifi",
    label: "Wi-Fi",
  },
  {
    id: "breakfast",
    label: "Breakfast",
  },
  {
    id: "parking",
    label: "Parking",
  },
  {
    id: "pool",
    label: "Swimming Pool",
  },
  {
    id: "gym",
    label: "Gym",
  },
  {
    id: "air_conditioning",
    label: "Air Conditioning",
  },
  {
    id: "tv",
    label: "TV",
  },
  {
    id: "laundry",
    label: "Laundry",
  },
  {
    id: "room_service",
    label: "Room Service",
  },
  {
    id: "beach_access",
    label: "Beach Access",
  },
  {
    id: "restaurant",
    label: "Restaurant",
  },
  {
    id: "bar",
    label: "Bar",
  },
  {
    id: "bbq_facilities",
    label: "BBQ Facilities",
  },
];

export const education = [
  {
    degree: "Software Engineering",
    institution: "UNOPAR",
    period: "02/2022 – 06/2025",
  },
  {
    degree: "School Management",
    institution: "PROMINAS",
    period: "09/2020 – 09/2021",
  },
  {
    degree: "School Physical Education",
    institution: "KURIUS",
    period: "08/2016 – 01/2018",
  },
  {
    degree: "Bachelor's in Chemistry",
    institution: "UECE",
    period: "02/2011 – 11/2015",
  },
];

export const experiences = [
  {
    role: "CHEMISTRY TEACHER",
    company: "EEEP Marta Maria Giffoni de Sousa",
    period: "2015-Present",
    responsibilities: [
      "Taught chemistry classes to high school students, focusing on engaging, accessible, and critical thinking-promoting education;",
      "Planned and executed classes and activities that met students' needs.",
    ],
    achievements: [
      "20% increase in students' performance on external evaluations.",
      "Medal achievements in chemistry Olympiads.",
    ],
  },
  {
    role: "LAB INTERNSHIP",
    company: "CAGECE-Itapipoca",
    period: "2014-2015",
    responsibilities: [
      "Performed chemical, physical, and biological analyses on water and sewage samples;",
      "Operated high-precision equipment, such as spectrophotometers.",
    ],
    achievements: [
      "Contributed to maintaining water treatment quality standards;",
      "Identified and resolved water quality-related issues.",
    ],
  },
];
