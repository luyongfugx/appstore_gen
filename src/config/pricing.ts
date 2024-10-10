const prices = {
  free: {
    id: "free",
    name: "Free Trial",
    tokens: 1000,
    genImages: 100,
    training: 0,
  },
  day: {
    id: "day",
    name: "day Trial",
    tokens: 100,
    genImages: 10,
    training: 0,
  },
  pro: {
    name: "PRO",
    id: "pro",
    tokens: 0,
    genImages: 50,
    training: 0,
  },
  enterprise: {
    name: "Enterprise",
    id: "enterprise",
    tokens: 3000,
    genImages: 300,
    training: 10,
  },
};

export const pricingConfig = {
  provider: "lemonsqueezy",
  products: {
    "83808": prices.free,
    "84073": prices.day,
    "119606": prices.pro,
    "79957": prices.enterprise,
  },
};

// {
//     provider:"stripe",
//     products:[
//         {
//             productid: "", //get from  stripe
//             priceid: "free", // get from above price config
//         },
//         {
//             productid: "", //get from  stripe
//             priceid: "pro", // get from above price config
//         },
//         {
//             productid: "", //get from  stripe
//             priceid: "enterprise", // get from above price config
//         },
//     ]

// },
