export default DATA = [
  {
    uid: "user1",
    email: "tanmaydabhade80@gmail.com",
    name: "Tanmay Dabhade",
    profile: {
      location: "East Lansing, Michigan",
      verified: true,
    },
    recyclingEvents: [
      {
        id: "event1",
        date: "2024-09-01",
        location: "Recycling Center 1",
        recycledItems: [
          { item: "Battery", quantity: 14 },
          { item: "Plastic Bottle", quantity: 12 },
        ],
        incentiveEarned: 30,
      },
    ],
  },
  {
    uid: "user2",
    email: "jane.smith@example.com",
    name: "Jane Smith",
    profile: {
      location: "Los Angeles, USA",
      verified: false,
    },
    recyclingEvents: [
      {
        id: "event2",
        date: "2024-09-10",
        location: "Recycling Center 2",
        recycledItems: [{ item: "Aluminum Can", quantity: 15 }],
        incentiveEarned: 7.5,
      },
    ],
  },
  {
    uid: "user3",
    email: "michael.jones@example.com",
    name: "Michael Jones",
    profile: {
      location: "Chicago, USA",
      verified: true,
    },
    recyclingEvents: [
      {
        id: "event3",
        date: "2024-08-20",
        location: "Recycling Center 3",
        recycledItems: [{ item: "Glass Bottle", quantity: 10 }],
        incentiveEarned: 5.0,
      },
    ],
  },
  {
    uid: "user4",
    email: "emily.johnson@example.com",
    name: "Emily Johnson",
    profile: {
      location: "Houston, USA",
      verified: false,
    },
    recyclingEvents: [
      {
        id: "event4",
        date: "2024-09-12",
        location: "Recycling Center 4",
        recycledItems: [{ item: "Plastic Bottle", quantity: 25 }],
        incentiveEarned: 12.0,
      },
    ],
  },
  {
    uid: "user5",
    email: "lisa.williams@example.com",
    name: "Lisa Williams",
    profile: {
      location: "Seattle, USA",
      verified: true,
    },
    recyclingEvents: [
      {
        id: "event5",
        date: "2024-09-03",
        location: "Recycling Center 5",
        recycledItems: [
          { item: "Battery", quantity: 6 },
          { item: "Aluminum Can", quantity: 10 },
        ],
        incentiveEarned: 18.25,
      },
    ],
  },
  {
    uid: "user6",
    email: "david.brown@example.com",
    name: "David Brown",
    profile: {
      location: "Miami, USA",
      verified: true,
    },
    recyclingEvents: [
      {
        id: "event6",
        date: "2024-09-20",
        location: "Recycling Center 6",
        recycledItems: [
          { item: "Glass Bottle", quantity: 30 },
          { item: "Plastic Bottle", quantity: 20 },
        ],
        incentiveEarned: 22.75,
      },
    ],
  },
];
