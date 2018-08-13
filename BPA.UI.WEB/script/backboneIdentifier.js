$(document).ready(function () {
    getIdentifierData();
    getBackboneId();
});
function getTodaysDate() {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    return month + '/' + day + '/' + year;
}
var BaseUrl = 'http://45.35.4.250/ansiratestapi/api/';
function getIdentifierData() {
    $.ajax({
        type: "GET",
        url: BaseUrl+"backbone/getbackboneidentifier",
        contentType: "application/json;",
        dataType: "json",
        success: function (data) {
            // alert(data);
            var arr = [];
            arr = data;
            window.BackboneIdentifierList = arr;
            $.each(arr, function (i, item) {
                var editbtn = '<p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary" onclick=setBackboneEditData('+i+') data-title="Edit"  data-toggle="modal" data-target="#edit"><span class="glyphicon glyphicon-pencil"></span></button></p>';
                var deletebtn = '<button class="btn btn-danger" data-title="Delete" onclick=setBackboneDelete(' + item.BackboneIdentifierId + ') data-toggle="modal" data-target="#delete"><span class="glyphicon glyphicon-trash"></span></button>';
                $('#BackboneIdentifierDataTable').dataTable().fnAddData([ item.BackboneName,item.Type,item.Identifier,item.SerialNo, editbtn, deletebtn]);
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
function getBackboneId() {
    $.ajax({
        type: "GET",
        url: BaseUrl + "backbone/GetBackbone",
        contentType: "application/json;",
        dataType: "json",
        success: function (data) {
            // alert(data);
            var arr = [];
            arr = data.BackboneList;
            window.BackboneIdentifierList = arr;
            $.each(arr, function (i, item) {
                var option = '<option value=' + item.BackboneId + '>' + item.BackboneName + '</option>';
                $('#selectBackboneId').append(option);
                $('#selectedtBackboneId').append(option);
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
function setBackboneEditData(key)
{
    if (window.BackboneIdentifierList) {
        var stud = window.BackboneIdentifierList[key];
        $('#selectedtBackboneId').val(stud.BackboneId);
        $('#txtedtType').val(stud.Type);
        $('#txtedtIdentifier').val(stud.Identifier);
        $('#txtedtSerialNo').val(stud.SerialNo);
        $('#txtedtValue').val(stud.Value);
        $('#lableBackboneIdentifierId').html(stud.BackboneIdentifierId)
    }
}
function setBackboneDelete(id)
{
    $('#labledeleteBackboneIdentifierId').html(id);
}
function createBackboneIdentifier()
{
    var data = {
        BackboneId: $('#selectBackboneId').val(),
        Type: $('#txtType').val(),
        Identifier: $('#txtIdentifier').val(),
        SerialNo: $('#txtSerialNo').val(),
        Value: $('#txtValue').val(),
        CreatedBy: '',
        CreateTs: getTodaysDate(),
        Comment:''
    };
    $.ajax({
        type: "POST",
        url: BaseUrl + "backbone/CreateBackboneIdentifier",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        data: JSON.stringify(data),
        success: function (data) {
            if (data) {
                alert('Successfully Enter');
                document.location.reload();
            }
            else { alert('Error while inserting');}
        }, //End of AJAX Success function 
        failure: function (data) {
            //alert("Failure");
            var res = JSON.parse(data.responseText);
            alert(res.ExceptionMessage);
        }, //End of AJAX failure function  
        error: function (data) {
            //alert("Error");
            var res = JSON.parse(data.responseText);
            alert(res.ExceptionMessage);
        } //End of AJAX error function  
    });
}
function updateBackboneIdentifier() {
    var data = {
        BackboneId: $('#selectedtBackboneId').val(),
        Type: $('#txtedtType').val(),
        Identifier: $('#txtedtIdentifier').val(),
        SerialNo: $('#txtedtSerialNo').val(),
        Value: $('#txtedtValue').val(),
        IsActive: true,
        UpdatedBy: '',
        UpdateTs: getTodaysDate,
        Comment:'',
        BackboneIdentifierId: $('#lableBackboneIdentifierId').html()
    };
    $.ajax({
        type: "POST",
        url: BaseUrl + "backbone/UpdateBackboneIdentifier",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        data: JSON.stringify(data),
        success: function (data) {
                alert('Successfully Update');
                document.location.reload();
        }, //End of AJAX Success function 
        failure: function (data) {
            //alert("Failure");
            var res = JSON.parse(data.responseText);
            alert(res.ExceptionMessage);
        }, //End of AJAX failure function  
        error: function (data) {
            //alert("Error");
            var res = JSON.parse(data.responseText);
            alert(res.ExceptionMessage);
        } //End of AJAX error function  
    });
}
function deleteBackboneIdentifier()
{
    var data = {
        BackboneIdentifierId: $('#labledeleteBackboneIdentifierId').html()
    };
    $.ajax({
        type: "POST",
        url: BaseUrl + "backbone/DeleteBackboneIdentifier",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        data: JSON.stringify(data),
        success: function (data) {
                alert('Successfully Delete');
                document.location.reload();
        }, //End of AJAX Success function 
        failure: function (data) {
            //alert("Failure");
        }, //End of AJAX failure function  
        error: function (data) {
            //alert("Error");
        } //End of AJAX error function  
    });
}
