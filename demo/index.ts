import AtmosphericDiagnostics from 'atmospheric-diagnostics'
import 'atmospheric-diagnostics/build/atmospheric-diagnostics.css'

function init() {
  var selector = ".container"
  var component = new AtmosphericDiagnostics(selector)
  component.attach()
}

init()
