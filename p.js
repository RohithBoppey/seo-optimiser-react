const axios = require("axios");

const ID = "09152112-6690-0216-0000-e43adc52ecf9";

const details = {
	username: "issky455@digdig.org",
	password: "39854c4dffe04a21",
};

const generateNonIndexables = async (ID) => {
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

    console.log(response.data.tasks[0].result[0]);

};

generateNonIndexables(ID);
