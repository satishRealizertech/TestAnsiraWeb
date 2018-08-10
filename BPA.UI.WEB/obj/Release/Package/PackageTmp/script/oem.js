$(document).ready(function () {
    getOEMData();
});

var BaseUrl = 'http://45.35.4.250/ansiratestapi/api/';
//Display List
function getOEMData()
{
    $.ajax({
        type: "GET",
        url: BaseUrl+"OEM/GetOEMData",
        contentType: "application/json;",
        dataType: "json",
        success: function (data) {
            // alert(data);
            var arr = [];
            arr = data;
            $.each(arr, function (i, item) {
                //var row = "<tr><td>" + item.OEM_Id + "</td><td>" + item.OEM_Name + "</td></tr>"
                //$('#OEMData tbody').append(row);
                var editbtn = '<p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary" data-title="Edit" onclick=setOEMData(' + item.OEM_Id + ',"' + item.OEM_Name + '") data-toggle="modal" data-target="#edit"><span class="glyphicon glyphicon-pencil"></button></p>';
                var deletebtn = '<button class="btn btn-danger" data-title="Delete" onclick=setOEMDataDelete(' + item.OEM_Id + ') data-toggle="modal" data-target="#delete"><span class="glyphicon glyphicon-trash"></button>';
                $('#OEMdatatable').dataTable().fnAddData([item.OEM_Name,editbtn,deletebtn]);
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
function setOEMData(id,name)
{
    $('#label_oemID').html(id);
    $('#txt_OEM_Name_Update').val(name);
}

function setOEMDataDelete(id) {
    $('#label_oemID_Delete').html(id);
}

function CreateOEMData()
{
    var reqdata = { OEM_Name : $('#txt_OEM_Name').val() };
    $.ajax({
        type: "POST",
        url: BaseUrl + "OEM/CreateOEM",
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

 function UpdateOEMData() {
     var reqdata = {
         OEM_Name: $('#txt_OEM_Name_Update').val(),
         OEM_Id: $('#label_oemID').html()
     };

    $.ajax({
        type: "POST",
        url: BaseUrl + "OEM/UpdateOEMData",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        data: JSON.stringify(reqdata),
        success: function (data) {
            if (data) {
                alert("Updated successfully.")
                document.location.reload();
            }
            else {
                alert("Failed to Update..")
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

function DeleteOEMData() {
    var reqdata = { OEM_Id: $('#label_oemID_Delete').html() };
    $.ajax({
        type: "POST",
        url: BaseUrl + "OEM/DeleteOEMData",
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