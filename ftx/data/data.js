let reasons = [
    {
        reason_id: 0,
        reason_name: "socializing",
        tag_id: "socialize"
    },
    {
        reason_id: 1,
        reason_name: "growing startup",
        tag_id: "startup"
    },
    {
        reason_id: 2,
        reason_name: "need capital",
        tag_id: "capital"
    },
    {
        reason_id: 3,
        reason_name: "misc",
        tag_id: "misc"
    },
    {
        reason_id: 4,
        reason_name: "invited to come",
        tag_id: "invited"
    },
    {
        reason_id: 5,
        reason_name: "attending talks",
        tag_id: "talks"
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
            reasons: [0, 2, 3]
        },
        {
            attendee_id: 1,
            name: "shinde",
            photo: "data/images/snehal.jpg",
            designation: "UX designer",
            company: 1,
            experience: 5,
            reasons: [0, 4]
        },
        {
            attendee_id: 2,
            name: "chetty",
            photo: "data/images/chetty.jpg",
            designation: "Design lead",
            company: 0,
            experience: 6,
            reasons: [1,4]
        },
        {
            attendee_id: 3,
            name: "prajna",
            photo: "data/images/prajna.jpg",
            designation: "Interaction designer",
            company: 2,
            experience: 1.5,
            reasons: [2,4]
        },
        {
            attendee_id: 4,
            name: "modi",
            photo: "data/images/modi.jpg",
            designation: "Some designer",
            company: 1,
            experience: 1.5,
            reasons: [0,5]
        },
        {
            attendee_id: 5,
            name: "prasanta",
            photo: "data/images/prasanta.jpg",
            designation: "Info designer",
            company: 3,
            experience: 3.5,
            reasons: [1,2,5]
        }
    ]
}