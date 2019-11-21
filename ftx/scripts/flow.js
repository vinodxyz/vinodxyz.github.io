//var jsonID = "fi3b2";
 var jsonID = "mwoj2";
// var jsonID = "9r8e6";
var person_img = "";
let databackup;

function _initializeCheckboxes(){

    //For each reason, dynamically generate a custom styled checkbox:
    var tags = document.getElementById("ui-tags");
    var i = 1;

    for(var tag in reasons){
        if([1,4].includes(i)){
            var lastCount = i;
            var div = document.createElement("div");
            div.id = "row-tag-"+i;
            tags.appendChild(div)
            $("#row-tag-"+i).addClass("row-tag");
        }else{
            var div = document.getElementById("row-tag-"+lastCount);
        }
        
        var span = document.createElement("span");
        span.id = "group-tag"+i;
        div.appendChild(span);
        $("#group-tag"+i).addClass("cb-group-"+i);
        $("#group-tag"+i).attr('onclick', 'highlightTags(\"'+reasons[tag].tag_id+','+i+'\");');

        var newlyCreatedSpan = document.getElementById("group-tag"+i);
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = reasons[tag].tag_id;
        newlyCreatedSpan.appendChild(checkbox);
        $("#"+reasons[tag].tag_id).checked = false;
        $("#"+reasons[tag].tag_id).addClass("cb-"+i);
        $("#"+reasons[tag].tag_id).attr('onclick', 'highlightTags(\"'+reasons[tag].tag_id+','+i+'\");');


        var labelSpan = document.createElement("span");
        labelSpan.id = "label-tag"+i;
        newlyCreatedSpan.appendChild(labelSpan);
        $("#label-tag"+i).addClass("cb-label-"+i);
        $("#label-tag"+i).addClass("unselectable");
        $("#label-tag"+i).text(reasons[tag].reason_name);


        i++;
    }
    
}

