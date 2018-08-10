$(document).ready(function () {
    getBackbonePageElementData();
    setBackbonePageElementData();
    setBackbonePageElementDataDelete();
    getDataElementData();
    getBackbonePageData();
});

var BaseUrl = 'http://45.35.4.250/ansiratestapi/api/';
function getDataElementData() {
    $.ajax({
        type: "GET",
        url: BaseUrl+"DataElement/GetDataElementData",
        contentType: "application/json;",
        dataType: "json",
        success: function (data) {
            // alert(data);
            var arr = [];
            arr = data.DataElementList;
            $.each(arr, function (i, item) {
                var options = "<option value=" + item.DataElementTypeId + ">" + item.DataElementName + "</option>";
                $('#dropdownDataElementList').append(options);
                $('#dropdownDataElementListedt').append(options);
            }); //End of foreach Loop   
        }, //End of AJAX Success function 
        failure: function (data) {
            //alert("Failure");
        }, //End of AJAX failure function  
        error: function (data) {
            //alert("Error");
        } //End of AJAX error function  
    });
}


function getBackbonePageElementData() {
    $.ajax({
        type: "GET",
        url: BaseUrl + "BackbonePageElement/GetBackbonePageElementData",
        contentType: "application/json;",
        dataType: "json",
        success: function (data) {
            // alert(data);
            var arr = [];
            arr = data.BackbonePageElementList;
            window.BackbonePageElement = arr;
            $.each(arr, function (i, item) {
                //var row = "<tr><td>" + item.OEM_Id + "</td><td>" + item.OEM_Name + "</td></tr>"
                //$('#OEMData tbody').append(row);
                var editbtn = '<p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary" data-title="Edit" onclick=setBackbonePageElementData(' + i + ') data-toggle="modal" data-target="#edit"><span class="glyphicon glyphicon-pencil"></button></p>';
                var deletebtn = '<button class="btn btn-danger" data-title="Delete" onclick=setBackbonePageElementDataDelete(' + item.BackbonePageElementId + ') data-toggle="modal" data-target="#delete"><span class="glyphicon glyphicon-trash"></button>';
                $('#BackbonePageElementdatatable').dataTable().fnAddData([item.PageType, item.DataElementName, editbtn, deletebtn]);
            }); //End of foreach Loop   
        }, //End of AJAX Success function 
        failure: function (data) {
            //alert("Failure");
        }, //End of AJAX failure function  
        error: function (data) {
            //alert("Error");
        } //End of AJAX error function  
    });
}


function getBackboneElementTypeData() {
    $.ajax({
        type: "GET",
        url: BaseUrl + "DataElement/GetDataElementData",
        contentType: "application/json;",
        dataType: "json",
        success: function (data) {

            var arr = [];
            arr = data.BackboneList;
            $.each(arr, function (i, item) {
                var options = "<option value=" + item.DataElementTypeId + ">" + item.DataElementName + "</option>";
                $('#dropdownDataElementList').append(options);
                $('#dropdownDataElementListedt').append(options);
            }); //End of foreach Loop   
        }, //End of AJAX Success function 
        // alert(data);
        failure: function (data) {
            //alert("Failure");
        }, //End of AJAX failure function  
        error: function (data) {
            //alert("Error");
        } //End of AJAX error function  
    });
}


//Display List


//Create Function
function setBackbonePageElementData(key) {
    if (window.BackbonePageElement) {
        var dealer = window.BackbonePageElement[key]
        $('#label_BackbonePageElementID').html(dealer.BackbonePageElementId);
        $('#dropdownBackbonePageListedt').val(dealer.BackbonePageId);
        $('#dropdownDataElementListedt').val(dealer.DataElementTypeId);
    }
}



function setBackbonePageElementDataDelete(id) {
    $('#label_BackbonePageElementID_Delete').html(id);
}

function CreateBackbonePageElementData() {
    var reqdata = {
        //DealerName: $('#txt_Dealer_Name').val(),
        //DealerUrl: $('#txt_Dealer_Url').val(),
        BackbonePageId: $('#dropdownBackbonePageList').val(),
        DataElementTypeId: $('#dropdownDataElementList').val()
    };
    $.ajax({
        type: "POST",
        url: BaseUrl+"BackbonePageElement/CreateBackbonePageElementData",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        data: JSON.stringify(reqdata),
        success: function (data) {
            if (data) {
                alert("Inserted successfully.")
                document.location.reload();
            }
            else {
                alert("Failed to insert..")
            }
        }, //End of AJAX Success function 
        failure: function (data) {
            //alert("Failure");
        }, //End of AJAX failure function  
        error: function (data) {
            //alert("Error");
        } //End of AJAX error function  
    });
}

//Update Function

function UpdateBackbonePageElementData() {
    var reqdata = {
        //DealerName: $('#txt_OEM_Name_Update').val(),
        //DealerUrl: $('#txt_Dealer_Url_Update').val(),
        BackbonePageId: $('#dropdownBackbonePageListedt').val(),
        DataElementTypeId: $('#dropdownDataElementListedt').val(),
        BackbonePageElementId: $('#label_BackbonePageElementID').html()
    };

    $.ajax({
        type: "POST",
        url: BaseUrl+"BackbonePageElement/UpdateBackbonePageElementData",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        data: JSON.stringify(reqdata),
        success: function (data) {
            if (data) {
                alert("Updated successfully...")
                document.location.reload();
            }
            else {
                alert("Failed to Update...")
            }
        }, //End of AJAX Success function 
        failure: function (data) {
            //alert("Failure");
        }, //End of AJAX failure function  
        error: function (data) {
            //alert("Error");
        } //End of AJAX error function  
    });
}

//Delete Function

function DeleteBackbonePageElementData() {
    var reqdata = { BackbonePageElementId: $('#label_BackbonePageElementID_Delete').html() };
    $.ajax({
        type: "POST",
        url: BaseUrl+"BackbonePageElement/DeleteBackbonePageElementData",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        data: JSON.stringify(reqdata),
        success: function (data) {
            if (data) {
                alert("Deleted successfully.")
                document.location.reload();
            }
            else {
                alert("Failed to Delete..")
            }
        }, //End of AJAX Success function 
        failure: function (data) {
            //alert("Failure");
        }, //End of AJAX failure function  
        error: function (data) {
            //alert("Error");
        } //End of AJAX error function  
    });
}

function getBackbonePageData() {
    $.ajax({
        type: "GET",
        url: BaseUrl+"pagetype/GetPageTypes",
        contentType: "application/json;",
        dataType: "json",
        success: function (data) {
            // alert(data);
            var arr = [];
            arr = data;
            $.each(arr, function (i, item) {
                var options = "<option value=" + item.PageId + ">" + item.PageType + "</option>";
                $('#dropdownBackbonePageList').append(options);
                $('#dropdownBackbonePageListedt').append(options);
            }); //End of foreach Loop   
        }, //End of AJAX Success function 
        failure: function (data) {
            //alert("Failure");
        }, //End of AJAX failure function  
        error: function (data) {
            //alert("Error");
        } //End of AJAX error function  
    });
}


//Dropdown List For OEM ID and BACKBONE ID


