$(document).ready(function () {
    getPageType();
});
var BaseURL = 'http://45.35.4.250/ansiratestapi/api/';
function getPageType() {
    $.ajax({
        type: "GET",
        url: BaseURL+"PageType/GetPageTypes",
        contentType: "application/json;",
        dataType: "json",
        success: function (data) {
            // alert(data);
            var arr = [];
            arr = data;
            $.each(arr, function (i, item) {
                var pagetypestr=item.PageType;
                var editbtn = '<p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary" onclick=\"setPageTypeEdit(' + item.PageId + ',\'' + pagetypestr + '\')\" data-title="Edit"  data-toggle="modal" data-target="#edit"><span class="glyphicon glyphicon-pencil"></span></button></p>';
                var deletebtn = '<button class="btn btn-danger" data-title="Delete" onclick=setPageTypeDelete(' + item.PageId + ') data-toggle="modal" data-target="#delete"><span class="glyphicon glyphicon-trash"></span></button>';
                $('#pageTypeDataTable').dataTable().fnAddData([ item.PageType, editbtn, deletebtn]);
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
function setPageTypeEdit(id, type)
{
    $('#lblPageTypeId').html(id);
    $('#txtedtPageType').val(type);
}
function setPageTypeDelete(id)
{
    $('#lblDeletePageTypeId').html(id);
}
function createPageType()
{
    var data = {
        PageType: $('#txtPageType').val(),
    };
    $.ajax({
        type: "POST",
        url: BaseURL+"PageType/CreatePageType",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        data: JSON.stringify(data),
        success: function (data) {
            if (data) {
                alert('Successfully Enter');
                document.location.reload();
            }
            else { alert('Error while inserting'); }
        }, //End of AJAX Success function 
        failure: function (data) {
            //alert("Failure");
        }, //End of AJAX failure function  
        error: function (data) {
            //alert("Error");
        } //End of AJAX error function  
    });
}
function UpdatePageType()
{
    var data = {
        PageType: $('#txtedtPageType').val(),
        PageId:$('#lblPageTypeId').html()
    };
    $.ajax({
        type: "POST",
        url: BaseURL+"PageType/UpdatePageType",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        data: JSON.stringify(data),
        success: function (data) {
            if (data) {
                alert('Successfully Update');
                document.location.reload();
            }
            else { alert('Error while updating'); }
        }, //End of AJAX Success function 
        failure: function (data) {
            //alert("Failure");
        }, //End of AJAX failure function  
        error: function (data) {
            //alert("Error");
        } //End of AJAX error function  
    });
}
function DeletePageType()
{
    var data = {
        PageId: $('#lblDeletePageTypeId').html()
    };
    $.ajax({
        type: "POST",
        url: BaseURL+"PageType/DeletePageType",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        data: JSON.stringify(data),
        success: function (data) {
            if (data) {
                alert('Successfully Delete');
                document.location.reload();
            }
            else { alert('Error while deleting'); }
        }, //End of AJAX Success function 
        failure: function (data) {
            //alert("Failure");
        }, //End of AJAX failure function  
        error: function (data) {
            //alert("Error");
        } //End of AJAX error function  
    });
}


