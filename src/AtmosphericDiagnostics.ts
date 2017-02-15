import {IAttachableComponent} from "vanilla-typescript"
import './AtmosphericDiagnostics.pcss'
import {Configuration} from "./Configuration";
import {weatherRequest} from "./api/Weather";

import {addGraph, models, utils} from "nvd3"
import {select} from "d3"

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
        this.renderData(result)
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
    addGraph(function () {
      var chart = models.discreteBarChart()
        .x(function (d) {
          return d.dt
        })    //Specify the data accessors.
        .y(function (d) {
          return d.rain["3h"]
        })
        .staggerLabels(true)    //Too many bars and not enough room? Try staggering labels.
        .tooltips(false)        //Don't show tooltips
        .showValues(true)       //...instead, show the bar value right on top of each bar.
        .options({
          duration: 300,
          useInteractiveGuideline: true
        })


      select('.weather-map svg')
        .datum(data.list)
        .call(chart);

      utils.windowResize(chart.update);

      return chart;
    });
  }
}

