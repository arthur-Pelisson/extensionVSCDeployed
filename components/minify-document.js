const vscode = require('vscode');

const minify = async () => {

	const uri = await (async () => {
	
		const allFiles = await vscode.workspace.findFiles('*/*', "min");
		const files = allFiles.filter(file => {
				return file.scheme === 'file' && file.path.search('min') == -1 && (file.path.endsWith('.js') || file.path.endsWith('.css'));
		});
	
		if (files.length === 0) {
				vscode.window.showInformationMessage('No files available to minify');
				return null;
		}
	
		return files;
	
	})();
	
	if (uri) {
		let nb = 0;
		for (const file of uri) {
			console.log(file)
			nb++;
			await vscode.commands.executeCommand("es6-css-minify.minifyExplorer", file);
			if (nb == uri.length) {
				return true;
			}
		};
	}
}

module.exports = minify;