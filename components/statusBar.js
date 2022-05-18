const vscode = require('vscode');

class StatusBar {

  button;
  
  constructor() { 
    this.button = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
    this.button.text = '$(cloud-upload) Deploye';
    this.button.command = `deploye.deploye`;
    this.button.tooltip = 'Minify and deploye to ftp-sync';
  }

  setMessage(msg) {
    this.button.text = msg;
    // this.showButton
  }

  showButton() {
    this.button.show();
  }

  hideButton() {
    this.button.hide();
  }

  showStats(eff, timeout = 5000) {
    vscode.window.setStatusBarMessage(`$(graph) Output is ${Math.abs(eff)}% ${eff < 0 ? 'bigger' : 'smaller' }.`, timeout);
  }

  showMessage(str, timeout = 5000) {
    vscode.window.setStatusBarMessage(str, timeout);
  }

}

module.exports = StatusBar;