
        var slider = d3.select('#yearSlider').on("change", function() {
            renderChart();
        });


        var margin = {
            top: 150,
            right: 100,
            bottom: 130,
            left: 120
        };
        var width = 1000;
        var height = 300;

        const nodePadding = 30;
        const circularLinkGap = 2;

        var renderChart = function() {

            var scaleSankey = 1.2;
            var extentY = 300;
            //var align = d3.sankeyJustify;

            var sankey = d3.sankey()
                .nodeWidth(10)
                .nodePadding(nodePadding)
                .nodePaddingRatio(0.5)
                .scale(scaleSankey)
                .size([600, 600])
                .extent([
                    [0, 0],
                    [600, extentY]
                ])
                .nodeId(function(d) {
                    return d.name;
                })
                .nodeAlign(d3.sankeyJustify)
                .iterations(32);

            d3.select("svg").remove();

            var year = $("#yearSlider").val();
            d3.select("#year-label").text(year);
            let data;// = sankeyData[year];
            
            d3.json("../csv/sankey-flow-story.json", function(json){
                data = json[year];
            });

            var generateSankeyFlow = function() {

                var svg = d3.select("#chart").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom);

                var g = svg.append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

                var linkG = g.append("g")
                    .attr("class", "links")
                    .attr("fill", "none")
                    .attr("stroke-opacity", 0.2)
                    .selectAll("path");

                var nodeG = g.append("g")
                    .attr("class", "nodes")
                    .attr("font-family", "sans-serif")
                    .attr("font-size", 10)
                    .selectAll("g");

                //run the Sankey + circular over the data
                let sankeyData = sankey(data);
                let sankeyNodes = sankeyData.nodes;
                let sankeyLinks = sankeyData.links;

                let depthExtent = d3.extent(sankeyNodes, function(d) {
                    return d.depth;
                });

                //    var nodeColour = d3.scaleSequential(d3.interpolateCool)
                //    .domain([0,width]);
                var nodeColour = d3.scaleOrdinal().range(["#EFB605", "#E58903", "#E01A25", "#C20049", "#991C71", "#66489F", "#2074A0", "#10A66E", "#7EB852", "#AAA9AA", "#5CEAEA"]).domain(['Rwanda', 'Syrian Arab Rep.', 'Afghanistan', 'Dem. Rep. of the Congo', 'Iraq', 'Viet Nam', 'Burundi', 'Ethiopia', 'Myanmar', 'Somalia', 'Sudan']);


                //Adjust link Y coordinates based on target/source Y positions
                var node = nodeG.data(sankeyNodes)
                    .enter()
                    .append("g");

                //Set colors of countries other than the ones we are investigating to grey, to avoid fruit-salads.
                var countries = ['Rwanda', 'Syrian Arab Rep.', 'Afghanistan', 'Dem. Rep. of the Congo', 'Iraq', 'Viet Nam', 'Burundi', 'Ethiopia', 'Myanmar', 'Somalia', 'Sudan'];

                if (data.story) {
                    d3.select("#story-Afghanistan").text(data.story.Afghanistan);
                    d3.select("#story-Syria").text(data.story["Syrian Arab Rep."]);
                    d3.select("#story-Iraq").text(data.story["Iraq"]);
                    d3.select("#story-Congo").text(data.story["Dem. Rep. of the Congo"]);
                    d3.select("#story-Rwanda").text(data.story["Rwanda"]);
                    d3.select("#story-Ethiopia").text(data.story["Ethiopia"]);
                    d3.select("#story-Somalia").text(data.story["Somalia"]);
                    d3.select("#story-Sudan").text(data.story["Sudan"]);
                    d3.select("#story-Vietnam").text(data.story["Viet Nam"]);
                    d3.select("#story-Myanmmar").text(data.story["Myanmar"]);
                    d3.select("#story-Burundi").text(data.story["Burundi"]);
                }

                node.append("rect")
                    .attr("x", function(d) {
                        return d.x0;
                    })
                    .attr("y", function(d) {
                        return d.y0;
                    })
                    .attr("height", function(d) {
                        return d.y1 - d.y0;
                    })
                    .attr("width", function(d) {
                        return (d.x1 - d.x0);
                    })
                    .style("fill", function(d) {

                        var isDestination = $.inArray(d.name, countries);

                        if (+isDestination != -1)
                            return nodeColour(d.name);
                        else
                            return "#333333";
                    })
                    .style("cursor", "pointer")
                    .attr("class", function(d) {
                        var isDestination = $.inArray(d.name, countries);

                        if (+isDestination != -1)
                            return "origin";
                        else
                            return "destination";
                    })
                    .style("opacity", function(d) {
                        var isDestination = $.inArray(d.name, countries);

                        if (+isDestination != -1)
                            return 1;
                        else
                            return 0.5;
                    })
                    .on("mouseover", function(d) {
                        let thisName = d.name;

                        node.selectAll("rect")
                            .style("opacity", function(d) {
                                return highlightNodes(d, thisName)
                            })

                        d3.selectAll(".sankey-link")
                            .style("opacity", function(l) {
                                return l.source.name == thisName || l.target.name == thisName ? 1 : 0.2;
                            })

                        node.selectAll("text")
                            .style("opacity", function(d) {
                                return highlightNodes(d, thisName)
                            }).attr("fill", function(d) {
                                var isDestination = $.inArray(d.name, countries);

                                if (+isDestination != -1)
                                    return nodeColour(d.name);
                                else
                                    return "#242424";
                            });

                        d3.selectAll(".g-arrow path")
                            .style("opacity", function(l) {
                                return l.source.name == thisName || l.target.name == thisName ? 1 : 0.2;
                            })
                        //            .style("stroke", function (l) {
                        //            return l.source.name == thisName || l.target.name == thisName ? nodeColour(thisName): "black";
                        //          })

                    })
                    .on("mouseout", function(d) {
                        d3.selectAll(".origin").style("opacity", 1);
                        d3.selectAll(".destination").style("opacity", 0.5);
                        d3.selectAll(".sankey-link").style("opacity", 0.7);
                        d3.selectAll("text").style("opacity", 1).attr("fill", function(d) {
                            var isDestination = $.inArray(d.name, countries);

                            if (+isDestination != -1)
                                return nodeColour(d.name);
                            else if(+d.value < 200000){
                                var currYear = $("#yearSlider").val();
                                if((+currYear == 1994) || (+currYear >= 2000)){
                                    console.log("YES");
                                    return "#FFFFFF";
                                }
                            }
                            else{
                                return "#EAEAEA";
                            }
                        });
                        d3.selectAll(".g-arrow path").style("opacity", 1); //.style("stroke","black");
                    })

                node.append("text")
                    .attr("x", function(d) {
                        if(+d.depth == 0){
                            return (d.x0 - 60);
                        }
                        else{
                            return (d.x0 + 20);
                        }
                    })
                    .attr("y", function(d) {
                        return (d.y0 + d.y1) / 2;
                    })
                    .attr("dy", "0.35em")
                    //.attr("text-align", "right")
                    .style("cursor", "pointer")
                    .attr("fill", function(d) {
                        //return "#949494";
                        var isDestination = $.inArray(d.name, countries);

                        if (+isDestination != -1)
                            return nodeColour(d.name);
                        else if(+d.value < 200000){
                            var currYear = $("#yearSlider").val();
                            if((+currYear == 1994) || (+currYear >= 2000)){
                                console.log("YES");
                                return "#FFFFFF";
                            }
                        }
                        else{
                            return "#EAEAEA";
                        }
                    })
                    .text(function(d) {
                        if(d.name == "Viet Nam"){
                            return "Vietnam";
                        }
                        else if(d.name == "Dem. Rep. of the Congo"){
                            return "Congo";
                        }
                        else if(d.name == "Syrian Arab Rep."){
                            return "Syria";
                        }
                        else{
                            return d.name;
                        }
                    })
                    .on("mouseover", function(d) {
                        var theName = d.name;
                        console.log(d);

                        node.selectAll("rect")
                            .style("opacity", function(d) {
                                return highlightNodes(d, theName)
                            })

                        d3.selectAll(".sankey-link")
                            .style("opacity", function(l) {
                                return l.source.name == theName || l.target.name == theName ? 1 : 0.3;
                            })

                        node.selectAll("text")
                            .style("opacity", function(d) {
                                return highlightNodes(d, theName)
                            }).attr("fill", function(d) {
                                var isDestination = $.inArray(d.name, countries);

                                if (+isDestination != -1)
                                    return nodeColour(d.name);
                                else
                                    return "#242424";
                            });

                        d3.selectAll(".g-arrow path")
                            .style("opacity", function(l) {
                                return l.source.name == theName || l.target.name == theName ? 1 : 0.2;
                            })
                    })
                    .on("mouseout", function(d) {
                        d3.selectAll("rect").style("opacity", 0.5);
                        d3.selectAll(".sankey-link").style("opacity", 0.7);
                        d3.selectAll("text").style("opacity", 1).attr("fill", function(d) {
                            var isDestination = $.inArray(d.name, countries);

                            if (+isDestination != -1)
                                return nodeColour(d.name);
                            else if(+d.value < 200000){
                                var currYear = $("#yearSlider").val();
                                if((+currYear == 1994) || (+currYear >= 2000)){
                                    console.log("YES");
                                    return "#FFFFFF";
                                }
                            }
                            else{
                                return "#EAEAEA";
                            }
                        });
                        d3.selectAll(".g-arrow path").style("opacity", 1);
                    });

                node.append("title")
                    .text(function(d) {
                        var val = d.value.toString();
                        val = val.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        return d.name + "\n" + (val);
                    });

                var link = linkG.data(sankeyLinks)
                    .enter()
                    .append("g");


                link.append("path")
                    .attr("class", "sankey-link")
                    .attr("d", sankeyPath)
                    .style("stroke-width", function(d) {
                        return Math.max(1, d.width);
                    })
                    .style("opacity", 0.7)
                    .style("cursor", "pointer")
                    .style("stroke", function(link, i) {
                        return link.circular ? "red" : "black";
                        //return nodeColour(link.source.name);
                    })



                link.append("title")
                    .text(function(d) {
                        var val = d.value.toString();
                        val = val.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        return d.source.name + " → " + d.target.name + "\n" + (val) + " refugees";
                    });


                //ARROWS
                var arrowsG = linkG.data(sankeyLinks)
                    .enter()
                    .append("g")
                    .attr("class", "g-arrow")
                    .call(appendArrows, 10, 10, 4) //arrow length, gap, arrow head size

                arrowsG.selectAll("path")
                    .style("stroke-width", "2")
                    .style("stroke-dasharray", "5,5")

                arrowsG.selectAll(".arrow-head").remove()

                let duration = 5
                let maxOffset = 10;
                let percentageOffset = 1;

                var animateDash = setInterval(updateDash, duration);

                function updateDash() {

                    arrowsG.selectAll("path")
                        .style("stroke-dashoffset", percentageOffset * maxOffset)

                    percentageOffset = percentageOffset == 0 ? 1 : percentageOffset - 0.01

                }

                function highlightNodes(node, name) {

                    let opacity = 0.2;

                    if (node.name == name) {
                        opacity = 1;
                    }

                    node.sourceLinks.forEach(function(link) {
                        if (link.target.name == name) {
                            opacity = 1;
                        };
                    })
                    node.targetLinks.forEach(function(link) {
                        if (link.source.name == name) {
                            opacity = 1;
                        };
                    })

                    return opacity;

                }

            };

            generateSankeyFlow();
        };

        $('#yearSlider').val(1961);
        renderChart();
        //animate the playback
        var timer = 1000;
        var refreshIntervalId = setInterval(function() {
            var currValue = $('#yearSlider').val();
            if (currValue < 2016) {
                console.log("ETF");
                $('#yearSlider').val(parseInt(currValue) + 1);
                renderChart();
            } else {
                clearInterval(refreshIntervalId);
            }

        }, timer);

        var clicked = false;

        $("#btnPause").on("click", function() {

            if (clicked) {
                refreshIntervalId = setInterval(function() {
                    var currValue = $('#yearSlider').val();
                    $('#yearSlider').val(parseInt(currValue) + 1);
                    renderChart();
                }, timer);
                $("#btnPause").val("Pause");
                clicked = false;
            } else {
                clearInterval(refreshIntervalId);
                $("#btnPause").val("Resume");
                clicked = true;
            }
        });