(function() {
	var dummyContent = '{ "rules": { "name": "default", "children": [ { "name": "Performance", "children": [ { "name": "Compressible Objects", "children": [], "behaviors": [ { "name": "gzipResponse", "options": { "behavior": "ALWAYS" } } ], "criteria": [ { "name": "contentType", "options": { "matchCaseSensitive": false, "matchOperator": "IS_ONE_OF", "matchWildcard": true, "values": [ "text/*", "application/javascript", "application/x-javascript", "application/x-javascript*", "application/json", "application/x-json", "application/*+json", "application/*+xml", "application/text", "application/vnd.microsoft.icon", "application/vnd-ms-fontobject", "application/x-font-ttf", "application/x-font-opentype", "application/x-font-truetype", "application/xmlfont/eot", "application/xml", "font/opentype", "font/otf", "font/eot", "image/svg+xml", "image/vnd.microsoft.icon" ] } } ], "criteriaMustSatisfy": "all", "comments": "Compresses content to improve performance of clients with slow connections. Applies Last Mile Acceleration to requests when the returned object supports gzip compression." } ], "behaviors": [ { "name": "enhancedAkamaiProtocol", "options": { "display": "" } }, { "name": "allowTransferEncoding", "options": { "enabled": true } }, { "name": "removeVary", "options": { "enabled": true } } ], "criteria": [], "criteriaMustSatisfy": "all", "comments": "Improves the performance of delivering objects to end users. Behaviors in this rule are applied to all requests as appropriate." }, { "name": "Offload", "children": [ { "name": "CSS and JavaScript", "children": [], "behaviors": [ { "name": "caching", "options": { "behavior": "MAX_AGE", "mustRevalidate": false, "ttl": "1d" } }, { "name": "prefreshCache", "options": { "enabled": true, "prefreshval": 90 } } ], "criteria": [ { "name": "fileExtension", "options": { "matchCaseSensitive": false, "matchOperator": "IS_ONE_OF", "values": [ "css", "js" ] } } ], "criteriaMustSatisfy": "any", "comments": "Overrides the default caching behavior for CSS and JavaScript objects that are cached on the edge server. Because these object types are dynamic, the TTL is brief." }, { "name": "Static Objects", "children": [], "behaviors": [ { "name": "caching", "options": { "behavior": "MAX_AGE", "mustRevalidate": false, "ttl": "7d" } }, { "name": "prefreshCache", "options": { "enabled": true, "prefreshval": 90 } } ], "criteria": [ { "name": "fileExtension", "options": { "matchCaseSensitive": false, "matchOperator": "IS_ONE_OF", "values": [ "aif", "aiff", "au", "avi", "bin", "bmp", "cab", "carb", "cct", "cdf", "class", "doc", "dcr", "dtd", "exe", "flv", "gcf", "gff", "gif", "grv", "hdml", "hqx", "ico", "ini", "jpeg", "jpg", "mov", "mp3", "nc", "pct", "pdf", "png", "ppc", "pws", "swa", "swf", "txt", "vbs", "w32", "wav", "wbmp", "wml", "wmlc", "wmls", "wmlsc", "xsd", "zip", "pict", "tif", "tiff", "mid", "midi", "ttf", "eot", "woff", "woff2", "otf", "svg", "svgz", "webp", "jxr", "jar", "jp2" ] } } ], "criteriaMustSatisfy": "any", "comments": "Overrides the default caching behavior for images, music, and similar objects that are cached on the edge server. Because these object types are static, the TTL is long." }, { "name": "Uncacheable Responses", "children": [], "behaviors": [ { "name": "downstreamCache", "options": { "behavior": "TUNNEL_ORIGIN" } } ], "criteria": [ { "name": "cacheability", "options": { "matchOperator": "IS_NOT", "value": "CACHEABLE" } } ], "criteriaMustSatisfy": "all", "comments": "Overrides the default downstream caching behavior for uncacheable object types. Instructs the edge server to pass Cache-Control and/or Expire headers from the origin to the client." } ], "behaviors": [ { "name": "caching", "options": { "behavior": "NO_STORE" } }, { "name": "cacheError", "options": { "enabled": true, "preserveStale": true, "ttl": "10s" } }, { "name": "downstreamCache", "options": { "allowBehavior": "LESSER", "behavior": "ALLOW", "sendHeaders": "CACHE_CONTROL_AND_EXPIRES", "sendPrivate": false } } ], "criteria": [], "criteriaMustSatisfy": "all", "comments": "Controls caching, which offloads traffic away from the origin. Most objects types are not cached. However, the child rules override this behavior for certain subsets of requests." }, { "name": "Image Manager", "children": [], "behaviors": [ { "name": "caching", "options": { "behavior": "MAX_AGE", "mustRevalidate": false, "ttl": "30d" } } ], "criteria": [ { "name": "fileExtension", "options": { "matchCaseSensitive": false, "matchOperator": "IS_ONE_OF", "values": [ "jpg", "gif", "jpeg", "png", "imviewer" ] } } ], "criteriaMustSatisfy": "all", "comments": "Enable Scale for Mobile to serve the best available size for the requesting device. (Careful testing is highly recommended.) Enable Use Best File Type to serve the image format that works best for the requesting client. To configure breakpoint widths, derivative image quality, and artistic transformations, save and activate this configuration; then, create policies for this policy set via either Image Manager Policy Manager or the OPEN Image Manager API." } ], "behaviors": [ { "name": "origin", "options": { "cacheKeyHostname": "ORIGIN_HOSTNAME", "compress": true, "enableTrueClientIp": false, "forwardHostHeader": "ORIGIN_HOSTNAME", "httpPort": 80, "originType": "CUSTOMER", "hostname": "origin.akamaideveloper.net" } }, { "name": "cpCode", "options": { "value": { "id": 755127, "name": "DEV-POPS-RESERVED-123081", "description": "DevPoPs internal CPCODE" } } }, { "name": "allowPost", "options": { "allowWithoutContentLength": false, "enabled": true } }, { "name": "realUserMonitoring", "options": { "enabled": true } } ], "options": { "is_secure": false }, "variables": [], "comments": "The behaviors in the Default Rule apply to all requests for the property hostname(s) unless another rule overrides the Default Rule settings." } }';
	//var parsedContent = JSON.stringify(JSON.parse(dummyContent), null, "\t")
	document.getElementById("jsoncontent").value = dummyContent;
	callJSONTree();
	
	//event binding
	var visualize = document.getElementById("visualize");
	visualize.addEventListener("click", callJSONTree, true);
	var vertical = document.getElementsByName("vertical_horizontal")[0];
	var horizontal = document.getElementsByName("vertical_horizontal")[1];
	vertical.addEventListener("change", callJSONTree, true);
	horizontal.addEventListener("change", callJSONTree, true);
})();

