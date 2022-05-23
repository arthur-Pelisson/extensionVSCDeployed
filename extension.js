const vscode = require('vscode');
//init StatusBar class
const StatusBar = require('./components/statusBar');
const statusBar = new StatusBar();
//init extensionPre class
const {ExtensionPre, extRequise} = require('./components/extensionPre');
//init minify
const minify = require('./components/minify-document');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
	//show button statusbar
	statusBar.showButton();

	// console.log(extRequise);
	const runExtPre = (require = false, callback) => {
		let flag;
		Object.entries(extRequise).forEach(([key, value]) => {
			let extensionPre = new ExtensionPre(value.ext, value.extName, require);
			extensionPre.findExt();
			if (extensionPre.error) {
				flag = false;
			};
		});
		if (flag === false) {
			return false;
		}
	} 
	runExtPre();
	

	const deploye = async () => {
		let response = runExtPre(true);
		if (response == false) {
			return;
		} else {
			const response = await vscode.window.showInputBox({
				prompt: "Tapez Acceptez pour continuer"
			});
			if (response == "Acceptez") {
				statusBar.setMessage("$(gear~spin) Deploiment en cours");
			let min = await minify();
			if (min) {
				statusBar.setMessage("$(cloud-upload) Deploye");
				await vscode.commands.executeCommand("extension.ftpsyncupload");
			}
		}
			}
		}
	vscode.commands.registerCommand('deploye.deploye', deploye);

	// @ts-ignore
	context.subscriptions.push(deploye);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}