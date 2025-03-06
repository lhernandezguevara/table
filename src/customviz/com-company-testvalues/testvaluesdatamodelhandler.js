define(['obitech-framework/jsx',
        'obitech-reportservices/datamodelshapes',
        'obitech-viz/genericDataModelHandler',
        'obitech-report/vizdatamodelsmanager'],
        function(jsx, 
                 datamodelshapes,
                 genericDataModelHandler,
                 vdm) {
   "use strict";
   var testvaluesDataModelHandler = {};

   /**
    * @class The data model handler.
    * @constructor
    * @param {object=} oConfig
    * @param {string=} sId
    * @param {string=} sDisplayName
    * @param {string=} sOrigin
    * @param {string=} sVersion
    * @memberof module:com-company-testvalues/TestvaluesDataModelHandler#
    * @extends module:obitech-viz/vizDataModelHandlerBase#VisualizationHandlerBase
    */
   function TestvaluesDataModelHandler(oConfig, sId, sDisplayName, sOrigin, sVersion)
   {
      TestvaluesDataModelHandler.baseConstructor.call(this, oConfig, sId, sDisplayName, sOrigin, sVersion);
   }
   jsx.extend(TestvaluesDataModelHandler, genericDataModelHandler.GenericDataModelHandler);
   testvaluesDataModelHandler.TestvaluesDataModelHandler = TestvaluesDataModelHandler;

   /**
    * @returns module:obitech-report/vizdatamodelsmanager#Mapper
    */
   TestvaluesDataModelHandler.prototype.getLogicalMapper = function () {
      var oData = new datamodelshapes.PhysicalPlacement(datamodelshapes.Physical.DATA);
      var oRow = new datamodelshapes.PhysicalPlacement(datamodelshapes.Physical.ROW);
      var oCol = new datamodelshapes.PhysicalPlacement(datamodelshapes.Physical.COLUMN);

      var oMapper = new vdm.Mapper();

      oMapper.addCategoricalMapping(datamodelshapes.Logical.SIZE,   null); // don't place
      oMapper.addCategoricalMapping(datamodelshapes.Logical.COLOR,  oRow); // color -> row
      oMapper.addCategoricalMapping(datamodelshapes.Logical.ROW, oRow); // row -> row

      oMapper.addMeasureMapping(datamodelshapes.Logical.SIZE,   null); // Don't place
      oMapper.addMeasureMapping(datamodelshapes.Logical.COLOR,  null); // Don't place
      oMapper.addMeasureMapping(datamodelshapes.Logical.MEASURES, oData);

      // where to place physical measure label in case no measure layer is present in logical
      oMapper.setDefaultPhysicalMeasureLabel(datamodelshapes.Physical.COLUMN, this.getMeasureLabelConfig().visibility);

      return oMapper;
   };

   /**
    * Returns the handler
    *@param {String} extensionPointName
    *@param {Object} config
    */
   testvaluesDataModelHandler.getHandler = function(extensionPointName, config) {
      return new TestvaluesDataModelHandler(config, extensionPointName);
   };

   return testvaluesDataModelHandler;
});
