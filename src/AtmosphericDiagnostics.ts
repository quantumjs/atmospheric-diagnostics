import {IAttachableComponent} from "vanilla-typescript"
import './AtmosphericDiagnostics.pcss'
import {Configuration} from "./Configuration";

/**
 * A AtmosphericDiagnostics component
 *
 * Features
 *
 */
export default class AtmosphericDiagnostics implements IAttachableComponent {
  destroyBoundWithThis = this.detach.bind(this)
  private hostElement: HTMLElement

  constructor(public selector: string,
              public configuration: Configuration = new Configuration()) {
    this.hostElement = <HTMLElement> document.querySelector(selector)

  }


  addListeners() {
    window.addEventListener('hashchange', (event: HashChangeEvent) => {
    });
  }

  attach() {
    this.addListeners()
  }

  detach() {
  }
}

