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
                var editBtn = '<p data-placement="top" data-toggle="tooltip" title="Edit"><button class="btn btn-primary" onclick=\"setPageTypeEdit(' + item.PageId + ',\'' + item.PageType + '\')\" data-title="Edit"  data-toggle="modal" data-target="#edit"><span class="glyphicon glyphicon-pencil"></span></button></p>';
                var deleteBtn = '<button class="btn btn-danger" data-title="Delete" onclick=setPageTypeDelete(' + item.PageId + ') data-toggle="modal" data-target="#delete"><span class="glyphicon glyphicon-trash"></span></button>';
                var activeBtn ='';
                if (item.IsActive) {
                    activeBtn = '<input class="btn btn-default" type="checkbox" checked="checked" value="' + item.PageId + '" />';
                }
                else {
                    activeBtn = '<input class="btn btn-default" type="checkbox" value="' + item.PageId + '" />';
                }
                $('#pageTypeDataTable').dataTable().fnAddData([ item.PageType, editBtn, deleteBtn]);
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
$('#pageTypeDataTable').DataTable();
$('#pageTypeDataTable input[type="checkbox"]').click(function (e) {
    var data;
    if ($(this).prop("checked") == true) {
        data = {
            PageId: $(this).val(),
            IsActive: true
        };
    }
    else if ($(this).prop("checked") == false) {
        data = {
            PageId: $(this).val(),
            IsActive: false
        };
    }
    if(data!=null)
    {
        $.ajax({
            type: "POST",
            url: BaseURL + "PageType/UpdatePageType",
            contentType: "application/json; charset=UTF-8",
            dataType: "json",
            data: JSON.stringify(data),
            success: function (data) {
                if (data) {
                    if($(this).val())
                    {
                        alert('Successfully activated');
                    }
                    else
                    {
                        alert('Successfully deactivated');
                    }
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
});
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
                alert('Successfully Enter');
                document.location.reload();
        }, //End of AJAX Success function 
        failure: function (data) {
            //alert("Failure");
            var res = JSON.parse(data);
            alert(res.ErrorMessage)
        }, //End of AJAX failure function  
        error: function (data) {
            //alert("Error");
            var res = JSON.parse(data.responseText);
            alert(res.ExceptionMessage)
        } //End of AJAX error function  
    });
}
function UpdatePageType()
{
    var data = {
        PageType: $('#txtedtPageType').val(),
        PageId: $('#lblPageTypeId').html(),
        IsActive : true
    };
    $.ajax({
        type: "POST",
        url: BaseURL+"PageType/UpdatePageType",
        contentType: "application/json; charset=UTF-8",
        dataType: "json",
        data: JSON.stringify(data),
        success: function (data) {
                alert('Successfully Update');
                document.location.reload();
        }, //End of AJAX Success function 
        failure: function (data) {
            var res = JSON.parse(data);
            alert(res.ErrorMessage)
        }, //End of AJAX failure function  
        error: function (data) {
            var res = JSON.parse(data);
            alert(res.ErrorMessage)
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
                alert('Successfully Delete');
                document.location.reload();
        }, //End of AJAX Success function 
        failure: function (data) {
            var res = JSON.parse(data);
            alert(res.ErrorMessage)
        }, //End of AJAX failure function  
        error: function (data) {
            var res = JSON.parse(data);
            alert(res.ErrorMessage)
        } //End of AJAX error function  
    });
}


