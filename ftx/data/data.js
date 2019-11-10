let reasons = [
    {
        reason_id: 0,
        reason_name: "socialize",
        tag_id: "cb_socialize",
        reason_color: "#BA2E60"
    },
    {
        reason_id: 1,
        reason_name: "grow startup",
        tag_id: "cb_startup",
        reason_color: "#2991F1"
    },
    {
        reason_id: 2,
        reason_name: "get capital",
        tag_id: "cb_capital",
        reason_color: "#15BEC9"
    },
    {
        reason_id: 3,
        reason_name: "attend talks",
        tag_id: "cb_talks",
        reason_color: "#C01A92"
    },
    {
        reason_id: 4,
        reason_name: "to have fun",
        tag_id: "cb_fun",
        reason_color: "#A45F0E"
    }
];

let companies = ["Razorpay", "Infosys", "Moonraft"];


let dataset = {
    "nodes": [
        {
            attendee_id: 0,
            name: "vinod",
            photo: "data/images/vinod.jpg",
            designation: "Product designer",
            company: 0,
            experience: 6,
            reasons: [0, 2, 3],
            pair_freq: 0
        },
        {
            attendee_id: 1,
            name: "snehal",
            photo: "data/images/snehal.jpg",
            designation: "UX designer",
            company: 1,
            experience: 5,
            reasons: [0, 4],
            pair_freq: 0
        },
        {
            attendee_id: 2,
            name: "chetty",
            photo: "data/images/chetty.jpg",
            designation: "Design lead",
            company: 0,
            experience: 6,
            reasons: [1,4],
            pair_freq: 0
        },
        {
            attendee_id: 3,
            name: "prajna",
            photo: "data/images/prajna.jpg",
            designation: "Interaction designer",
            company: 2,
            experience: 1.5,
            reasons: [2,4],
            pair_freq: 0
        },
        {
            attendee_id: 4,
            name: "modi",
            photo: "data/images/modi.jpg",
            designation: "Some designer",
            company: 1,
            experience: 1.5,
            reasons: [0,4],
            pair_freq: 0
        },
        {
            attendee_id: 5,
            name: "prasanta",
            photo: "data/images/prasanta.jpg",
            designation: "Info designer",
            company: 3,
            experience: 3.5,
            reasons: [1,2,4],
            pair_freq: 0
        },
        {
            attendee_id: 6,
            name: "rahulchandh",
            photo: "data/images/rahulchandh.jpg",
            designation: "Info designer",
            company: 3,
            experience: 3.5,
            reasons: [0,1],
            pair_freq: 0
        },
        {
            attendee_id: 7,
            name: "saikiran",
            photo: "data/images/saikiran.jpg",
            designation: "Info designer",
            company: 3,
            experience: 3.5,
            reasons: [1,3],
            pair_freq: 0
        }
    ]
}