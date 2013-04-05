sap.ui.jsview("myapplication2.efterinloggning", {

      getControllerName : function() {
         return "myapplication2.efterinloggning";
      },

      createContent : function(oController) {
    	  var layout = new sap.ui.commons.layout.MatrixLayout('layout');    
    	  //layout.setWidth('80%'); 

    	    // create the elements 
    	    var oLabelForm = new sap.ui.commons.Label();
    	    var oLabelActivityList = new sap.ui.commons.Label();
    	    var oLabelActivity1 = new sap.ui.commons.Label();
    	    var oLabelActivity2 = new sap.ui.commons.Label();
    	    var oLabelTimeReport = new sap.ui.commons.Label();
    	    var oLabelPickDate = new sap.ui.commons.TextView();
    	    
    	    /*var oTextForm = new sap.ui.commons.TextView({
    	    	text : 'Claretime',
    	    	wrapping : false,
    	    	design: sap.ui.commons.TextViewDesign.H1
    	    	});
    	     */
    	    var oButtonTimeReportOverview = new sap.ui.commons.Button({text:"Ny rad", width:"133px", height:"4em"});

    	 	// create a simple DatePicker
    	    //var oDatePicker = new sap.ui.commons.DatePicker('date1');
    	    //oDatePicker.setYyyymmdd("20130301");
    	    //oDatePicker.setLocale("sv"); // Try with "de" or "fr" instead!
    	    //oDatePicker.setWidth("200px");
    	    //oLabelForm.setText("ClareTime");
    	    //oLabelActivityList.setText("Aktivitetslista");
    	    //oLabelActivity1.setText("30 dagar sen: Tidsrapportera Maj");
    	    //oLabelActivity2.setText("45 dagar sen: Tidsrapportera Juni");
    	  	//oLabelTimeReport.setText("Tidsrapportera");
    	    //oLabelPickDate.setDesign(sap.ui.commons.TextViewDesign.H2);
    	    //oLabelPickDate.setText("V" + unescape("%E4") + "lj datum:");

    	    oButtonTimeReportOverview.attachPress(function(){alert("Ny rad ska skapas ovan!");});

    	    //layout.createRow(oAppHeader);
    	    //layout.createRow(oLabelForm);
    	    //layout.createRow(oLabelActivityList);
    	    //layout.createRow(oLabelActivity1);
    	    //layout.createRow(oLabelActivity2);
    	    //layout.createRow(oTextForm);
    	    //layout.createRow(oLabelTimeReport);
    	    //layout.createRow(oLabelPickDate);
    	    //layout.createRow(oDatePicker);
    	    layout.createRow(oButtonTimeReportOverview);
    	    //this.addContent(layout);
    	    

 
    	    
    	    
// create the row repeater control-------------------------------------------------------------------------------
    		var oRowRepeater = new sap.ui.commons.RowRepeater("rr1");
    		oRowRepeater.setNoData(new sap.ui.commons.TextView({text: "Sory, no data available!"}));

    		// create test data
    	 	var dataObject = { data : [
    				{lastName: "Alltid hela timmar?", name: "16:00",  date: "0", src: "pictures/axfoodlogo.jpg", gender: "male" , country: "Axfood"},
    				{lastName: "8", name: "16:00",  date: "-1", src: "pictures/axfoodlogo.jpg", gender: "female" , country: "Axfood"},
    				{lastName: "9", name: "12:00",  date: "-2", src: "pictures/ericssonlogo.jpg", gender: "male", country:  "Ericsson"},],
    					empty : []
    				};
    		// Increase the number of the lines to more then 100
    	  //for(var n = 1; n <= 1; n++) {
    		//  dataObject.data.push( { lastName:"LastName"+ n, name:"Name" + n, src:"images/persons/male.jpg", country: "DE", date: "http://www.sap.com" } );
    	  //}

    	  // create JSON model
    		jQuery.sap.require("sap.ui.model.json.JSONModel");
    		var oModel = new sap.ui.model.json.JSONModel();
    		oModel.setData(dataObject);
    		sap.ui.getCore().setModel(oModel);


    		//create title
    		var oTitle = new sap.ui.commons.Title({text:"Claretime"});

    		// create filters
    		var oFilter1 = new sap.ui.commons.RowRepeaterFilter("first_filter",{text:"Alla arbetsgivare"});
    		var oFilter2 = new sap.ui.commons.RowRepeaterFilter("second_filter",{text:"Ericsson",filters:[new sap.ui.model.Filter("country","EQ", "Ericsson")]});
    		var oFilter3 = new sap.ui.commons.RowRepeaterFilter("third_filter",{text:"Axfood",filters:[new sap.ui.model.Filter("country", "EQ","Axfood")]});
    		var oFilter4 = new sap.ui.commons.RowRepeaterFilter("forth_filter",{text:"Collectum",filters:[new sap.ui.model.Filter("country", "EQ","Collectum")]});

    		// create sorters
    		var oSorter1 = new sap.ui.commons.RowRepeaterSorter("third_sorter",{text:"Arbetsgivare",sorter:new sap.ui.model.Sorter("country",true),tooltip:"Sortera efter arbetsgivare"});
    		var oSorter2 = new sap.ui.commons.RowRepeaterSorter("first_sorter",{text:"2013",sorter:new sap.ui.model.Sorter("gender",false),tooltip:"Sort By Gender"});
    		var oSorter3 = new sap.ui.commons.RowRepeaterSorter("second_sorter",{text:"2012",sorter:new sap.ui.model.Sorter("lastName",false)});

    		//add title
    		oRowRepeater.setTitle(oTitle);

    		//add filters and sorters
    		oRowRepeater.addFilter(oFilter1);
    		oRowRepeater.addFilter(oFilter2);
    		oRowRepeater.addFilter(oFilter3);
    		oRowRepeater.addFilter(oFilter4);

    		oRowRepeater.addSorter(oSorter1);
    		oRowRepeater.addSorter(oSorter2);
    		oRowRepeater.addSorter(oSorter3);

    		//configure the RowRepeater
    		oRowRepeater.setDesign("Standard");
    		oRowRepeater.setNumberOfRows(10);
    		oRowRepeater.setCurrentPage(1);
    		oRowRepeater.setTitle(oTitle);



    		//create the template control that will be repeated and will display the data
    		var oRowTemplate = new sap.ui.commons.layout.MatrixLayout("theMatrix");

    		var  matrixRow, matrixCell, control;
    		// main matrix
    		oRowTemplate.setWidth("90%");
    		// main row
    		matrixRow = new sap.ui.commons.layout.MatrixLayoutRow();
    		//image
    		control = new sap.ui.commons.Image();
    		control.setHeight("40px");
    		control.setWidth("150px");
    		control.bindProperty("src","src");
    		matrixCell = new sap.ui.commons.layout.MatrixLayoutCell();
    		matrixCell.addContent(control);
    		matrixRow.addCell(matrixCell);

 
/*
    		//label 3
    		control = new sap.ui.commons.Label();
    		control.bindProperty("text","country");
    		matrixCell = new sap.ui.commons.layout.MatrixLayoutCell();
    		matrixCell.addContent(control);
    		matrixRow.addCell(matrixCell);
*/
    		
    		//link
    		control = new sap.ui.commons.DatePicker();
			// create a simple DatePicker
			control.setLocale("sv"); // Try with "de" or "fr" instead!
    		control.bindProperty("value","date");
    		matrixCell = new sap.ui.commons.layout.MatrixLayoutCell();
    		matrixCell.addContent(control);
    		matrixRow.addCell(matrixCell);
    		
       		//starttid
    		control = new sap.ui.commons.TextField();
    		control.bindProperty("value","lastName");
    		matrixCell = new sap.ui.commons.layout.MatrixLayoutCell();
    		matrixCell.addContent(control);
    		matrixRow.addCell(matrixCell);
    		
    		
    		//sluttid
    		/*
    		control = new sap.ui.commons.TextField();
    		control.bindProperty("value","name");
    		matrixCell = new sap.ui.commons.layout.MatrixLayoutCell();
    		matrixCell.addContent(control);
    		matrixRow.addCell(matrixCell);
			*/
    		
    		// add row to matrix
    		oRowTemplate.addRow(matrixRow);



    		//attach data to the RowRepeater
    		oRowRepeater.bindRows("/data", oRowTemplate);

    		
    	    
    		
    		
    		
   	    //	content: [oAppHeader, oLabelForm, oLabelActivityList,
    	    
    	    var oLayout = new sap.ui.commons.layout.VerticalLayout("Layout1", {
    	    	content: [oRowRepeater, oButtonTimeReportOverview
    	    	          ]
    	    });

    	    this.addContent(oLayout);
    
      }

});
