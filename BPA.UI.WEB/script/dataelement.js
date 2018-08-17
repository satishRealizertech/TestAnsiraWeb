﻿$(document).ready(function () {
    getDataElementData();
});

function getTodaysDate() {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    return month + '/' + day + '/' + year;
}
var BaseUrl = $('#baseURL').html();
function getDataElementData() {
    $.ajax({
        type: "GET",
        url:BaseUrl+ "DataElement/GetDataElementData",
        contentType: "application/json;",
        dataType: "json",
        success: function (data) {
            // alert(data);
            var arrDataElement = [];
            arrDataElement = data.DataElementList;
            $.each(arrDataElement, function (i, item) {
                //var row = "<tr><td>" + item.OEM_Id + "</td><td>" + item.OEM_Name + "</td></tr>"
                //$('#OEMData tbody').append(row);
                var editbtn = '<p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary" data-title="Edit" onclick=setDataElementData(' + item.DataElementTypeId + ',"' + item.DataElementName + '") data-toggle="modal" data-target="#edit"><span class="glyphicon glyphicon-pencil"></button></p>';
                var deletebtn = '<button class="btn btn-danger" data-title="Delete" onclick=setDataElementDataDelete(' + item.DataElementTypeId + ') data-toggle="modal" data-target="#delete"><span class="glyphicon glyphicon-trash"></button>';
                $('#DataElementdatatable').dataTable().fnAddData([item.DataElementName, editbtn, deletebtn]);
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

function CreateDataElementData() {
    var reqdata = {
        DataElementName: $('#txt_DataElement_Name').val(),
        CreateTs: getTodaysDate()
    };
    $.ajax({
        type: "POST",
        url: BaseUrl + "DataElement/CreateDataElementData",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        data: JSON.stringify(reqdata),
        success: function (data) {
                alert("Inserted successfully.")
                document.location.reload();
            
        }, //End of AJAX Success function 
        failure: function (data) {
            var error = JSON.parse(data.responseText);
            alert(error.ExceptionMessage);
            //alert("Failure");
        }, //End of AJAX failure function  
        error: function (data) {
            var error = JSON.parse(data.responseText);
            alert(error.ExceptionMessage);
            //alert("Error");
        } //End of AJAX error function  
    });
}

function setDataElementData(id, name) {
    $('#label_DataElementID').html(id);
    $('#txt_DataElement_Name_Update').val(name);
}

function setDataElementDataDelete(id) {
    $('#label_DataElementID_Delete').html(id);
}

function UpdateDataElementData() {
 var reqdata = {
        DataElementName: $('#txt_DataElement_Name_Update').val(),
        DataElementTypeId: $('#label_DataElementID').html(),
        UpdateTs: getTodaysDate()
    };

    $.ajax({
        type: "POST",
        url: BaseUrl + "DataElement/UpdateDataElementData",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        data: JSON.stringify(reqdata),
        success: function (data) {
           
                alert("Updated successfully...")
                document.location.reload();
           
        }, //End of AJAX Success function 
        failure: function (data) {
            var error = JSON.parse(data.responseText);
            alert(error.ExceptionMessage);
            //alert("Failure");
        }, //End of AJAX failure function  
        error: function (data) {
            var error = JSON.parse(data.responseText);
            alert(error.ExceptionMessage);
            //alert("Error");
        } //End of AJAX error function  
    });
}


function DeleteDataElementData() {
    var reqdata = { DataElementTypeId: $('#label_DataElementID_Delete').html() };
    $.ajax({
        type: "POST",
        url: BaseUrl + "DataElement/DeleteDataElementData",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        data: JSON.stringify(reqdata),
        success: function (data) {
           
                alert("Deleted successfully.")
                document.location.reload();
           
        }, //End of AJAX Success function 
        failure: function (data) {
            var error = JSON.parse(data.responseText);
            alert(error.ExceptionMessage);
            //alert("Failure");
        }, //End of AJAX failure function  
        error: function (data) {
            var error = JSON.parse(data.responseText);
            alert(error.ExceptionMessage);
            //alert("Error");
        } //End of AJAX error function  
    });
}

