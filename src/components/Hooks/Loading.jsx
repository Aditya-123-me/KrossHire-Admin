import React from "react";
import { Circles } from "react-loader-spinner";

const Loading = ({ height = "2.5rem", width = "2.5rem", color = "#ff621f" }) => {
	return (
		<div style={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
			<Circles height={height} width={width} color={color} ariaLabel="circles-loading" visible={true} />
		</div>
	);
};

export default Loading;
