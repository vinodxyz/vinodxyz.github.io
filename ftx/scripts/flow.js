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

$("#user_name").easyAutocomplete(options);