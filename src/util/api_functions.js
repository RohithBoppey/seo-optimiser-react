import axios from "axios";
import filterURL from "./filter_functions";

const details = {
	username: "issky455@digdig.org",
	password: "39854c4dffe04a21",
};

// this function takes in URL and returns a ID to identify
export const sendRequestToAPI = async (target_link) => {
	let post_array = [];

	const filteredLink = filterURL(target_link);
	console.log(filteredLink);

	post_array.push({
		target: target_link,
		max_crawl_pages: 10,
		load_resources: true,
		enable_javascript: true,
		enable_browser_rendering: true,
		calculate_keyword_density: true,
		store_raw_html: true,
		custom_js: "meta = {}; meta.url = document.URL; meta;",
		tag: "some_string_123",
		pingback_url: "https://your-server.com/pingscript?id=$id&tag=$tag",
	});

	// first create a task and then use that ID to find the required ones

	const response = await axios({
		method: "post",
		url: "https://api.dataforseo.com/v3/on_page/task_post",
		auth: {
			username: details.username,
			password: details.password,
		},
		data: post_array,
		headers: {
			"content-type": "application/json",
		},
	});

	let result = response["data"]["tasks"];
	let ID = result[0]?.id;
	console.log(result);
	return { ID, result };
};

export const generateKeywordDensity = async (ID) => {
	const post_array = [];
	post_array.push({
		id: ID,
		keyword_length: 2,
		filters: ["frequency", ">", 25],
	});

	const response = await axios({
		method: "post",
		url: "https://api.dataforseo.com/v3/on_page/keyword_density",
		auth: {
			username: details.username,
			password: details.password,
		},
		data: post_array,
		headers: {
			"content-type": "application/json",
		},
	});

	return response["data"]["tasks"];
};

export const generatePageResources = async (ID) => {
	const post_array = [];
	post_array.push({
		id: ID,
		filters: [
			["resource_type", "=", "image"],
			"and",
			["size", ">", 100000],
		],
		order_by: ["size,desc"],
		limit: 10,
	});

	const response = await axios({
		method: "post",
		url: "https://api.dataforseo.com/v3/on_page/resources",
		auth: {
			username: details.username,
			password: details.password,
		},
		data: post_array,
		headers: {
			"content-type": "application/json",
		},
	});

	return response["data"]["tasks"];
};

export const generateNonIndexables = async (ID) => {
	const post_array = [];
	post_array.push({
		id: ID,
		filters: [
			["reason", "=", "robots_txt"],
			"and",
			["url", "like", "%go%"],
		],
		limit: 10,
	});

	const response = await axios({
		method: "post",
		url: "https://api.dataforseo.com/v3/on_page/non_indexable",
		auth: {
			username: details.username,
			password: details.password,
		},
		data: post_array,
		headers: {
			"content-type": "application/json",
		},
	});

	return response["data"]["tasks"];
};

