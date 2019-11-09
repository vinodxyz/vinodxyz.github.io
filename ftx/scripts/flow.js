/* <div id="ui-tags">
    <label id="lblTags">and, you’re here in order to:</label>
    <span id="group-tag1" class="cb-group-1st" onclick="highlightTags();">
        <input type="checkbox" id="tag1" class="cb-1st" value="Boat" unchecked onclick="highlightTags();">
        <span id="label-tag-1" class="cb-label-1st">socialize</span>
    </span>
</div> */

function _initializeComponents(){
    //For each reason, dynamically generate a multi-select tag component:
    var tags = document.getElementById("ui-tags");
    var i = 1;

    for(var tag in reasons){
        var span = document.createElement("span");
        span.id = "group-tag"+i;
        tags.appendChild(span);
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

    //Load the options for the name to be autocompleted
    // var options = {
    //     data: dataset.nodes,
    //     theme: "dark",
    //     getValue: "name",
    //     template: {
    //         type: "iconRight",
    //         fields: {
    //             iconSrc: "photo"
    //         }
    //     },
    //     list: {
    //         maxNumberOfElements: 5,
    //         match: {
    //             enabled: true
    //         }
    //     }
    // };

    // $("#txtName").easyAutocomplete(options);

    

    
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