function callJSONTree() {
	formatJSON();
	document.getElementById("jsontree").innerHTML = "";
	var latestJSON = document.getElementById("jsoncontent").value;
	if(document.getElementsByName("vertical_horizontal")[0].checked) {
		JSONTree(latestJSON, true);
	} else {
		JSONTree(latestJSON, false);
	}
}

function formatJSON() {
	try {
		var parsedContent = JSON.stringify(JSON.parse(document.getElementById("jsoncontent").value), null, "\t");
	} catch(e) {
		alert("Invalid JSON");
		return false;
	}
	document.getElementById("jsoncontent").value = parsedContent;
}

function JSONTree(jsonContent, isHorizontal) {
	isHorizontal = (isHorizontal === undefined || isHorizontal === true ? true : false);
	try {
		jsonContent = JSON.parse(jsonContent);
	} catch (e) {
		return;
	}
	var m = [20, 120, 20, 120],
		w = 2000 - m[1] - m[3],
		h = 800 - m[0] - m[2],
		i = 0,
		root;

	var tree = d3.layout.tree()
		.size([h, w]);

	var diagonal = d3.svg.diagonal()
		.projection(function(d) {
			if (isHorizontal === true) {
				return [d.x, d.y];
			} else {
				return [d.y, d.x];
			}
		});

	var vis = d3.select("#jsontree").append("svg:svg")
		.attr("padding", 20)
		.attr("width", w + m[1] + m[3])
		.attr("height", h + m[0] + m[2])
		.append("svg:g")
		.attr("class", 'drawarea')
		.attr("transform", "translate(" + m[0] + "," + m[3] + ")");
		var json = prepareFn(jsonContent);
		root = json;
		root.x0 = h / 2;
		root.y0 = 0;

	function toggleAll(d) {
		if (d.children) {
			d.children.forEach(toggleAll);
			toggle(d);
		}
	}

	// Initialize the display to show a few nodes.
	//root.children.forEach(toggleAll);
	//toggle(root.children[1]);
	/*toggle(root.children[1].children[2]);
	  	toggle(root.children[9]);
	  	toggle(root.children[9].children[0]);
		*/
	update(root);
	vis.call(zoom);


	function update(source) {
		var duration = d3.event && d3.event.altKey ? 5000 : 500;

		// Compute the new tree layout.
		var nodes = tree.nodes(root).reverse();

		// Normalize for fixed-depth.
		nodes.forEach(function(d) {
			d.y = d.depth * 190;
		});

		// Update the nodes…
		var node = vis.selectAll("g.node")
			.data(nodes, function(d) {
				return d.id || (d.id = ++i);
			});

		// Enter any new nodes at the parent's previous position.
		var nodeEnter = node.enter().append("svg:g")
			.attr("class", "node")
			.attr("transform", function(d) {
				if (isHorizontal === true) {
					return "translate(" + source.x0 + "," + source.y0 + ")";
				} else {
					return "translate(" + source.y0 + "," + source.x0 + ")";
				}
			})
			.on("click", function(d) {
				toggle(d);
				update(d);
			});

		nodeEnter.append("svg:circle")
			.attr("r", 1e-6)
			.style("fill", function(d) {
				return d._children ? "lightsteelblue" : "#fff";
			});

		nodeEnter.append("svg:text")
			.attr("x", function(d) {
				return 20;
			})
			.attr("dy", ".35em")
			.attr("text-anchor", function(d) {
				return "start";
			})
			.text(function(d) {
				return d.name;
			})
			.style("fill-opacity", 1e-6);

		// Transition nodes to their new position.
		var nodeUpdate = node.transition()
			.duration(duration)
			.attr("transform", function(d) {
				if (isHorizontal === true) {
					return "translate(" + d.x + "," + d.y + ")";
				} else {
					return "translate(" + d.y + "," + d.x + ")";
				}
			});

		nodeUpdate.select("circle")
			.attr("r", 4.5)
			.style("fill", function(d) {
				return d._children ? "lightsteelblue" : "#fff";
			});

		nodeUpdate.select("text")
			.style("fill-opacity", 1);

		// Transition exiting nodes to the parent's new position.
		var nodeExit = node.exit().transition()
			.duration(duration)
			.attr("transform", function(d) {
				return "translate(" + source.x + "," + source.y + ")";
			})
			.remove();

		nodeExit.select("circle")
			.attr("r", 1e-6);

		nodeExit.select("text")
			.style("fill-opacity", 1e-6);

		// Update the links…
		var link = vis.selectAll("path.link")
			.data(tree.links(nodes), function(d) {
				return d.target.id;
			});

		// Enter any new links at the parent's previous position.
		link.enter().insert("svg:path", "g")
			.attr("class", "link")
			.attr("d", function(d) {
				var o = {
					x: source.x0,
					y: source.y0
				};
				return diagonal({
					source: o,
					target: o
				});
			})
			.transition()
			.duration(duration)
			.attr("d", diagonal);

		// Transition links to their new position.
		link.transition()
			.duration(duration)
			.attr("d", diagonal);

		// Transition exiting nodes to the parent's new position.
		link.exit().transition()
			.duration(duration)
			.attr("d", function(d) {
				var o = {
					x: source.x,
					y: source.y
				};
				return diagonal({
					source: o,
					target: o
				});
			})
			.remove();

		// Stash the old positions for transition.
		nodes.forEach(function(d) {
			d.x0 = d.x;
			d.y0 = d.y;
		});
		d3.select("svg")
			.call(d3.behavior.zoom()
				.scaleExtent([0.5, 5])
				.on("zoom", zoom));
	}

	function zoom() {
		if(d3.event) {
			var scale = d3.event.scale,
				translation = d3.event.translate,
				tbound = -h * scale,
				bbound = h * scale,
				lbound = (-w + m[1]) * scale,
				rbound = (w - m[3]) * scale;
			// limit translation to thresholds
			translation = [
				Math.max(Math.min(translation[0], rbound), lbound),
				Math.max(Math.min(translation[1], bbound), tbound)
			];
			d3.select(".drawarea")
		    .attr("transform", "translate(" + translation + ")" +
		          " scale(" + scale + ")");
		}
	}
};

