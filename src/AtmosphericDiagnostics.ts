import {IAttachableComponent} from "vanilla-typescript"
import './AtmosphericDiagnostics.pcss'
import {Configuration} from "./Configuration";
import {weatherRequest} from "./api/Weather";

import {addGraph, models, utils} from "nvd3"
import {select, time} from "d3"

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
      weatherRequest((<HTMLInputElement> document.querySelector('input[name="location"]')).value).then((result) => {
        this.renderHumidity(
          [{
            key: "Humidity",
            values: result["list"]
          }]
        )
        this.renderPressure(
          [{
            key: "Pressure",
            values: result["list"]
          }]
        )
        console.log(result)

      }).catch((err) => {

      })
    });
  }

  attach() {
    this.hostElement.innerHTML = `

     <div class="weather-controls">
        <button class="get-data">Get weather report</button>
        <input type="text" required placeholder="City name" value="london" name="location">
      </div>
     <div class="weather-humidity">
           <svg></svg>
     </div>
     <div class="weather-pressure">
           <svg></svg>
     </div>


`
    this.addListeners()
  }

  detach() {
  }

  renderHumidity(data) {
    addGraph(function () {
      var chart = models.lineChart()
        .x(function (d) {
          return d.dt * 1000
        })    //Specify the data accessors.
        .y(function (d) {
          return d.main["humidity"]
        })
        .options({
          duration: 300,
          useInteractiveGuideline: true
        })

      select('.weather-humidity svg')
        .datum(data)
        .call(chart);


      chart.xAxis.rotateLabels(30)
        .showMaxMin(true)
        .tickFormat(function (d) {
          var f = time.format('%d-%m-%y')(new Date(d));
          return f.toUpperCase();
        }).ticks(7)
      chart.update()
      utils.windowResize(chart.update);
      return chart;
    });

  }

  renderPressure(data) {
    addGraph(function () {
      var chart = models.lineChart()
        .x(function (d) {
          return d.dt * 1000
        })    //Specify the data accessors.
        .y(function (d) {
          return d.main["pressure"]
        })
        .options({
          duration: 300,
          useInteractiveGuideline: true
        })

      select('.weather-pressure svg')
        .datum(data)
        .call(chart);

      chart.xAxis.rotateLabels(30)
        .showMaxMin(true)
        .tickFormat(function (d) {
          var f = time.format('%d-%m-%y')(new Date(d));
          return f.toUpperCase();
        }).ticks(7)
      chart.update()
      utils.windowResize(chart.update);
      return chart;
    })
  }
}

