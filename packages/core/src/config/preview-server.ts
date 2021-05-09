let previewServerPort: number | undefined;

export const setPreviewServerPort = (port: number | undefined) => {
	if (!['number', 'undefined'].includes(typeof port)) {
		throw new Error(
			`Preview server port should be a number. Got ${typeof port} (${JSON.stringify(
				port
			)})`
		);
	}

	if (port === undefined) {
		previewServerPort = undefined;
		return;
	}

	if (port < 1 || port > 65535) {
		throw new Error(
			`Preview server port should be a number between 1 and 65535. Got ${port}`
		);
	}

	previewServerPort = port;
};

export const getPreviewServerPort = () => previewServerPort;
