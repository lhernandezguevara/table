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
         //var rowValue1 = oDataLayout.getValue(datamodelshapes.Physical.ROW, 1 , 0, false);
            const table = document.createElement("table");
            table.setAttribute("id", "table_id");
            document.body.appendChild(table);
            const row = document.createElement("tr");
            row.style.paddingBottom = "1rem"
            document.getElementById("table_id").appendChild(row);
            const th = document.createElement("th");
            document.getElementById("table_id").appendChild(th);
            var rowLayer1 = oDataLayout.getLayerMetadata(datamodelshapes.Physical.ROW, 0 , 1);
            //var rowLayerTest = oDataLayout.getLayerMetadata(datamodelshapes.Physical.ROW, 0 , 1);
            var title = document.createTextNode(rowLayer1)
            th.appendChild(title)
            const th2 = document.createElement("th");
            var rowLayer2 = oDataLayout.getLayerMetadata(datamodelshapes.Physical.ROW, 1 , 1);
            //var cText = th2.createTextNode(rowLayer2)
            const text2 = document.createTextNode(rowLayer2)
            th2.appendChild(text2);
            document.getElementById("table_id").appendChild(th2);
            
            const th3 = document.createElement("th");
            var meassureLayer1 = "CITY POPULATION";
            //var cText = th2.createTextNode(rowLayer2)
            const text3 = document.createTextNode(meassureLayer1)
            th3.appendChild(text3);
            document.getElementById("table_id").appendChild(th3);

            const th4 = document.createElement("th");
            var meassureLayer2 = "HARDCODED";
            //var cText = th2.createTextNode(rowLayer2)
            const text4 = document.createTextNode(meassureLayer2)
            th4.appendChild(text4);
            document.getElementById("table_id").appendChild(th4);

            var rowValue1;
            var rowValue2;
            var rowValue3;
            var rowValue4;

            var meassureValue1;
            var meassureValue2;
            var meassureValue3;

            var elContainer = this.getContainerElem();

         for(var i = 0 ; i < nRows ; i++) { 
            //attr .ROW
            rowValue1 = oDataLayout.getValue(datamodelshapes.Physical.ROW, 0 , i, false);
            rowValue2 = oDataLayout.getValue(datamodelshapes.Physical.ROW, 1 , i, false);
            rowValue3 = oDataLayout.getValue(datamodelshapes.Physical.ROW, 2 , i, false);
            //rowValue4 = oDataLayout.getValue(datamodelshapes.Physical.ROW, 3 , i, false);
            //measure .DATA
            meassureValue1 = oDataLayout.getValue(datamodelshapes.Physical.DATA, i , 0, false);
            //meassureValue2 = oDataLayout.getValue(datamodelshapes.Physical.DATA, i , 1, false);
            //meassureValue3 = oDataLayout.getValue(datamodelshapes.Physical.DATA, i , 2, false);
            //$(elContainer).append("RowN: "+ i +" " + rowValue+ "<br>"); 
            //$(elContainer).append("valueN: "+ i +" " + value+ "<br>"); 
            const row2 = document.createElement("tr");
            row2.setAttribute("id" , "rows")
            document.getElementById("table_id").appendChild(row2);
            const td1 = document.createElement("td");
            var div = document.createElement("div");
            if(i == 0){
               div.setAttribute("id", "circle");
            }
            if(i == 1){
               div.setAttribute("id", "red_circle");
            }
            
            if(i == 2){
               div.setAttribute("id", "yellow_circle");
            }
            
            if(i == 3){
               div.setAttribute("id", "green_circle");
            }
            
            document.getElementById("table_id").appendChild(td1);
            const text1 = document.createTextNode(rowValue1);
            td1.appendChild(div);
            div.appendChild(text1)

            const td2 = document.createElement("td");
            document.getElementById("table_id").appendChild(td2);
            const text2 = document.createTextNode(rowValue2);
            td2.appendChild(text2)
            const td3 = document.createElement("td");
            document.getElementById("table_id").appendChild(td3);
            const text3 = document.createTextNode(meassureValue1);
            td3.appendChild(text3)
            const td4 = document.createElement("td");
            document.getElementById("table_id").appendChild(td4);
            const text4 = document.createTextNode("test");
            td4.appendChild(text4)
         }

         $(elContainer).html(table);

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