// Toggle children.
function toggle(d) {
	if (d.children) {
		d._children = d.children;
		d.children = null;
	} else {
		d.children = d._children;
		d._children = null;
	}
}

function prepareFn(json) {
	var treeLayout = {
		name: "",
		children: []
	};
	for (eachItem in json) {
		treeLayout.children.push({
			name: eachItem,
			children: []
		})
	}
	parseInnerValues(treeLayout.children, json);
	return treeLayout;
}

function getSubLayout(sublevel) {
	var layout = [];
	for (var eachItem in sublevel) {
		layout.push({
			name: eachItem,
			children: []
		})
	}
	return layout;
}

function parseInnerValues(treeLayout, json) {
	var returnJSON = {};
	treeLayout.forEach(function(item, idx) {
		if (Object.prototype.toString.call(json[item.name]) === '[object Array]') {
			returnJSON = {};
			returnJSON.name = item.name;
			returnJSON.children = item.children = getSubLayout(json[item.name]);
			parseInnerValues(returnJSON.children, json[item.name])
			//item.children[idx].children.push(parseInnerValues(returnJSON.children, json[item.name], "self"));
		} else if (typeof json[item.name] == "object") {
			returnJSON = {};
			returnJSON.name = item.name;
			returnJSON.children = item.children = getSubLayout(json[item.name]);
			parseInnerValues(returnJSON.children, json[item.name])
			//item.children[idx].children.push(parseInnerValues(returnJSON.children, json[item.name], "self"));
		} else {
			returnJSON = {};
			returnJSON.name = json[item.name];
			returnJSON.children = null;
			if (item.children) {
				item.children[0] = returnJSON;
			} else {
				item.children = [returnJSON];
			}
			//item.name = item.name + ":" + json[item.name];
		}
	});
	return treeLayout;
};