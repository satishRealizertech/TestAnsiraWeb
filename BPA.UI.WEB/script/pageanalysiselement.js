$(document).ready(function () {
    //getPageType();
    //getDealerData();
});
var BaseURL = $('#baseURL').html();


function getPageAnalysisData()
{
    var form = $('#formPageAnalysisData').valid();
    if (form)
    {
        var data = {
            DealerId: $('#txtDealerId').val(),
            DealerName: $('#txtDealerName').val(),
            HTML: '',
            OEMId: $('#txtOEMId').val(),
            OEMName: $('#txtOEMName').val(),
            RequestId: $('#txtRequestId').val(),
            Url: $('#txtUrl').val()
        };       
        $("#backbonePageTypeDataTable").loading('start');
        $.ajax({
            type: "POST",
            url: BaseURL + "PageAnalysis/PageAnalysisPageElement",
            contentType: "application/json; charset=UTF-8",
            dataType: "json",
            data: JSON.stringify(data),
            success: function (data) {
                // alert(data);
                var arrPageAnalysis = [];
                arrPageAnalysis = data.PageElementResults;
                $('#backbonePageTypeDataTable').dataTable().fnClearTable();
                $.each(arrPageAnalysis, function (i, item) {
                    $('#backbonePageTypeDataTable').dataTable().fnAddData([item.DataElementName, item.Value]);
                }); //End of foreach Loop  
                $("#backbonePageTypeDataTable").loading('stop');
            }, //End of AJAX Success function 
            failure: function (data) {
                $("#backbonePageTypeDataTable").loading('stop');
                var res = JSON.parse(data.responseText);
                alert(res.Message + '\n' + res.ExceptionMessage);
                $('#backbonePageTypeDataTable').dataTable().fnClearTable();
            }, //End of AJAX failure function  
            error: function (data) {
                $("#backbonePageTypeDataTable").loading('stop');
                $('#backbonePageTypeDataTable').dataTable().fnClearTable();
                var res = JSON.parse(data.responseText);
                alert(res.Message + '\n' + res.ExceptionMessage);
            } //End of AJAX error function  
        });
    }    
}
