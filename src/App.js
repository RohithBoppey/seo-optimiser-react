import "./App.css";
import ReactJson from "react-json-view";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import { BigTitle } from "./components/BigTitle";
import { Center, LoadingOverlay, Text } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import filterURL from "./util/filter_functions";
import {
	generateKeywordDensity,
	generateNonIndexables,
	generatePageResources,
	sendRequestToAPI,
} from "./util/api_functions";

function App() {
	const [getStarted, setGetStarted] = useState(true);
	const [taskId, setTaskId] = useState("");

	const [keywords, setKeywords] = useState({});
	const [resources, setResources] = useState({});
	const [nonIndexable, setNonIndexable] = useState({});

	const [loading, setLoading] = useState(false);

	const urlRef = useRef();

	const changeState = () => {
		console.log(getStarted);
		setGetStarted((prev) => {
			return !prev;
		});
	};

	useEffect(() => {
		console.log("in effect");
		if (taskId.length !== 0) {
			const interval = setInterval(async () => {
				let result = await generateKeywordDensity(taskId);
				console.log(result);

				if (result[0].status_code === 40401) {
					alert("Error occured");
					clearInterval(interval);
					setLoading(false);
				}

				if (
					result[0].result !== null &&
					result[0].result[0].crawl_progress !== "in_progress"
				) {
					setKeywords(result[0].result);
					setLoading(false);
					clearInterval(interval);
				}
			}, 5000);
		}
	}, [taskId]);

	useEffect(() => {
		if (taskId.length !== 0) {
			const interval = setInterval(async () => {
				let result = await generatePageResources(taskId);

				if (result[0].status_code === 40401) {
					alert("Error occured");
					clearInterval(interval);
					setLoading(false);
				}

				console.log(result);
				if (
					result[0].result !== null &&
					result[0].result[0].crawl_progress !== "in_progress"
				) {
					setResources(result[0].result);
					setLoading(false);
					clearInterval(interval);
				}
			}, 5000);
		}
	}, [taskId]);

	useEffect(() => {
		if (taskId.length !== 0) {
			const interval = setInterval(async () => {
				let result = await generateNonIndexables(taskId);

				if (result[0].status_code === 40401) {
					alert("Error occured");
					clearInterval(interval);
					setLoading(false);
				}

				console.log(result);
				if (
					result[0].result !== null &&
					result[0].result[0].crawl_progress !== "in_progress"
				) {
					setNonIndexable(result[0].result);
					setLoading(false);
					clearInterval(interval);
				}
			}, 5000);
		}
	}, [taskId]);

	const submitHandler = async () => {
		// change to loading
		setLoading(true);

		const url = urlRef.current.value;
		const filteredURL = filterURL(url);

		// send to api and find the response
		const res = await sendRequestToAPI(filteredURL);
		let { ID, result } = res;
		setTaskId(ID);
	};

	return (
		<>
			<BigTitle getStarted={getStarted} onClickButton={changeState} />

			{getStarted === false && (
				<>
					<Center>
						<div className="p-inputgroup spaced">
							<span className="p-inputgroup-addon">URL</span>
							<InputText placeholder="Website" ref={urlRef} />
						</div>
						<br />
						<Button
							label="Generate Report"
							onClick={submitHandler}
						/>
					</Center>

					{loading === true && (
						<LoadingOverlay
							loaderProps={{
								size: "sm",
								color: "pink",
								variant: "bars",
							}}
							overlayOpacity={0.3}
							overlayColor="#c5c5c5"
							visible
						/>
					)}

					{Object.keys(keywords).length !== 0 && (
						<>
							<Center mt={30}>
								<Text size="lg">
									Keywords of the website Generated
								</Text>
							</Center>
							<Center mt={30}>
								<div className="json-container">
									<ReactJson
										src={keywords}
										theme="solarized"
										iconStyle="triangle"
										displayDataTypes={false}
										enableClipboard={false}
										collapsed={false}
									/>
								</div>
							</Center>
						</>
					)}

					{Object.keys(resources).length !== 0 && (
						<>
							<Center mt={30}>
								<Text size="lg">
									Resources of the website Generated
								</Text>
							</Center>
							<Center mt={30}>
								<div className="json-container">
									<ReactJson
										src={resources}
										theme="solarized"
										iconStyle="triangle"
										displayDataTypes={false}
										enableClipboard={false}
										collapsed={false}
									/>
								</div>
							</Center>
						</>
					)}

					{Object.keys(nonIndexable).length !== 0 && (
						<>
							<Center mt={30}>
								<Text size="lg">
									Non Indexable links of the website Generated
								</Text>
							</Center>
							<Center mt={30}>
								<div className="json-container">
									<ReactJson
										src={nonIndexable}
										theme="solarized"
										iconStyle="triangle"
										displayDataTypes={false}
										enableClipboard={false}
										collapsed={false}
									/>
								</div>
							</Center>
						</>
					)}
				</>
			)}
		</>
	);
}

export default App;
