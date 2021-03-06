﻿$(document).ready(function () {
    getDEALERData();
    getOEMData();
    getBackboneData();
    setDealerData();
    setDealerDataDelete();  
});


var BaseUrl = 'http://45.35.4.250/ansiratestapi/api/';

function getBackboneData() {
    $.ajax({
        type: "GET",
        url: BaseUrl+"Backbone/GetBackboneData",
        contentType: "application/json;",
        dataType: "json",
        success: function (data) {

            var arr = [];
            arr = data.BackboneList;
            $.each(arr, function (i, item) {
                var options = "<option value=" + item.BackboneId + ">" + item.BackboneName + "</option>";
                $('#dropdownBackboneList').append(options);
                $('#dropdownBackboneListedt').append(options);
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

function getDEALERData() {
    $.ajax({
        type: "GET",
        url: BaseUrl + "DEALER/GetDealerData",
        contentType: "application/json;",
        dataType: "json",
        success: function (data) {  
            // alert(data);
            var arr = [];
            arr = data;
            window.Dealer = arr;
            $.each(arr, function (i, item) {
                //var row = "<tr><td>" + item.OEM_Id + "</td><td>" + item.OEM_Name + "</td></tr>"
                //$('#OEMData tbody').append(row);
                //
                var editbtn = '<p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary" data-title="Edit" onclick=setDealerData(' + i + ') data-toggle="modal" data-target="#edit"><span class="glyphicon glyphicon-pencil"></button></p>';
                var deletebtn = '<button class="btn btn-danger" data-title="Delete" onclick=setDealerDataDelete(' + item.DealerId + ') data-toggle="modal" data-target="#delete"><span class="glyphicon glyphicon-trash"></button>';
                $('#DEALERdatatable').dataTable().fnAddData([item.DealerName, item.DealerUrl, item.OEMName, item.BackboneName, editbtn, deletebtn]);
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
//Create Function
function setDealerData(key) {
    if (window.Dealer)
    {
        var dealer = window.Dealer[key]
        $('#label_DealerID').html(dealer.DealerId);
        $('#txt_Dealer_Name_Update').val(dealer.DealerName);
        $('#txt_Dealer_Url_Update').val(dealer.DealerUrl);
        $('#dropdownOEMListedt').val(dealer.OEMId);
        $('#dropdownBackboneListedt').val(dealer.BackboneId);
    }
}



function setDealerDataDelete(id) {
    $('#label_DealerID_Delete').html(id);
}

function CreateDealerData() {
var reqdata = {
        DealerName: $('#txt_Dealer_Name').val(),
        DealerUrl: $('#txt_Dealer_Url').val(),
        OEMId: $('#dropdownOEMList').val(),
        BackboneId: $('#dropdownBackboneList').val()      
    };
    $.ajax({
        type: "POST",
        url: BaseUrl + "Dealer/CreateDealerData",
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

function UpdateDealerData() {
    var reqdata = {
        DealerName: $('#txt_Dealer_Name_Update').val(),
        DealerUrl: $('#txt_Dealer_Url_Update').val(),
        OEMId: $('#dropdownOEMListedt').val(),
        BackboneId: $('#dropdownBackboneListedt').val(),
        DealerId: $('#label_DealerID').html()
    };

    $.ajax({
        type: "POST",
        url: BaseUrl + "Dealer/UpdateDealerData",
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

function DeleteDealerData() {
    var reqdata = { DealerId: $('#label_DealerID_Delete').html() };
    $.ajax({
        type: "POST",
        url: BaseUrl + "Dealer/DeleteDealerData",
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




//Dropdown List For OEM ID and BACKBONE ID

function getOEMData() {
    $.ajax({
        type: "GET",
        url: BaseUrl + "OEM/GetOEMData",
        contentType: "application/json;",
        dataType: "json",
        success: function (data) {
            // alert(data);
            var arr = [];
            arr = data;
            $.each(arr, function (i, item) {
                var options = "<option value=" + item.OEM_Id + ">" + item.OEM_Name + "</option>";
                $('#dropdownOEMList').append(options);
                $('#dropdownOEMListedt').append(options);
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