function autoComplete(){
    //Load the options for the name to be autocompleted
    var options = {
        //data: dataset.nodes,
        data: razorpay_staff,
        theme: "dark",
        getValue: "name",
        template: {
            type: "iconLeft",
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
    $("#eac-container-txtName").click(function(){
        person_img = $("#eac-container-txtName").find(".selected").find(".eac-icon").attr("src").toString();
    })
}

function hideLoadernPaired(){
    $("#loading-msg").hide();
    $("#loading-cta").hide();
    $("#paired-msg").hide();
    $("#paired-list").hide();
    $("#paired-cta").hide();
}

function _initializeComponents(){    

    $("#viz-tooltip").hide();
    $("#node-circle").hide();
    $("#btn-connect").attr("disabled", true);
    $("#ui-cta").attr("data-tooltip","Name & reason plis? 😛");

    _initializeCheckboxes();
    hideLoadernPaired();
    autoComplete();
    getData();
}

_initializeComponents();


function highlightTags(vals){
    var checkboxID = vals.split(",")[0];
    var count = vals.split(",")[1];

    if(document.getElementById(checkboxID).checked) {
        document.getElementById(checkboxID).checked = false;
        $(".cb-group-"+count).removeClass("cb-group-"+count+"-checked");
        $(".cb-label-"+count).removeClass("cb-label-"+count+"-checked");
    }else{
        document.getElementById(checkboxID).checked = true;
        $(".cb-group-"+count).addClass("cb-group-"+count+"-checked");
        $(".cb-label-"+count).addClass("cb-label-"+count+"-checked");
    }

    //Trigger to check if connect-cta can be enabled when checkbox is touched. 
    //Basically, if at least one checkbox is selected, cta is enabled.
    enableConnect();
}


function getData(){
    $.ajax({
        async: false,
        type: 'GET',
        url: 'https://api.myjson.com/bins/'+jsonID,
        success: function(data) {
            dataset = data;
            databackup = JSON.parse(JSON.stringify(data));
        }
    });
}

function saveData(){

    var datasetCopy = JSON.parse(JSON.stringify(dataset));

    for(var i = 0; i < datasetCopy.nodes.length; i++) {
        delete datasetCopy.nodes[i]['x'];
        delete datasetCopy.nodes[i]['y'];
        delete datasetCopy.nodes[i]['vx'];
        delete datasetCopy.nodes[i]['vy'];
        delete datasetCopy.nodes[i]['fx'];
        delete datasetCopy.nodes[i]['fy'];
        delete datasetCopy.nodes[i]['index'];
    }

    $.ajax({
        url:"https://api.myjson.com/bins/"+jsonID,
        type:"PUT",
        data:JSON.stringify(datasetCopy),
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        success: function(){
        }
    });
}


function addEntry(){

    showLoadingMessage();
    simulatePeople.alphaTarget(0.1).restart();
    simulateReasons.alphaTarget(0.1).restart();

    var user_name = document.getElementById("txtName").value;
    var user_role = getUserDesignation(user_name);
    var user_org = getUserCompany(user_name)
    var user_reasons = [];

    for(var i=0; i<reasons.length; i++){
        if(document.getElementById(reasons[i].tag_id).checked){
            user_reasons.push(reasons[i].reason_id);
        }
    }

    var newNode = {
        attendee_id: nodes.length,
        name: user_name,
        photo: person_img,
        designation: user_role,
        company: user_org,
        experience: 1,
        reasons: user_reasons,
        pair_freq: 0
    };

    nodes.push(newNode);

        for(var j=0; j<user_reasons.length; j++){

            var current_reason;

            for(var reason in reasons){
                if(reason == user_reasons[j]){
                    current_reason = reasons[reason];
                    break;
                }
            }

            links.push({source: nodes[nodes.length-1], target: current_reason});
        }

        simulatePeople.nodes(nodes);
        computeNodes();
        computeLinks();
        computePeopleLabels();
        simulatePeople.force("link", d3.forceLink(links).distance(80+linkDistance).strength(1));

        simulatePeople.alphaTarget(0);
        simulateReasons.alphaTarget(0);
        highlightPeople(newNode.attendee_id);

    setTimeout(function(){
        pairingPeople();
        highlightPairs(newNode.attendee_id);
        saveData();
        
    }, 3000);

}


function showLoadingMessage(){
    $("#welcome-ftx").hide();
    $("#separator-line").hide();
    $("#ui-name").hide();
    $("#ui-tags").hide();
    $("#ui-cta").hide();

    $("#loading-msg").show();
    $("#loading-cta").show();
    $("#input-pane").addClass("reduce-height");
}

var pairedArr = [];

function pairingPeople(){

    var newestUser = nodes[nodes.length-1];
    var newestReasons = newestUser.reasons;
    var sortedUsers = nodes.sort(function(a, b){
                            return a["pair_freq"]-b["pair_freq"];
                        });
    // var pairedArr = [];
    var pairedIds = [];
    
    for(var n=0; n<newestReasons.length; n++){
        var newReason = newestReasons[n];
        var reasonObj = reasons.filter(reasonobj => reasonobj.reason_id == newReason);
        var newReasonName = reasonObj[0].reason_name;

        for(var j=Math.ceil(Math.random() * 5); j<sortedUsers.length; j++){
            
            var person = sortedUsers[j];

            if((person.reasons.indexOf(newReason) != -1) && 
            (newestUser.attendee_id != person.attendee_id) &&
            (pairedIds.indexOf(person.attendee_id) == -1)){
                
                person.pair_freq = person.pair_freq + 1;
                pairedArr.push({
                    "paired_attendee_id": person.attendee_id,
                    "paired_attendee_name": person.name,
                    "paired_reason_id": newReason,
                    "paired_reason_name": newReasonName,
                    "paired_role": person.designation,
                    "paired_org": person.company,
                    "paired_attendee_photo": person.photo
                });

                pairedIds[n] = person.attendee_id;

                break;
            }

        }

    }

    //Save paired_with data for this new person 
    var latestPerson =  nodes.filter(function(item){
                            return item.attendee_id ==  newestUser.attendee_id
                        });
    latestPerson[0].paired_with = pairedIds;

    $("#paired-body").text(newestUser.name+", we’ve found "+pairedArr.length+" people whom you can connect with.");

    var paired_list = document.getElementById("paired-list");
    var p = 1;

    pairedArr.forEach(function(pairedElem){
        
        var p_div = document.createElement("div");
        p_div.id = "pair-"+p;
        paired_list.appendChild(p_div);

        var newlyCreatedDiv = document.getElementById("pair-"+p);
        var p_img = document.createElement("img");
        p_img.id = "pair-img-"+p;
        newlyCreatedDiv.appendChild(p_img);
        $("#pair-img-"+p).addClass("pair-img");
        $("#pair-img-"+p).attr("src",pairedElem.paired_attendee_photo);
        $("#pair-img-"+p).css("border","2px solid "+returnColor(pairedElem.paired_reason_id));

        var p_name = document.createElement("span");
        p_name.id = "pair-name-"+p;
        newlyCreatedDiv.appendChild(p_name);
        $("#pair-name-"+p).addClass("pair-name");
        $("#pair-name-"+p).text(pairedElem.paired_attendee_name);

        var p_reason = document.createElement("span");
        p_reason.id = "pair-reason-"+p;
        newlyCreatedDiv.appendChild(p_reason);
        $("#pair-reason-"+p).addClass("pair-reason");
        $("#pair-reason-"+p).text(pairedElem.paired_reason_name);
        $("#pair-reason-"+p).css("background", returnColor(pairedElem.paired_reason_id));

        newlyCreatedDiv.appendChild(document.createElement("br"));

        var p_role = document.createElement("span");
        p_role.id = "pair-role-"+p;
        newlyCreatedDiv.appendChild(p_role);
        $("#pair-role-"+p).addClass("pair-role");

        $("#pair-role-"+p).text(((pairedElem.paired_role == "") ? "" : pairedElem.paired_role)
        +" " + ((pairedElem.paired_org == "") ? "" : "| "+pairedElem.paired_org));

        p++;
    })


    $("#input-pane").css("height",getPairedHeight(pairedArr.length));
    $("#input-pane").addClass("increase-height");
    $("#loading-msg").hide();
    $("#loading-cta").hide();
    $("#input-pane").removeClass("reduce-height");

    //Varying paired header - basically add non-monotonous final msg here
    var paired_header_list = ["Woohoo 🎉", "Ta-da 🔆","✨ Shazam ✨","Yaay 🎊","Bazinga ❄️","Yipee-ka-yay 🎆", "Hooray 🥳", "Yahoooooo 🥳", "Ahaaa 🤩", "Matches found ✅" ];
    var paired_header = paired_header_list[Math.floor(Math.random() * paired_header_list.length)];
    
    var no_paired_header_list = ["NOOOOO! ⛔", "What?! 🍁", "Not yet 😭", "You're early 🌟", ""]
    var no_paired_header = no_paired_header_list[Math.floor(Math.random() * no_paired_header_list.length)];

    $("#paired-header").text(paired_header);
    $("#paired-msg").show();

    setTimeout(function(){
        $("#paired-list").show();
        $("#paired-cta").show();
    }, 1000);
    
}

//Reset the view after finishing the flow
function restart(){

    simulatePeople.alphaTarget(0.1).restart();
    simulateReasons.alphaTarget(0.1).restart();

    resetHighlightPeople();

    // $("#input-pane").css("height","600px");
    $("#input-pane").removeClass("increase-height");
    $("#input-pane").css("height","");
    $("#input-pane").addClass("default-height");
    $("#txtName").val("");

    //Uncheck all checkboxes
    var tags = $("#ui-tags").find("input");
    for(var c=0; c<tags.length; c++){
        tags[c].checked = false;

        //(c+1) because of a screw-up. Checkbox elements start with '1' (can be changed) but their css-styles are hardcoded (neither dynamic nor scss :/) 
        //But, objs/arrays/~computing~ starts with 0 (duh). So, it's either add a dirty (c+1) below or go change css. I have no time :/
        $("#group-tag"+(c+1)).removeClass("cb-group-"+(c+1)+"-checked");
    }

    $("#paired-header").text("");
    $("#paired-body").text("");
    $("#paired-list").empty();

    hideLoadernPaired();

    $("#paired-cta").hide();
    $("#welcome-ftx").show();
    $("#separator-line").show();
    $("#ui-name").show();
    $("#ui-tags").show();
    $("#ui-cta").show();
    
    enableConnect();

}


//Used to set colors based on reason for the img and reason-tag on the final paired list
function returnColor(reasonid){

    var color = "white";

    for(var i=0; i<reasons.length; i++){
        if(reasons[i].reason_id == reasonid){
            color = reasons[i].reason_color;
        }
    }

    return color;

}


// Enable connect CTA when name is entered and tags are filled
$("#txtName").on("keyup", function(){enableConnect();});
$("#txtName").on("change", function(){enableConnect();});
//Checkbox's trigger is in highlighttags()

function enableConnect(){

    var nameLength = $("#txtName").val().length;
    var isTagSelected = false;

    var tags = $("#ui-tags").find("input");
    for(var c=0; c<tags.length; c++){
        if(tags[c].checked){
            isTagSelected = true;
            break;
        } else{
            isTagSelected = false;
        }
    }

    if((nameLength>=3) && (isTagSelected)){
        $("#btn-connect").attr("disabled", false);
        $("#ui-cta").removeAttr("data-tooltip");
    }else{
        $("#btn-connect").attr("disabled", true);
        $("#ui-cta").attr("data-tooltip","Name & reason plis? 😛");
    }
    
}

//hardcoding heights of the boxes as there's no time to add calculation logic
function getPairedHeight(noOfPairs){
    switch(noOfPairs){
        case 1:
            return "390px";
        case 2:
            return "470px";
        case 3:
            return "550px";
        case 4:
            return "630px";
        case 5:
            return "710px";
        default:
            return "600px";
    }
}


//Display or close the about-modal
function showAbout(){
    var modal = document.getElementById("ftx-modal");
    modal.style.display = "block";
}

function closeAbout(){
    var modal = document.getElementById("ftx-modal");
    modal.style.display = "none";
}

var modal = document.getElementById("ftx-modal");
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }