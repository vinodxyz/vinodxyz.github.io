let reasons = [
    {
        reason_id: 0,
        reason_name: "socializing"
    },
    {
        reason_id: 1,
        reason_name: "growing startup"
    },
    {
        reason_id: 2,
        reason_name: "need capital"
    },
    {
        reason_id: 3,
        reason_name: "misc"
    },
    {
        reason_id: 4,
        reason_name: "invited to come"
    },
    {
        reason_id: 5,
        reason_name: "attending talks"
    }
];

let companies = ["Razorpay", "Infosys", "Moonraft"];


let dataset = {
    "nodes": [
        {
            attendee_id: 0,
            name: "vinod",
            photo: "images/vinod.png",
            designation: "Product designer",
            company: 0,
            experience: 6,
            reasons: [0, 2, 3]
        },
        {
            attendee_id: 1,
            name: "shinde",
            photo: "images/shinde.png",
            designation: "UX designer",
            company: 1,
            experience: 5,
            reasons: [0, 4]
        },
        {
            attendee_id: 2,
            name: "chetty",
            photo: "images/chetty.png",
            designation: "Design lead",
            company: 0,
            experience: 6,
            reasons: [1,4]
        },
        {
            attendee_id: 3,
            name: "prajna",
            photo: "images/prajna.png",
            designation: "Interaction designer",
            company: 2,
            experience: 1.5,
            reasons: [2,4]
        },
        {
            attendee_id: 4,
            name: "modi",
            photo: "images/modi.png",
            designation: "Some designer",
            company: 1,
            experience: 1.5,
            reasons: [0,5]
        }
    ]
}