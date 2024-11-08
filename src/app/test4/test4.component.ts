import { Component } from '@angular/core';

@Component({
  selector: 'app-test4',
  standalone: true,
  imports: [],
  templateUrl: './test4.component.html',
  styleUrls: ['./test4.component.scss']
})
export class Test4Component {
  dialog!: Dialog;

  initialize() {
    const config = this.readApplicationConfigFile();
    
    if (config.OS === "Windows") {
      this.dialog = new WindowsDialog();
    } else if (config.OS === "Web") {
      this.dialog = new WebDialog();
    } else {
      throw new Error("Error! Unknown operating system.");
    }
  }

  main() {
    this.initialize();
    this.dialog.render();
  }

  readApplicationConfigFile() {
    return { OS: "Windows" };
  }
}

export interface Button {
  render(a?: any, b?: any): void;
  onClick(f: () => void): void;
}

class WindowsButton implements Button {
  render(a?: any, b?: any) {
    console.log("Rendering Windows button with", a, b);
  }

  onClick(f: () => void) {
    console.log("Windows button clicked");
    f();
  }
}

class HTMLButton implements Button {
  render(a?: any, b?: any) {
    console.log("Rendering HTML button with", a, b);
  }

  onClick(f: () => void) {
    console.log("HTML button clicked");
    f();
  }
}

abstract class Dialog {
  abstract createButton(): Button;

  render() {
    const okButton = this.createButton();
    okButton.onClick(() => this.closeDialog());
    okButton.render();
  }

  closeDialog() {
    console.log("Dialog closed");
  }
}

class WindowsDialog extends Dialog {
  createButton(): Button {
    return new WindowsButton();
  }
}

class WebDialog extends Dialog {
  createButton(): Button {
    return new HTMLButton();
  }
}
