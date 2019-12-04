import React from "react";

let modules = [
  [
    {
      type: "lesson",
      image: "/lsn1.jpg",
      progress: 0,
      maxProgress: 1,
      completed: false,
      id: "123",
      name: "Pulse"
    }
  ],
  [
    {
      type: "exercise",
      image: "/ex1.jpg",
      progress: 1,
      maxProgress: 3,
      completed: false,
      id: "124",
      name: "Determining Pulse"
    }
  ],
  [
    {
      type: "lesson",
      image: "/lsn1.jpg",
      progress: 4,
      maxProgress: 5,
      completed: false,
      id: "125",
      name: "Note values"
    }
  ],
  [
    {
      type: "exercise",
      image: "/ex1.jpg",
      progress: 0,
      maxProgress: 5,
      completed: false,
      id: "126",
      name: "Note values"
    }
  ],
  [
    {
      type: "lesson",
      image: "/lsn1.jpg",
      progress: 0,
      maxProgress: 5,
      completed: false,
      id: "127",
      name: "Simple meter"
    }
  ],
  [
    {
      type: "exercise",
      image: "/ex1.jpg",
      progress: 1,
      maxProgress: 5,
      completed: false,
      id: "128",
      name: "Counting beats"
    },
    {
      type: "exercise",
      image: "/ex1.jpg",
      progress: 1,
      maxProgress: 5,
      completed: false,
      id: "129",
      name: "Determining meter"
    }
  ],
  [
    {
      type: "lesson",
      image: "/lsn1.jpg",
      progress: 0,
      maxProgress: 5,
      completed: false,
      id: "128",
      name: "Compound meter"
    }
  ]
];

let users = [
  {
    id: "000001",
    name: "Xavier",
    level: 5,
    profilePic: "./pic.jpg",
    progress: {
      lsn123: 1
    }
  }
];

//separate

let articles = [
  {
    id: "000001",
    title: "Mussorgsky: Genius or Hack?",
    href: "./mussorgsky-genius-hack",
    thumbnail: "musky.jpg",
    body: <div> </div>
  },
  {
    id: "000002",
    title: "The Rite of Spring: 100 Years of Outrage",
    href: "./mussorgsky-genius-hack",
    thumbnail: "stravi.jpg"
  },
  {
    id: "000003",
    title: "Animals as Leaders: Djentle Djiants",
    href: "./animals-leaders-djentle-djiants",
    thumbnail: "AAL.jpg"
  },
  {
    id: "000004",
    title: "Ringo Starr: Star of the Ring",
    href: "./ringo-starr-star-ring",
    thumbnail: "thering.jpg"
  }
];

export { modules, users, articles };
