import {IAttachableComponent} from "vanilla-typescript"
import './AtmosphericDiagnostics.pcss'
import {Configuration} from "./Configuration";
import {weatherRequest} from "./api/Weather";

import  "vega-embed"
import  "vega-lite"
import  "vega"

declare var vg

/*import {addGraph, models, utils} from "nvd3"
 import {select} from "d3"*/

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

    document.querySelector('.get-data').addEventListener('click', (event: MouseEvent) => {
      weatherRequest({}).then((result) => {
        this.renderData(result["list"])
        console.log(result)

      }).catch((err) => {

      })
    });
  }

  attach() {
    this.hostElement.innerHTML = `

     <div class="weather-controls">
        <button class="get-data">Get weather report</button>
        <input type="text" required placeholder="City name" value="london">
      </div>
     <div class="weather-map">
           <svg></svg>
     </div>


`
    this.addListeners()
  }

  detach() {
  }

  renderData(data) {

    // Assign the specification to a local variable vlSpec.
    var vlSpec = {
      "data": {
        "values": data
      },
      "mark": "bar",
      "encoding": {
        "y": {"field": "rain.3h", "type": "quantitative"},
        "x": {
           "field": "dt_txt", "type": "nominal",
          "axis": {
            "title": "Average of b"
          }
        }
      }
    };

    var embedSpec = {
      mode: "vega-lite",  // Instruct Vega-Embed to use the Vega-Lite compiler
      spec: vlSpec
      // You can add more vega-embed configuration properties here.
      // See https://github.com/vega/vega/wiki/Embed-Vega-Web-Components#configuration-propeties for more information.
    };

    // Embed the visualization in the container with id `vis`
    vg.embed("svg", embedSpec, function(error, result) {
      // Callback receiving the View instance and parsed Vega spec
      // result.view is the View, which resides under the '#vis' element
    });

  }
}

