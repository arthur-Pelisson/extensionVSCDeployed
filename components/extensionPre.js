const { extname } = require('path');
const vscode = require('vscode');

//interface d'extension obligatoire
const extRequise = {
  minify: {
    ext: "olback.es6-css-minify",
    extName: "JS & CSS Minifier (Minify)",
  },
  ftp: {
    ext: "lukasz-wronski.ftp-sync",
    extName: "ftp-sync",
  }
};

class ExtensionPre {

  error;

  constructor(ext, extName, require) {
    this.ext = ext;
    this.extName = extName;
    this.msg = `Vous avez besoin de l'extension '${this.extName}' pour que Deploye marche correctement.`;
    this.require = require;
  }

  findExt() {
    const extension = vscode.extensions.getExtension(this.ext);
		if (extension != undefined) {
			if (extension.isActive == false) {
				this.activateext(extension);
			}
		} else {
			this.showErrorMsg();
		}
  }

  activateext(extension) {
    extension.activate().then( () => {
      if (extension.isActive == true) {
        console.log( `Extension ${this.extName} activated`);
      } else {
        this.showErrorMsg(`L'activation de l'extension "${this.extName}" n'a pas marcher veuiller resayer pour que l'extension marche correctement`)
      }
    });   
  }

  showMsg() {

  }

  showErrorMsg(msg = this.msg) {
    vscode.window.showErrorMessage(msg);
    if (this.require) {
     this.error = true;
    }
  }

}

module.exports = {ExtensionPre, extRequise};
