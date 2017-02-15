import AtmosphericDiagnostics from 'atmospheric-diagnostics'

function init() {
  var selector = ".container"
  var component = new AtmosphericDiagnostics(selector)
  component.attach()
}

init()
