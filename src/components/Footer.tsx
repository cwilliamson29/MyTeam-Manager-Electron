import pkg from "../../package.json";

function Footer() {
	return (
		<div className="fixed bottom-0 w-[100%] text-gray-600 bg-black flex justify-between">
			<div className="pl-2">
				<a href="https://github.com/cwilliamson29/MyTeam-Manager-Electron" target="_blank">
					My Team Manager
				</a>
			</div>
			<div className="text-right pr-2 flex">
				<div>Version: {pkg.version}</div>
			</div>
		</div>
	);
}

export default Footer;
