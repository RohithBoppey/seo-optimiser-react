const axios = require("axios");
const post_array = [];
post_array.push({
	target: "dataforseo.com",
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
axios({
	method: "post",
	url: "https://api.dataforseo.com/v3/on_page/task_post",
	auth: {
		username: "rohithboppey1298@gmail.com",
		password: "aeeb9296debfe0a3",
	},
	data: post_array,
	headers: {
		"content-type": "application/json",
	},
})
	.then(function (response) {
		var result = response["data"]["tasks"];
		// Result data
		console.log(result);
	})
	.catch(function (error) {
		console.log(error);
	});
