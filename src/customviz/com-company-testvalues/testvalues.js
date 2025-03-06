define(['jquery',
        'obitech-framework/jsx',
        'obitech-report/datavisualization',
        'obitech-reportservices/datamodelshapes',
        'obitech-reportservices/events',
        'obitech-appservices/logger',
        'ojL10n!com-company-testvalues/nls/messages',
        'obitech-framework/messageformat',
        'skin!css!com-company-testvalues/testvaluesstyles'],
        function($,
                 jsx,
                 dataviz,
                 datamodelshapes,
                 events,
                 logger,
                 messages) {
   "use strict";

   var MODULE_NAME = 'com-company-testvalues/testvalues';

   //Param validation to detect cyclical dependencies (ignore modules not used in resource arguments)
   jsx.assertAllNotNullExceptLastN(arguments, "testvalues.js arguments", 2);

   var _logger = new logger.Logger(MODULE_NAME);

   // The version of our Plugin
   Testvalues.VERSION = "1.0.0";

   /**
    * The implementation of the testvalues visualization.
    * 
    * @constructor
    * @param {string} sID
    * @param {string} sDisplayName
    * @param {string} sOrigin
    * @param {string} sVersion
    * @extends {module:obitech-report/visualization.Visualization}
    * @memberof module:com-company-testvalues/testvalues#
    */
   function Testvalues(sID, sDisplayName, sOrigin, sVersion) {
      // Argument validation done by base class
      Testvalues.baseConstructor.call(this, sID, sDisplayName, sOrigin, sVersion);
   };
   jsx.extend(Testvalues, dataviz.DataVisualization);
   /**
    * Called whenever new data is ready and this visualization needs to update.
    * @param {module:obitech-renderingcontext/renderingcontext.RenderingContext} oTransientRenderingContext
    */
   Testvalues.prototype.render = function(oTransientRenderingContext) {
      try {
         // Note: all events will be received after initialize and start complete.  We may get other events
         // such as 'resize' before the render, i.e. this might not be the first event.

         // Retrieve the data object for this visualization
         var oDataLayout = oTransientRenderingContext.get(dataviz.DataContextProperty.DATA_LAYOUT);
         // Determine the number of records available for rendering on ROW
         // Because we specified that Category should be placed on ROW in the data model handler,
         // this returns the number of rows for the data in Category.
         var nRows = oDataLayout.getEdgeExtent(datamodelshapes.Physical.ROW);
         for(var i = 0 ; i < nRows ; i++) {
            
            const table = document.createElement("table");
            table.setAttribute("id", "table_id");
            document.body.appendChild(table);

            const row = document.createElement("tr");
            document.getElementById("table_id").appendChild(row);

            const th = document.createElement("th");
            document.getElementById("table_id").appendChild(th);

            //get values from fields taken
            var value = oDataLayout.getValue(datamodelshapes.Physical.DATA, i , 0, false);
            //get metadata values from fields taken
            var rowLayer1 = oDataLayout.getLayerMetadata(datamodelshapes.Physical.ROW, i , 1);
            var elContainer = this.getContainerElem();

            const row2 = document.createElement("tr");
            document.getElementById("table_id").appendChild(row2);
            //capsule cell
            const td = document.createElement("td");

            //create a div 
            const content = document.createElement("div");
            content.setAttribute("id","circle_cell")
            td.appendChild(content);
            document.getElementById("table_id").appendChild(td);

            const text = document.createTextNode(value);
            document.getElementById("circle_cell").appendChild(text);


            const days_past_due = document.createTextNode(rowLayer1)
            th.appendChild(days_past_due)

            // $(elContainer).html(messages.TEXT_MESSAGE.format("Testvalues Plugin", "" + nRows));
            //$(elContainer).html(messages.TEXT_MESSAGE.format("Metadata", "" + rowLayer1));
             $(elContainer).html(table);
    
         }
         // Retrieve the root container for our visualization.  This is provided by the framework.  It may not be deleted
         // but may be used to render.

      }
      finally {
         this._setIsRendered(true);
      }
    };

   /**
    * Factory method declared in the plugin configuration
    * @param {string} sID Component ID for the visualization
    * @param {string=} sDisplayName Component display name
    * @param {string=} sOrigin Component host identifier
    * @param {string=} sVersion 
    * @returns {module:com-company-testvalues/testvalues.Testvalues}
    * @memberof module:com-company-testvalues/testvalues
    */
   function createClientComponent(sID, sDisplayName, sOrigin) {
     // Argument validation done by base class
      return new Testvalues(sID, sDisplayName, sOrigin, Testvalues.VERSION);
   };

   return {
      createClientComponent : createClientComponent
   };
});