function _initializeChecboxes(){

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
        data: dataset.nodes,
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
}

function _initializeComponents(){
    _initializeChecboxes();
    autoComplete();
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
}

