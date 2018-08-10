$(document).ready(function () {
    getDataElementData();
});


var BaseUrl = 'http://45.35.4.250/ansiratestapi/api/';
function getDataElementData() {
    $.ajax({
        type: "GET",
        url:BaseUrl+ "DataElement/GetDataElementData",
        contentType: "application/json;",
        dataType: "json",
        success: function (data) {
            // alert(data);
            var arr = [];
            arr = data.DataElementList;
            $.each(arr, function (i, item) {
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
    var reqdata = { DataElementName: $('#txt_DataElement_Name').val() };
    $.ajax({
        type: "POST",
        url: BaseUrl + "DataElement/CreateDataElementData",
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
        DataElementTypeId: $('#label_DataElementID').html()
    };

    $.ajax({
        type: "POST",
        url: BaseUrl + "DataElement/UpdateDataElementData",
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


function DeleteDataElementData() {
    var reqdata = { DataElementTypeId: $('#label_DataElementID_Delete').html() };
    $.ajax({
        type: "POST",
        url: BaseUrl + "DataElement/DeleteDataElementData",
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

