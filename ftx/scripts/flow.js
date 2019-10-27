function _initializeComponents(){
    //For each reason, dynamically generate a multi-select tag component:
    var pushToggles = document.getElementById("pushToggles");
    for(var tag in reasons){
        var input = document.createElement("input");
        input.type = "checkbox";
        input.id = reasons[tag].tag_id;
        pushToggles.appendChild(input);
        pushToggles.appendChild(document.createTextNode(reasons[tag].reason_name));
        pushToggles.appendChild(document.createElement("br"));
    }

    //Load the options for the name to be autocompleted
    var options = {
        data: dataset.nodes,
        theme: "dark",
        getValue: "name",
        template: {
            type: "iconRight",
            fields: {
                iconSrc: "photo"
            }
        },
        list: {
            maxNumberOfElements: 5,
            match: {
                enabled: true
            }
        }
    };

    $("#txtName").easyAutocomplete(options);
}

_initializeComponents();

function uiShowTags(){

}