const filterURL = (url) => {
	// this function should remove the www part and https part from the link
	// and return the true domain

	// https://letterboxd.com/ -> letterboxd.com

	// Remove the "http://" or "https://" if present
	url = url.replace(/^(https?:\/\/)?/, "");

	// Remove "www." if present
	url = url.replace(/^(www\.)?/, "");

	// Remove any trailing slashes
	url = url.replace(/\/$/, "");

	return url;
};

// testing links -

// console.log(filterURL("https://letterboxd.com/movie/id"));
// console.log(
// 	filterURL("https://docs.dataforseo.com/v3/on_page/task_post/?bash")
// );
// console.log(filterURL("https://letterboxd.com/"));
// console.log(filterURL("https://internshala.com/chat/c-58150378?filter=all"));
// console.log(filterURL("https://www.youtube.com/"));
// console.log(filterURL("www.youtube.com/"));
// console.log(filterURL("http://www.youtube.com/"));

module.exports = filterURL;
