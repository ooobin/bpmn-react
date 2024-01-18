'use strict';

var inherits = require('inherits');

var PropertiesActivator = require('../../PropertiesActivator');

var is = require('bpmn-js/lib/util/ModelUtil').is;

// bpmn properties
var processProps = require('../bpmn/parts/ProcessProps'),
    idProps = require('../bpmn/parts/IdProps'),
    nameProps = require('../bpmn/parts/NameProps');

// camunda properties
var versionTag = require('./parts/VersionTagProps');

// properties
var properties = require('./parts/PropertiesProps');

// helpers ////////////////////////////////////////
var PROCESS_KEY_HINT = 'This maps to the process definition key.';
var TASK_KEY_HINT = 'This maps to the task definition key.';

function getIdOptions(element) {

  if (is(element, 'bpmn:Participant')) {
    return { id: 'participant-id', label: 'Participant Id' };
  }

  if (is(element, 'bpmn:Process')) {
    return { description: PROCESS_KEY_HINT };
  }

  if (is(element, 'bpmn:UserTask')) {
    return { description: TASK_KEY_HINT };
  }
}

function getNameOptions(element) {
  if (is(element, 'bpmn:Participant')) {
    return { id: 'participant-name', label: 'Participant Name' };
  }
}

function getProcessOptions(element) {
  if (is(element, 'bpmn:Participant')) {
    return { processIdDescription: PROCESS_KEY_HINT };
  }
}

function createGeneralTabGroups(element, canvas, bpmnFactory,
    elementRegistry, elementTemplates, translate) {

  // refer to target element for external labels
  element = element.labelTarget || element;

  var generalGroup = {
    id: 'general',
    label: translate('General'),
    entries: []
  };

  idProps(generalGroup, element, translate, getIdOptions(element));
  nameProps(generalGroup, element, bpmnFactory, canvas, translate, getNameOptions(element));
  processProps(generalGroup, element, translate, getProcessOptions(element));
  versionTag(generalGroup, element, translate);

  var groups = [];
  groups.push(generalGroup);
  return groups;
}

function createExtensionElementsGroups(element, bpmnFactory, elementRegistry, translate) {

  var propertiesGroup = {
    id : 'extensionElements-properties',
    label: translate('Properties'),
    entries: []
  };
  properties(propertiesGroup, element, bpmnFactory, translate);

  return [
    propertiesGroup
  ];
}

/**
 * A properties provider for Camunda related properties.
 */
function CamundaPropertiesProvider(
    bpmnFactory,
    canvas,
    commandStack,
    elementRegistry,
    elementTemplates,
    eventBus,
    modeling,
    replace,
    selection,
    translate
) {
  PropertiesActivator.call(this, eventBus);

  this.getTabs = function(element) {

    var generalTab = {
      id: 'general',
      label: translate('General'),
      groups: createGeneralTabGroups(
        element, canvas, bpmnFactory,
        elementRegistry, elementTemplates, translate)
    };

    var extensionsTab = {
      id: 'extensionElements',
      label: translate('Extensions'),
      groups: createExtensionElementsGroups(element, bpmnFactory, elementRegistry, translate)
    };

    return [
      generalTab,
      extensionsTab
    ];
  };

}

CamundaPropertiesProvider.$inject = [
  'bpmnFactory',
  'canvas',
  'commandStack',
  'elementRegistry',
  'elementTemplates',
  'eventBus',
  'modeling',
  'replace',
  'selection',
  'translate'
];

inherits(CamundaPropertiesProvider, PropertiesActivator);

module.exports = CamundaPropertiesProvider;
